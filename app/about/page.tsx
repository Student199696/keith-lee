import type { Metadata } from "next";
import { ArrowUpRight, Heart, Scale, ShieldCheck, Utensils } from "lucide-react";
import { PageFrame } from "../components/PageFrame";

export const metadata: Metadata = { title: "About Keith | Keith Lee Partnerships", description: "Keith Lee's audience-first approach to food, community, and restaurant storytelling." };

export default function AboutPage() {
  return <PageFrame><main className="inner-main">
    <section className="inner-hero about-hero">
      <div><p className="eyebrow"><span /> About Keith</p><h1>Food criticism with a human center.</h1><p>Keith&apos;s work is grounded in honest reactions, accessible storytelling, and a direct relationship with the people watching. Restaurants are never scenery—they are businesses, families, teams, and communities.</p></div>
      <div className="portrait-composition"><img className="portrait-main" src="/media/keith-event.webp" alt="Keith Lee at a food and culture event" /><img className="portrait-inset" src="/media/keith-portrait.jpeg" alt="Portrait of Keith Lee" /></div>
    </section>

    <section className="content-panel values-panel">
      <div className="section-kicker"><span>01</span><p>What guides the work</p></div>
      <div className="value-grid">
        <article><Heart aria-hidden="true"/><h2>Community first</h2><p>Attention should create possibility without losing sight of the people behind the counter.</p></article>
        <article><Scale aria-hidden="true"/><h2>Honesty over hype</h2><p>A partnership cannot purchase a reaction or predetermine an editorial point of view.</p></article>
        <article><Utensils aria-hidden="true"/><h2>The food matters</h2><p>The experience, preparation, service, story, and operational reality all shape the conversation.</p></article>
        <article><ShieldCheck aria-hidden="true"/><h2>Clear boundaries</h2><p>Commercial relationships, permissions, claims, and expectations are documented before work begins.</p></article>
      </div>
    </section>

    <section className="split-story">
      <img src="/media/keith-community.jpeg" alt="Keith Lee meeting people in the community" />
      <div><p className="eyebrow light"><span /> Audience relationship</p><h2>Trust is the asset. Protecting it is the strategy.</h2><p>The strongest opportunities give Keith room to be himself, give the audience clear context, and give the partner an honest understanding of what participation does—and does not—guarantee.</p><a href="/collaborations">See how collaborations work <ArrowUpRight aria-hidden="true" size={18}/></a></div>
    </section>
  </main></PageFrame>;
}
