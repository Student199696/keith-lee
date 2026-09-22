type InquiryRecord = {
  reference: string;
  engagementType: string;
  objective: string;
  fullName: string;
  workEmail: string;
  organization: string;
  role: string;
  decisionMaker: boolean;
  restaurantName: string;
  website: string;
  location: string;
  ownershipType: string;
  numberOfLocations: string;
  preferredDate: string;
  dateFlexibility: string;
  budgetRange: string;
  audience: string;
  operations: string;
  dietary: string;
  accessibility: string;
  travel: string;
  referralSource: string;
};

type EmailAttachment = { filename: string; content: string };

const labels: Record<string, string> = {
  restaurant: "Restaurant collaboration",
  brand: "Paid brand partnership",
  "multi-location": "Multi-location or franchise",
  destination: "Tourism or destination campaign",
  speaking: "Speaking, hosting, or appearance",
  ambassador: "Long-term ambassador relationship",
  other: "Another opportunity",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character] || character);
}

function displayValue(value: string | boolean) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value || "Not provided";
}

function shell(content: string, preheader: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Keith Lee Partnerships</title></head><body style="margin:0;background:#f3d3dc;font-family:Arial,Helvetica,sans-serif;color:#11100f"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,#f3d3dc,#efbda9);padding:28px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fffdf8;border-radius:28px;overflow:hidden;box-shadow:0 24px 70px rgba(68,31,47,.18)"><tr><td style="background:#11100f;padding:22px 30px"><table role="presentation" width="100%"><tr><td><span style="display:inline-block;width:44px;height:44px;line-height:44px;text-align:center;border-radius:50%;background:#fffdf8;color:#11100f;font-weight:800">KL</span></td><td align="right" style="color:#efc8d5;font-size:11px;font-weight:700;letter-spacing:1.7px">RESTAURANT PARTNERSHIPS</td></tr></table></td></tr>${content}<tr><td style="padding:24px 30px;background:#11100f;color:#aaa3a0;font-size:12px;line-height:1.6">This message relates to an inquiry submitted through the official Keith Lee partnership platform. Submission does not confirm availability, endorsement, or a commercial agreement.</td></tr></table></td></tr></table></body></html>`;
}

export function internalEmail(record: InquiryRecord, attachments: EmailAttachment[]) {
  const rows: Array<[string, string | boolean]> = [
    ["Reference", record.reference], ["Engagement", labels[record.engagementType] || record.engagementType], ["Objective", record.objective],
    ["Name", record.fullName], ["Work email", record.workEmail], ["Organization", record.organization], ["Role", record.role],
    ["Decision-maker", record.decisionMaker], ["Restaurant/client", record.restaurantName], ["Website", record.website], ["Location", record.location],
    ["Ownership", record.ownershipType], ["Locations", record.numberOfLocations], ["Preferred date", record.preferredDate],
    ["Date flexibility", record.dateFlexibility], ["Budget", record.budgetRange], ["Target audience", record.audience],
    ["Operations", record.operations], ["Dietary/allergen", record.dietary], ["Accessibility", record.accessibility],
    ["Travel/geography", record.travel], ["Referral source", record.referralSource], ["Attachments", attachments.length ? attachments.map((item) => item.filename).join(", ") : "None"],
  ];
  const content = `<tr><td style="padding:42px 30px 24px"><div style="color:#762b53;font-size:11px;font-weight:800;letter-spacing:1.6px">NEW QUALIFIED INQUIRY</div><h1 style="margin:12px 0 8px;font-size:34px;line-height:1.05;letter-spacing:-1.4px">${escapeHtml(record.organization)} wants to work with Keith.</h1><p style="margin:0;color:#665f59;line-height:1.6">Review the opportunity below and reply directly to ${escapeHtml(record.fullName)} when it is ready for qualification.</p></td></tr><tr><td style="padding:0 30px 38px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #eaded7;border-radius:18px;overflow:hidden">${rows.map(([label, item], index) => `<tr><td style="width:155px;padding:13px 15px;background:${index % 2 ? "#fffaf4" : "#f7f1e7"};font-size:12px;font-weight:800;color:#762b53;vertical-align:top">${escapeHtml(label)}</td><td style="padding:13px 15px;background:${index % 2 ? "#fffdf8" : "#fbf7f1"};font-size:13px;line-height:1.5;color:#2f2a27">${escapeHtml(displayValue(item))}</td></tr>`).join("")}</table></td></tr>`;
  return shell(content, `New partnership inquiry ${record.reference} from ${record.organization}`);
}

export function confirmationEmail(record: InquiryRecord) {
  const firstName = record.fullName.split(/\s+/)[0] || "there";
  const content = `<tr><td style="padding:46px 34px 26px"><div style="display:inline-block;padding:8px 12px;border-radius:999px;background:#f5d9e2;color:#762b53;font-size:11px;font-weight:800;letter-spacing:1.3px">INQUIRY RECEIVED</div><h1 style="margin:20px 0 12px;font-size:42px;line-height:1;letter-spacing:-2px">Thank you, ${escapeHtml(firstName)}.</h1><p style="margin:0;color:#665f59;font-size:16px;line-height:1.7">Your opportunity is now in the partnership review queue. A member of the team will assess fit, timing, and operational requirements, then follow up using the contact details you provided.</p></td></tr><tr><td style="padding:0 34px 28px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#11100f;border-radius:20px;color:#fffdf8"><tr><td style="padding:24px"><div style="color:#ef9fbb;font-size:11px;font-weight:800;letter-spacing:1.5px">YOUR REFERENCE</div><div style="margin-top:8px;font-size:25px;font-weight:800;letter-spacing:.5px">${escapeHtml(record.reference)}</div><div style="margin-top:7px;color:#aaa3a0;font-size:12px">Keep this number for future correspondence.</div></td></tr></table></td></tr><tr><td style="padding:0 34px 42px"><h2 style="margin:8px 0 18px;font-size:21px">What happens next</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="width:42px;vertical-align:top"><span style="display:inline-block;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;background:#e65484;color:#fff;font-weight:800">1</span></td><td style="padding-bottom:18px"><strong style="font-size:14px">Qualification</strong><div style="margin-top:4px;color:#665f59;font-size:13px;line-height:1.5">The team reviews brand fit, objectives, timing, budget, and logistics.</div></td></tr><tr><td style="width:42px;vertical-align:top"><span style="display:inline-block;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;background:#f26a35;color:#fff;font-weight:800">2</span></td><td style="padding-bottom:18px"><strong style="font-size:14px">Follow-up</strong><div style="margin-top:4px;color:#665f59;font-size:13px;line-height:1.5">If there is a potential fit, an approved representative will request any next-step detail.</div></td></tr><tr><td style="width:42px;vertical-align:top"><span style="display:inline-block;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;background:#762b53;color:#fff;font-weight:800">3</span></td><td><strong style="font-size:14px">Written confirmation</strong><div style="margin-top:4px;color:#665f59;font-size:13px;line-height:1.5">Availability, scope, rates, and deliverables are confirmed only in a formal proposal or agreement.</div></td></tr></table><div style="margin-top:28px;padding:18px;border-left:4px solid #e65484;background:#f7f1e7;color:#5f5751;font-size:12px;line-height:1.6"><strong style="color:#11100f">Fraud protection:</strong> Do not send payment, passwords, or sensitive financial information in response to an unverified contact.</div></td></tr>`;
  return shell(content, `We received your Keith Lee partnership inquiry. Reference ${record.reference}`);
}

export function confirmationText(record: InquiryRecord) {
  return `Thank you, ${record.fullName}.\n\nWe received your Keith Lee partnership inquiry.\nReference: ${record.reference}\n\nThe team will assess fit, timing, budget, and operational requirements. If there is a potential fit, an approved representative will follow up using the contact details you provided.\n\nSubmission does not confirm availability, endorsement, or a commercial agreement.`;
}

export function internalText(record: InquiryRecord) {
  return `New Keith Lee partnership inquiry\nReference: ${record.reference}\nOrganization: ${record.organization}\nContact: ${record.fullName} <${record.workEmail}>\nEngagement: ${labels[record.engagementType] || record.engagementType}\nObjective: ${record.objective}\nBudget: ${record.budgetRange}\nPreferred date: ${record.preferredDate}\nLocation: ${record.location}\n\nReview the complete HTML summary and any attachments in this message.`;
}

export async function sendEmail(apiKey: string, payload: Record<string, unknown>, idempotencyKey: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(payload),
  });
  const responseText = await response.text();
  if (!response.ok) throw new Error(`Transactional email request failed with status ${response.status}.`);
  try {
    return JSON.parse(responseText) as { id?: string };
  } catch {
    return {};
  }
}

export type { EmailAttachment, InquiryRecord };
