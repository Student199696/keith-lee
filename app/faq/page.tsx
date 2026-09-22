import type { Metadata } from "next";
import { PageFrame } from "../components/PageFrame";

export const metadata: Metadata = { title: "FAQ | Keith Lee Partnerships", description: "Answers about restaurant visits, partnerships, editorial independence, disclosures, scheduling, and outcomes." };

const faqs = [
  ["Can a restaurant pay for a positive review?", "No. Commercial consideration does not purchase a favorable reaction or guarantee coverage. Editorial perspective and honest experience remain independent."],
  ["What is the difference between an organic visit and a paid partnership?", "An organic visit is independently chosen and not commissioned. A paid partnership is contractually scoped, disclosed, and reviewed for brand fit, usage rights, and deliverables."],
  ["Does an inquiry guarantee a visit or collaboration?", "No. Submitting an inquiry starts a fit review. Availability, conflicts, logistics, editorial boundaries, and operational readiness all affect the decision."],
  ["How far in advance should we inquire?", "Timing depends on scope. Speaking and restaurant campaigns commonly need several weeks; multi-market and destination programs typically need a longer planning runway."],
  ["Should we share a budget?", "Yes. A credible range helps the team assess fit and recommend an appropriate path without unnecessary back-and-forth."],
  ["Can performance results be guaranteed?", "No. Audience response, restaurant demand, sales, foot traffic, and press attention cannot be guaranteed. Any public outcomes must be documented and approved."],
  ["How are sponsorships disclosed?", "Paid, gifted, hosted, or otherwise material relationships should be labeled clearly in line with the final platform, contract, and legal requirements."],
  ["What should restaurants prepare operationally?", "Share capacity, service constraints, allergy practices, accessibility information, security considerations, and the team responsible for the activation."],
  ["Can an agency submit for a client?", "Yes. Identify the end client, your agency role, the decision-maker, approval process, and who controls the budget."],
  ["How can we verify a booking request?", "Use the official inquiry flow on this site. Do not send payment or confidential information to an unverified account claiming to represent Keith."],
];

export default function FAQPage(){return <PageFrame><main className="inner-main"><section className="inner-hero faq-hero"><div><p className="eyebrow"><span /> Frequently asked</p><h1>Clarity before the first call.</h1><p>Direct answers about access, independence, scheduling, disclosures, operational readiness, and what collaboration can realistically deliver.</p></div></section><section className="faq-layout"><aside><strong>Still deciding?</strong><p>Start with the engagement pathways, then use the structured inquiry when the opportunity is concrete.</p><a href="/collaborations">Explore collaborations</a><a href="/partner">Begin an inquiry</a></aside><div className="faq-list">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section></main></PageFrame>}
