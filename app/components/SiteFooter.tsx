import { ArrowUpRight, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="footer-cta">
        <div>
          <p className="eyebrow light"><span /> Qualified opportunities</p>
          <h2>Have the right story for the table?</h2>
        </div>
        <a className="button button-pink" href="/partner">Begin partnership inquiry <ArrowUpRight aria-hidden="true" size={18} /></a>
      </section>
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-monogram">KL</span>
          <p>Professional access for restaurant, hospitality, destination, media, and live-event opportunities.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="/about">About Keith</a>
          <a href="/collaborations">Collaborations</a>
          <a href="/impact">Impact stories</a>
          <a href="/media">Media & press</a>
        </div>
        <div>
          <h3>Work together</h3>
          <a href="/speaking">Speaking & events</a>
          <a href="/partner">Partner with Keith</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Official contact</a>
        </div>
        <div>
          <h3>Standards</h3>
          <a href="/legal/privacy">Privacy</a>
          <a href="/legal/terms">Terms</a>
          <a href="/legal/accessibility">Accessibility</a>
          <a href="/legal/cookies">Cookies</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Keith Lee partnership platform.</span>
        <span><ShieldCheck aria-hidden="true" size={15} /> Verify booking requests through this official inquiry flow.</span>
      </div>
    </footer>
  );
}
