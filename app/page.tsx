import { ArrowDownRight, ArrowUpRight, Check, Play } from "lucide-react";
import { PageFrame } from "./components/PageFrame";

const pathways = [
  {
    index: "01",
    title: "Restaurant collaborations",
    text: "For independent restaurants, groups, and multi-location concepts with a clear story and operational readiness.",
  },
  {
    index: "02",
    title: "Destination campaigns",
    text: "Food-led city stories for tourism boards and hospitality partners, shaped around place rather than promotion.",
  },
  {
    index: "03",
    title: "Speaking & live events",
    text: "Considered appearances, hosting, panels, festivals, and conversations about food, culture, and community.",
  },
];

export default function Home() {
  return (
    <PageFrame>
    <main>
      <section className="hero-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Official partnership platform</p>
          <h1>
            Restaurant stories that travel <em>beyond the table.</em>
          </h1>
          <p className="hero-intro">
            Keith Lee brings a trusted audience to honest food experiences. This is the professional path for restaurants, destinations, agencies, and events to explore the right kind of collaboration.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="/partner">
              Start a qualified inquiry <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            <a className="text-link" href="#collaborations">
              Explore engagement types <ArrowDownRight aria-hidden="true" size={18} />
            </a>
          </div>
          <ul className="trust-list" aria-label="Partnership commitments">
            <li><Check aria-hidden="true" size={14} /> Editorial independence</li>
            <li><Check aria-hidden="true" size={14} /> Verified outcomes only</li>
            <li><Check aria-hidden="true" size={14} /> Professionally managed access</li>
          </ul>
        </div>

        <div className="hero-media" aria-label="Keith Lee restaurant partnership footage">
          <img src="/media/keith-brunchaholics.webp" alt="Keith Lee meeting a restaurant owner in a professional kitchen" />
          <div className="hero-media-shade" />
          <div className="hero-media-caption">
            <span>Restaurant stories</span>
            <strong>Seen through a human lens.</strong>
          </div>
          <div className="video-card">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Keith Lee speaking directly to his audience"
            >
              <source src="/media/keith-speaks.mp4" type="video/mp4" />
            </video>
            <div className="video-chip"><Play aria-hidden="true" fill="currentColor" size={12} /> Keith speaks</div>
          </div>
          <div className="availability-badge">
            <span className="signal"><i /><i /><i /></span>
            <span><small>Inquiries</small> Select opportunities</span>
          </div>
        </div>
      </section>

      <section className="impact-strip" id="impact" aria-label="Partnership positioning">
        <p>Influence, handled with intention.</p>
        <div>
          <span>Culture</span><i />
          <span>Community</span><i />
          <span>Restaurant impact</span><i />
          <span>Professional access</span>
        </div>
      </section>

      <section className="pathways-section" id="collaborations">
        <div className="section-heading">
          <p className="eyebrow"><span /> Ways to work together</p>
          <h2>Built for the opportunity—not a generic package.</h2>
          <p>Every inquiry is reviewed for fit, timing, editorial boundaries, audience relevance, and the restaurant&apos;s readiness for attention.</p>
        </div>
        <div className="pathway-grid">
          {pathways.map((pathway) => (
            <a className="pathway-card" href="/collaborations" key={pathway.index}>
              <span className="card-index">{pathway.index}</span>
              <div>
                <h3>{pathway.title}</h3>
                <p>{pathway.text}</p>
              </div>
              <span className="card-arrow"><ArrowUpRight aria-hidden="true" size={20} /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="principle-preview" id="principles">
        <figure>
          <img src="/media/keith-community.jpeg" alt="Keith Lee in conversation with people outside a restaurant" />
        </figure>
        <div>
          <p className="eyebrow light"><span /> The standard</p>
          <blockquote>“The audience relationship comes first. The right partnership respects that.”</blockquote>
          <p className="principle-note">A working principle for this partnership platform—not a claim of guaranteed results.</p>
          <a href="/about">Read the approach <ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>
      </section>
    </main>
    </PageFrame>
  );
}
