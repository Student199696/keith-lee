import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";
export const metadata: Metadata = { title: "Accessibility | Keith Lee Partnerships" };
export default function Accessibility(){return <LegalPage title="Accessibility statement" intro="A commitment to making professional access usable for more people." sections={[
  {heading:"Our aim",body:"The platform is designed with semantic structure, keyboard-friendly controls, visible focus, readable contrast, responsive layouts, text enlargement, reduced-motion preferences, and meaningful alternative text."},
  {heading:"Media",body:"Video controls are provided. Captions and transcripts should be added to all final public video once approved source files or caption tracks are available."},
  {heading:"Inquiry support",body:"If a form field, file upload, video, or other part of the platform is difficult to use, request an accessible alternative through the official contact route and describe the page and barrier encountered."},
  {heading:"Ongoing work",body:"Accessibility is maintained through testing, content review, and remediation as the platform changes. Third-party content and services may have separate accessibility limitations."},
]}/>}
