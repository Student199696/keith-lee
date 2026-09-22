import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import {
  confirmationEmail,
  confirmationText,
  internalEmail,
  internalText,
  sendEmail,
  type EmailAttachment,
  type InquiryRecord,
} from "@/lib/partnership-email";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const allowedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const required = ["engagementType", "objective", "fullName", "workEmail", "organization", "role", "location", "preferredDate", "dateFlexibility", "budgetRange"];
const maxAttachmentBytes = 4 * 1024 * 1024;
const runtimeEnv = env as Cloudflare.Env & Record<string, string | undefined>;

function textValue(form: FormData, key: string, max = 4000) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function safeFilename(value: string) {
  return value.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || "attachment";
}

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + 0x8000, bytes.length)));
  }
  return btoa(binary);
}

function emailConfig() {
  return {
    apiKey: runtimeEnv.RESEND_API_KEY || process.env.RESEND_API_KEY || "",
    from: runtimeEnv.PARTNERSHIP_FROM_EMAIL || process.env.PARTNERSHIP_FROM_EMAIL || "Keith Lee Partnerships <onboarding@resend.dev>",
    to: runtimeEnv.PARTNERSHIP_TO_EMAIL || process.env.PARTNERSHIP_TO_EMAIL || "abdulbaasitisah436@gmail.com",
  };
}

async function persistInquiry(id: string, record: InquiryRecord, files: Array<{ file: File; bytes: ArrayBuffer }>) {
  if (!runtimeEnv.DB) return "email" as const;
  if (files.length && !runtimeEnv.BUCKET) throw new Error("File storage is not configured.");

  const uploaded: string[] = [];
  try {
    for (const { file, bytes } of files) {
      const key = `inquiries/${id}/${crypto.randomUUID()}-${safeFilename(file.name)}`;
      await runtimeEnv.BUCKET!.put(key, bytes, {
        httpMetadata: { contentType: file.type },
        customMetadata: { inquiryId: id, originalName: file.name.slice(0, 160) },
      });
      uploaded.push(key);
    }

    const statements = [runtimeEnv.DB.prepare(`INSERT INTO inquiries (
      id, reference, status, engagement_type, objective, full_name, work_email, organization, role,
      decision_maker, restaurant_name, website, location, ownership_type, number_of_locations,
      preferred_date, date_flexibility, budget_range, audience, operations, dietary, accessibility,
      travel, referral_source, attachment_count
    ) VALUES (?, ?, 'received', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, record.reference, record.engagementType, record.objective, record.fullName, record.workEmail, record.organization, record.role, record.decisionMaker ? 1 : 0, record.restaurantName || null, record.website || null, record.location, record.ownershipType || null, Number(record.numberOfLocations) || null, record.preferredDate, record.dateFlexibility, record.budgetRange, record.audience || null, record.operations || null, record.dietary || null, record.accessibility || null, record.travel || null, record.referralSource || null, files.length)];

    files.forEach(({ file }, index) => statements.push(runtimeEnv.DB!.prepare("INSERT INTO inquiry_files (id, inquiry_id, object_key, original_name, content_type, size) VALUES (?, ?, ?, ?, ?, ?)").bind(crypto.randomUUID(), id, uploaded[index], file.name.slice(0, 160), file.type, file.size)));
    await runtimeEnv.DB.batch(statements);
    return "database+email" as const;
  } catch (error) {
    await Promise.all(uploaded.map((key) => runtimeEnv.BUCKET!.delete(key).catch(() => undefined)));
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    if (textValue(form, "companyWebsite", 500)) {
      return NextResponse.json({ reference: "KL-RECEIVED", confirmationDelivered: true, captureMode: "filtered" }, { status: 201 });
    }
    for (const key of required) {
      if (!textValue(form, key)) return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
    }

    const email = textValue(form, "workEmail", 320);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
    if (textValue(form, "consent", 8) !== "true") return NextResponse.json({ error: "Privacy acknowledgement is required." }, { status: 400 });

    const attachments = form.getAll("attachments").filter((item): item is File => item instanceof File && item.size > 0);
    if (attachments.length > 3) return NextResponse.json({ error: "Attach no more than three files." }, { status: 400 });
    const totalBytes = attachments.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > maxAttachmentBytes) return NextResponse.json({ error: "Attachments must be 4 MB or less in total." }, { status: 400 });
    for (const file of attachments) {
      if (!allowedTypes.has(file.type)) return NextResponse.json({ error: `${file.name} is not an accepted file type.` }, { status: 400 });
    }

    const config = emailConfig();
    if (!config.apiKey) return NextResponse.json({ error: "Email delivery is not configured yet. Please contact the partnership team directly." }, { status: 503 });

    const id = crypto.randomUUID();
    const reference = `KL-${new Date().getUTCFullYear()}-${id.slice(0, 8).toUpperCase()}`;
    const record: InquiryRecord = {
      reference,
      engagementType: textValue(form, "engagementType", 80),
      objective: textValue(form, "objective"),
      fullName: textValue(form, "fullName", 180),
      workEmail: email,
      organization: textValue(form, "organization", 240),
      role: textValue(form, "role", 180),
      decisionMaker: textValue(form, "decisionMaker", 8) === "true",
      restaurantName: textValue(form, "restaurantName", 240),
      website: textValue(form, "website", 500),
      location: textValue(form, "location", 300),
      ownershipType: textValue(form, "ownershipType", 80),
      numberOfLocations: textValue(form, "numberOfLocations", 10),
      preferredDate: textValue(form, "preferredDate", 30),
      dateFlexibility: textValue(form, "dateFlexibility", 80),
      budgetRange: textValue(form, "budgetRange", 80),
      audience: textValue(form, "audience", 1000),
      operations: textValue(form, "operations"),
      dietary: textValue(form, "dietary", 2000),
      accessibility: textValue(form, "accessibility", 2000),
      travel: textValue(form, "travel", 2000),
      referralSource: textValue(form, "referralSource", 500),
    };

    const preparedFiles = await Promise.all(attachments.map(async (file) => ({ file, bytes: await file.arrayBuffer() })));
    const emailAttachments: EmailAttachment[] = preparedFiles.map(({ file, bytes }) => ({ filename: safeFilename(file.name), content: toBase64(bytes) }));
    const captureMode = await persistInquiry(id, record, preparedFiles);

    await sendEmail(config.apiKey, {
      from: config.from,
      to: [config.to],
      reply_to: email,
      subject: `[${reference}] ${record.organization.replace(/[\r\n]+/g, " ")} - ${record.engagementType}`,
      html: internalEmail(record, emailAttachments),
      text: internalText(record),
      attachments: emailAttachments,
      tags: [{ name: "inquiry_reference", value: reference.replace(/[^a-zA-Z0-9_-]/g, "_") }],
    }, `${reference}-internal`);

    let confirmationDelivered = true;
    try {
      await sendEmail(config.apiKey, {
        from: config.from,
        to: [email],
        reply_to: config.to,
        subject: `We received your partnership inquiry - ${reference}`,
        html: confirmationEmail(record),
        text: confirmationText(record),
        tags: [{ name: "inquiry_reference", value: reference.replace(/[^a-zA-Z0-9_-]/g, "_") }],
      }, `${reference}-confirmation`);
    } catch (error) {
      confirmationDelivered = false;
      console.error("Inquiry confirmation email failed", error);
    }

    return NextResponse.json({ reference, confirmationDelivered, captureMode }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json({ error: "The inquiry could not be sent. Please keep your information and try again." }, { status: 500 });
  }
}
