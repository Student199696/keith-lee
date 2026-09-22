import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";
export const metadata: Metadata = { title: "Terms | Keith Lee Partnerships" };
export default function Terms(){return <LegalPage title="Website terms" intro="Plain-language conditions for using this partnership platform." sections={[
  {heading:"No booking or guarantee",body:"Submitting an inquiry does not create a contract, reservation, endorsement, review, appearance, or obligation to respond. Availability and participation are confirmed only through a fully approved written agreement."},
  {heading:"Accurate and authorized submissions",body:"Requesters must provide accurate information and have authority to represent the named organization or client. Impersonation, deceptive requests, spam, scraping, and unlawful use are prohibited."},
  {heading:"Editorial independence",body:"Commercial consideration cannot purchase a positive opinion or guarantee coverage, audience response, restaurant demand, sales, press, or any other outcome."},
  {heading:"Intellectual property",body:"Website copy, design, supplied media, names, likenesses, trademarks, and publisher clippings remain subject to their respective rights. Nothing on this site grants reuse rights beyond ordinary viewing."},
  {heading:"Third-party material",body:"Press clippings and referenced brands may be shown for context. Their inclusion does not imply ownership, sponsorship, endorsement, or continuing relationship."},
  {heading:"Changes and governing terms",body:"The final contracting entity, governing law, dispute process, and formal contact details should be confirmed by counsel before a custom-domain launch."},
]}/>}
