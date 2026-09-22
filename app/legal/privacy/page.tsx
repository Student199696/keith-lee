import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";
export const metadata: Metadata = { title: "Privacy | Keith Lee Partnerships" };
export default function Privacy(){return <LegalPage title="Privacy notice" intro="How information submitted through this partnership platform is handled." sections={[
  {heading:"Information you provide",body:"The inquiry flow may collect professional contact details, organization and restaurant information, opportunity details, dates, budget range, operational requirements, and files you choose to upload."},
  {heading:"Why it is used",body:"Information is used to verify the requester, evaluate fit, route the opportunity, prevent abuse, communicate about the request, and maintain an appropriate business record."},
  {heading:"Sharing and access",body:"Access should be limited to authorized representatives, management, agency, legal, production, or partnership personnel who need the information to evaluate or deliver the opportunity. Information is not intended for sale."},
  {heading:"Retention and security",body:"Inquiry records and attachments should be retained only as long as reasonably needed for evaluation, legal, fraud-prevention, and business record purposes. Reasonable safeguards are used, but no online system can promise absolute security."},
  {heading:"Your choices",body:"Do not submit passwords, payment credentials, government identifiers, medical records, or other unnecessary sensitive information. Privacy, correction, or deletion requests can be started through the official contact route."},
  {heading:"Final review",body:"This notice is operational copy for the partnership platform and should be reviewed against the final entity, jurisdictions, vendors, and legal requirements before a custom-domain launch."},
]}/>}
