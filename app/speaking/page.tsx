import type { Metadata } from "next";
import { ArrowUpRight, Mic2, PanelTop, Presentation, UsersRound } from "lucide-react";
import { PageFrame } from "../components/PageFrame";

export const metadata: Metadata = { title: "Speaking & Events | Keith Lee Partnerships", description: "Speaking, hosting, festivals, panels, and live appearance opportunities with Keith Lee." };

export default function SpeakingPage() {
  return <PageFrame><main className="inner-main">
    <section className="inner-hero event-hero"><div><p className="eyebrow"><span /> Speaking & events</p><h1>Bring the conversation into the room.</h1><p>Considered appearances for food, culture, entrepreneurship, community, and creator-economy audiences—reviewed for format, purpose, production quality, timing, and fit.</p><a className="button button-dark" href="/partner?type=speaking">Request an appearance <ArrowUpRight size={18}/></a></div><img src="/media/keith-event.webp" alt="Keith Lee attending a food and culture event"/></section>
    <section className="content-panel event-grid">{[[Mic2,"Keynotes & conversations","Personal, moderated formats built around an audience with a real reason to listen."],[UsersRound,"Panels & festivals","Food, hospitality, culture, community, creator, and entrepreneurship programming."],[PanelTop,"Hosting & live formats","Purpose-built stage, culinary, and audience-interaction opportunities."],[Presentation,"Campaign appearances","Select partner events with defined disclosure, usage, travel, and production terms."]].map(([Icon,title,text])=>{const I=Icon as typeof Mic2;return <article key={String(title)}><I/><h2>{String(title)}</h2><p>{String(text)}</p></article>})}</section>
    <section className="request-checklist"><div><p className="eyebrow light"><span /> A strong request includes</p><h2>Give the team enough context to make a fast, informed decision.</h2></div><ul>{["Event purpose and audience","Date, location, and format","Role and expected time commitment","Production and accessibility plan","Travel and security requirements","Budget range and decision timeline","Recording and content usage rights"].map(item=><li key={item}>{item}</li>)}</ul></section>
  </main></PageFrame>;
}
