"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors preserve Vinext client compatibility */

import { ArrowLeft, ArrowRight, Check, FileUp, Loader2, ShieldCheck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormState = Record<string, string | boolean>;

const initial: FormState = {
  engagementType: "",
  objective: "",
  fullName: "",
  workEmail: "",
  organization: "",
  role: "",
  decisionMaker: false,
  restaurantName: "",
  website: "",
  location: "",
  ownershipType: "",
  numberOfLocations: "",
  preferredDate: "",
  dateFlexibility: "",
  budgetRange: "",
  audience: "",
  operations: "",
  dietary: "",
  accessibility: "",
  travel: "",
  referralSource: "",
  companyWebsite: "",
  consent: false,
};

const requiredByStep = [
  ["engagementType", "objective"],
  ["fullName", "workEmail", "organization", "role", "location"],
  ["preferredDate", "dateFlexibility", "budgetRange"],
  ["consent"],
];

export function PartnershipForm({ initialType = "" }: { initialType?: string }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormState>({ ...initial, engagementType: initialType });
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<{ reference: string; confirmationDelivered: boolean } | null>(null);
  const progress = useMemo(() => ((step + 1) / 4) * 100, [step]);

  function update(name: string, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function next() {
    const missing = requiredByStep[step].filter((key) => !values[key]);
    if (missing.length) {
      setError("Please complete the required fields before continuing.");
      return;
    }
    setStep((current) => Math.min(3, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!values.consent) {
      setError("Please confirm the privacy and accuracy statement.");
      return;
    }
    setSubmitting(true);
    setError("");
    const payload = new FormData();
    Object.entries(values).forEach(([key, value]) => payload.append(key, String(value)));
    files.forEach((file) => payload.append("attachments", file));
    try {
      const response = await fetch("/api/inquiries", { method: "POST", body: payload });
      const result = await response.json() as { reference?: string; confirmationDelivered?: boolean; error?: string };
      if (!response.ok) throw new Error(result.error || "The inquiry could not be sent.");
      setReceipt({ reference: result.reference || "received", confirmationDelivered: result.confirmationDelivered !== false });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The inquiry could not be sent. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (receipt) return <div className="form-success" role="status" aria-live="polite"><span><Check aria-hidden="true"/></span><p className="eyebrow"><i /> Securely received</p><h2>Thank you. Your opportunity is now with the partnerships team.</h2><p className="success-message">We have recorded the details for an initial fit and availability review. A member of the team will follow up using the business email you provided if the opportunity is suitable.</p><p>Your reference is <strong>{receipt.reference}</strong>. Keep it available for future correspondence.</p>{receipt.confirmationDelivered?<p>A confirmation email is on its way to your inbox.</p>:<p>Your inquiry is secure. The email receipt may be delayed, but the team has your submission.</p>}<p><small>Submission does not confirm availability, endorsement, or a partnership.</small></p><a href="/">Return to the partnership platform</a></div>;

  return <form className="partnership-form" onSubmit={submit}>
    <label className="spam-trap" aria-hidden="true">Company website<input tabIndex={-1} autoComplete="off" value={String(values.companyWebsite)} onChange={(event)=>update("companyWebsite",event.target.value)} /></label>
    <div className="form-progress"><div><span>Step {step + 1} of 4</span><strong>{["Opportunity", "Organization", "Timing & scope", "Operations & review"][step]}</strong></div><Progress value={progress} aria-label={`${Math.round(progress)} percent complete`} /></div>

    {step === 0 && <fieldset><legend>What would you like to explore?</legend><p className="field-intro">Choose the closest pathway. The team may recommend a different structure after review.</p><div className="field-grid">
      <div className="field field-wide"><Label>Engagement type *</Label><Select value={String(values.engagementType)} onValueChange={(value)=>update("engagementType",value)}><SelectTrigger className="select-control"><SelectValue placeholder="Select an engagement"/></SelectTrigger><SelectContent><SelectItem value="restaurant">Restaurant collaboration</SelectItem><SelectItem value="brand">Paid brand partnership</SelectItem><SelectItem value="multi-location">Multi-location or franchise</SelectItem><SelectItem value="destination">Tourism or destination campaign</SelectItem><SelectItem value="speaking">Speaking, hosting, or appearance</SelectItem><SelectItem value="ambassador">Long-term ambassador relationship</SelectItem><SelectItem value="other">Another opportunity</SelectItem></SelectContent></Select></div>
      <div className="field field-wide"><Label htmlFor="objective">Primary objective *</Label><Textarea id="objective" value={String(values.objective)} onChange={(e)=>update("objective",e.target.value)} placeholder="What should this opportunity accomplish, and why is Keith the right fit?" rows={6}/></div>
      <div className="field field-wide"><Label htmlFor="audience">Target audience</Label><Input id="audience" value={String(values.audience)} onChange={(e)=>update("audience",e.target.value)} placeholder="Who do you need to reach?"/></div>
    </div></fieldset>}

    {step === 1 && <fieldset><legend>Who is behind the opportunity?</legend><p className="field-intro">Use professional details so the inquiry can be verified and routed correctly.</p><div className="field-grid">
      <div className="field"><Label htmlFor="fullName">Full name *</Label><Input id="fullName" autoComplete="name" value={String(values.fullName)} onChange={(e)=>update("fullName",e.target.value)}/></div>
      <div className="field"><Label htmlFor="workEmail">Work email *</Label><Input id="workEmail" type="email" autoComplete="email" value={String(values.workEmail)} onChange={(e)=>update("workEmail",e.target.value)}/></div>
      <div className="field"><Label htmlFor="organization">Organization *</Label><Input id="organization" autoComplete="organization" value={String(values.organization)} onChange={(e)=>update("organization",e.target.value)}/></div>
      <div className="field"><Label htmlFor="role">Your role *</Label><Input id="role" autoComplete="organization-title" value={String(values.role)} onChange={(e)=>update("role",e.target.value)} placeholder="Title or agency relationship"/></div>
      <div className="field"><Label htmlFor="restaurantName">Restaurant or client name</Label><Input id="restaurantName" value={String(values.restaurantName)} onChange={(e)=>update("restaurantName",e.target.value)}/></div>
      <div className="field"><Label htmlFor="website">Website</Label><Input id="website" type="url" value={String(values.website)} onChange={(e)=>update("website",e.target.value)} placeholder="https://"/></div>
      <div className="field"><Label htmlFor="location">Primary location *</Label><Input id="location" value={String(values.location)} onChange={(e)=>update("location",e.target.value)} placeholder="City, state/region, country"/></div>
      <div className="field"><Label>Ownership model</Label><Select value={String(values.ownershipType)} onValueChange={(value)=>update("ownershipType",value)}><SelectTrigger className="select-control"><SelectValue placeholder="Select one"/></SelectTrigger><SelectContent><SelectItem value="independent">Independent</SelectItem><SelectItem value="restaurant-group">Restaurant group</SelectItem><SelectItem value="franchise">Franchise</SelectItem><SelectItem value="corporate">Corporate owned</SelectItem><SelectItem value="agency">Agency representing client</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
      <div className="field"><Label htmlFor="numberOfLocations">Number of locations</Label><Input id="numberOfLocations" type="number" min="1" value={String(values.numberOfLocations)} onChange={(e)=>update("numberOfLocations",e.target.value)}/></div>
      <label className="check-row"><Checkbox checked={Boolean(values.decisionMaker)} onCheckedChange={(checked)=>update("decisionMaker",checked===true)}/><span>I am a decision-maker or authorized representative.</span></label>
    </div></fieldset>}

    {step === 2 && <fieldset><legend>What are the timing and commercial parameters?</legend><p className="field-intro">A realistic range helps the team assess fit without unnecessary back-and-forth.</p><div className="field-grid">
      <div className="field"><Label htmlFor="preferredDate">Preferred start or event date *</Label><Input id="preferredDate" type="date" value={String(values.preferredDate)} onChange={(e)=>update("preferredDate",e.target.value)}/></div>
      <div className="field"><Label>Date flexibility *</Label><Select value={String(values.dateFlexibility)} onValueChange={(value)=>update("dateFlexibility",value)}><SelectTrigger className="select-control"><SelectValue placeholder="Select flexibility"/></SelectTrigger><SelectContent><SelectItem value="fixed">Fixed date</SelectItem><SelectItem value="one-week">Within one week</SelectItem><SelectItem value="one-month">Within one month</SelectItem><SelectItem value="quarter">Within the quarter</SelectItem><SelectItem value="open">Open timing</SelectItem></SelectContent></Select></div>
      <div className="field field-wide"><Label>Budget range *</Label><Select value={String(values.budgetRange)} onValueChange={(value)=>update("budgetRange",value)}><SelectTrigger className="select-control"><SelectValue placeholder="Choose the approved or expected range"/></SelectTrigger><SelectContent><SelectItem value="under-25k">Under $25,000</SelectItem><SelectItem value="25k-50k">$25,000–$50,000</SelectItem><SelectItem value="50k-100k">$50,000–$100,000</SelectItem><SelectItem value="100k-250k">$100,000–$250,000</SelectItem><SelectItem value="250k-plus">$250,000+</SelectItem><SelectItem value="discuss">Requires discussion</SelectItem></SelectContent></Select></div>
      <div className="field field-wide"><Label htmlFor="travel">Travel and geography</Label><Textarea id="travel" value={String(values.travel)} onChange={(e)=>update("travel",e.target.value)} placeholder="Locations, travel coverage, security, visas, or on-site expectations" rows={4}/></div>
      <div className="field field-wide"><Label htmlFor="referralSource">How did you reach this platform?</Label><Input id="referralSource" value={String(values.referralSource)} onChange={(e)=>update("referralSource",e.target.value)} placeholder="Agency, referral, search, event, or other source"/></div>
    </div></fieldset>}

    {step === 3 && <fieldset><legend>What should the team know before review?</legend><p className="field-intro">Operational detail helps protect Keith, the restaurant team, guests, and the quality of the experience.</p><div className="field-grid">
      <div className="field field-wide"><Label htmlFor="operations">Operational considerations</Label><Textarea id="operations" value={String(values.operations)} onChange={(e)=>update("operations",e.target.value)} placeholder="Capacity, staffing, service constraints, filming plan, security, or other context" rows={4}/></div>
      <div className="field"><Label htmlFor="dietary">Dietary or allergen information</Label><Textarea id="dietary" value={String(values.dietary)} onChange={(e)=>update("dietary",e.target.value)} rows={4}/></div>
      <div className="field"><Label htmlFor="accessibility">Accessibility requirements</Label><Textarea id="accessibility" value={String(values.accessibility)} onChange={(e)=>update("accessibility",e.target.value)} rows={4}/></div>
      <div className="field field-wide upload-field"><Label htmlFor="attachments"><FileUp aria-hidden="true"/> Brief, menu, deck, or venue information</Label><Input id="attachments" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" onChange={(e)=>{const selected=Array.from(e.target.files||[]).slice(0,3);const total=selected.reduce((sum,file)=>sum+file.size,0);if(total>4*1024*1024){e.target.value="";setFiles([]);setError("Attachments must be 4 MB or less in total.");return;}setFiles(selected);setError("");}}/><small>Up to 3 files, 4 MB total. PDF, Word, JPG, PNG, or WebP.</small>{files.length>0&&<ul>{files.map(file=><li key={`${file.name}-${file.size}`}>{file.name}</li>)}</ul>}</div>
      <label className="check-row field-wide"><Checkbox checked={Boolean(values.consent)} onCheckedChange={(checked)=>update("consent",checked===true)}/><span>I confirm that this information is accurate, I am authorized to submit it, and I agree to the <a href="/legal/privacy" target="_blank">privacy notice</a>. *</span></label>
      <div className="security-note field-wide"><ShieldCheck aria-hidden="true"/><p><strong>Fraud protection:</strong> Submission does not create a booking, contract, or payment obligation. The team will verify next steps through an approved business channel.</p></div>
    </div></fieldset>}

    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="form-actions">{step>0?<Button type="button" variant="outline" onClick={()=>setStep(step-1)}><ArrowLeft/> Back</Button>:<span/>}{step<3?<Button type="button" onClick={next}>Continue <ArrowRight/></Button>:<Button type="submit" disabled={submitting}>{submitting?<><Loader2 className="spin"/> Sending securely…</>:<>Submit for review <ArrowRight/></>}</Button>}</div>
  </form>;
}
