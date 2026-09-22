import type { Metadata } from "next";
import { ArrowUpRight, BadgeCheck, FileCheck2, Quote } from "lucide-react";
import { PageFrame } from "../components/PageFrame";

export const metadata: Metadata = { title: "Impact Stories | Keith Lee Partnerships", description: "A transparent framework for documenting restaurant stories and verified collaboration outcomes." };

const storyFrames = [
  { image: "/media/keith-miami.jpg", label: "Restaurant discovery", title: "A local food story, told in real time", text: "The strongest case studies connect the restaurant context, Keith's role, the audience response, and approved evidence—without turning correlation into a promise." },
  { image: "/media/keith-brunchaholics.webp", label: "Owner perspective", title: "The people behind the restaurant", text: "Partner interviews and firsthand accounts can add operational context when the restaurant approves the language and supporting material." },
  { image: "/media/keith-community.jpeg", label: "Community context", title: "Attention that reaches beyond a view count", text: "Audience response is presented with timeframe, source, disclosure status, and the limits of what the available data can show." },
];

export default function ImpactPage() {
  return <PageFrame><main className="inner-main">
    <section className="inner-hero impact-hero"><div><p className="eyebrow"><span /> Impact stories</p><h1>Credibility lives in the receipts.</h1><p>Restaurant outcomes belong here only when the evidence exists, the source is named, the timeframe is clear, and everyone with approval rights has signed off.</p></div><div className="impact-proof-card"><BadgeCheck/><strong>No invented outcomes.</strong><p>Performance claims are withheld until documentation and permission are complete.</p></div></section>
    <section className="story-grid">{storyFrames.map((story)=><article key={story.title}><img src={story.image} alt="Keith Lee restaurant story context"/><div><span>{story.label}</span><h2>{story.title}</h2><p>{story.text}</p><a href="/partner">Discuss a documented case study <ArrowUpRight size={17}/></a></div></article>)}</section>
    <section className="evidence-panel"><div><p className="eyebrow light"><span /> Publishing standard</p><h2>Every major case study should answer seven questions.</h2></div><div className="evidence-grid">{["What was the restaurant context?","What was Keith's involvement?","Was the work organic or sponsored?","What content or activation ran?","How did the audience respond?","Which outcomes can be verified?","Who approved the testimonial and claim?"].map((item)=><p key={item}><FileCheck2 aria-hidden="true" size={17}/>{item}</p>)}</div><Quote className="evidence-quote" aria-hidden="true"/></section>
  </main></PageFrame>;
}
