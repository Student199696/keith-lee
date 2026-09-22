import type { Metadata } from "next";
import { PageFrame } from "../components/PageFrame";
import { PartnershipForm } from "../components/PartnershipForm";

export const metadata: Metadata = { title: "Partner With Keith | Qualified Inquiry", description: "Submit a structured restaurant, hospitality, destination, brand, or event partnership inquiry for Keith Lee." };

export default async function PartnerPage({ searchParams }: { searchParams: Promise<{ type?: string }> }){const params=await searchParams;return <PageFrame><main className="inner-main partner-page"><section className="partner-intro"><p className="eyebrow light"><span/> Partner with Keith</p><h1>Tell us what makes this opportunity worth considering.</h1><p>This structured form helps the team qualify fit, route the request, and reduce unnecessary follow-up. It usually takes 5–8 minutes.</p><div className="partner-expectations"><span>Before you begin</span><ul><li>Know the objective and decision-maker</li><li>Have a realistic budget range</li><li>Share operational and timing constraints</li><li>Do not include payment details or passwords</li></ul></div></section><PartnershipForm initialType={params.type}/></main></PageFrame>}
