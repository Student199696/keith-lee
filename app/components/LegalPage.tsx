import { PageFrame } from "./PageFrame";

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: { heading: string; body: string }[] }) {
  return <PageFrame><main className="inner-main"><section className="legal-hero"><p className="eyebrow"><span/> Standards & policies</p><h1>{title}</h1><p>{intro}</p><small>Last updated September 14, 2026</small></section><article className="legal-copy">{sections.map(section=><section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</article></main></PageFrame>;
}
