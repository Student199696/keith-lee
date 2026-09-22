import type { Metadata } from "next";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { PageFrame } from "../components/PageFrame";

export const metadata: Metadata = { title: "Collaborations | Keith Lee Partnerships", description: "Explore restaurant, destination, event, and long-term collaboration pathways with Keith Lee." };

const engagements = [
  ["Organic restaurant visits", "Independent editorial activity", "Not commissioned or guaranteed", "Editorial"],
  ["Paid brand partnerships", "Brands with a credible food, hospitality, or community connection", "Typically 8–12+ weeks", "Commercial"],
  ["Restaurant campaigns", "Established concepts ready for planned attention and operational coordination", "Typically 6–10+ weeks", "Campaign"],
  ["Multi-location & franchise", "Groups able to coordinate quality and service across markets", "Typically 10–16+ weeks", "Enterprise"],
  ["Tourism & destination", "Food-led city and regional storytelling with a clear local perspective", "Typically 12–20+ weeks", "Destination"],
  ["Speaking, hosting & live", "Festivals, panels, cultural events, and considered live formats", "Typically 8–16+ weeks", "Appearance"],
  ["Long-term ambassador", "Values-aligned relationships built across multiple moments", "Custom annual scope", "Ambassador"],
];

export default function CollaborationsPage() {
  return <PageFrame><main className="inner-main">
    <section className="inner-hero compact-hero"><div><p className="eyebrow"><span /> Collaboration pathways</p><h1>Choose the relationship before defining the deliverables.</h1><p>Every format begins with fit. The team reviews the story, audience relevance, timing, operational readiness, disclosures, usage rights, and the level of editorial independence required.</p></div><div className="hero-side-note"><span>For consideration</span><strong>Clear objective.<br/>Real decision-maker.<br/>Operational readiness.</strong><a href="/partner">Request a proposal <ArrowUpRight aria-hidden="true" size={18}/></a></div></section>
    <section className="content-panel engagement-list">
      {engagements.map(([title, fit, timing, type], index) => <article key={title}>
        <div className="engagement-number">{String(index + 1).padStart(2, "0")}</div>
        <div><span className="type-pill">{type}</span><h2>{title}</h2><p>{fit}</p></div>
        <div className="timeline"><Clock3 aria-hidden="true" size={17}/><span>{timing}</span></div>
        <a href={`/partner?type=${encodeURIComponent(type.toLowerCase())}`} aria-label={`Request a proposal for ${title}`}><ArrowUpRight aria-hidden="true"/></a>
      </article>)}
    </section>
    <section className="process-panel"><div><p className="eyebrow light"><span /> Review process</p><h2>A deliberate path from inquiry to activation.</h2></div><ol>{["Qualified inquiry","Fit and conflict review","Discovery conversation","Scope and proposal","Legal and disclosure review","Activation planning","Delivery and approved reporting"].map((step, index)=><li key={step}><span>{index+1}</span>{step}</li>)}</ol></section>
  </main></PageFrame>;
}
