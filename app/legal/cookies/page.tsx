import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";
export const metadata: Metadata = { title: "Cookies | Keith Lee Partnerships" };
export default function Cookies(){return <LegalPage title="Cookie information" intro="A clear explanation of browser storage and optional measurement." sections={[
  {heading:"Necessary storage",body:"The site may remember a privacy preference and use essential security or session mechanisms needed to deliver the website and process a requested interaction."},
  {heading:"Optional measurement",body:"Analytics should remain off until consent where required. When enabled, measurement may help understand page use, form starts and completion, media engagement, and site reliability."},
  {heading:"Your choice",body:"The on-site preference notice lets visitors choose necessary-only storage or allow optional measurement. Browser controls can also remove stored site data."},
  {heading:"Vendor configuration",body:"The final analytics, consent, CRM, hosting, and embedded-media vendors must be reflected here before a custom-domain launch."},
]}/>}
