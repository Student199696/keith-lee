import type { Metadata } from "next";
import { ArrowUpRight, Download, Play } from "lucide-react";
import { PageFrame } from "../components/PageFrame";

export const metadata: Metadata = { title: "Media & Press | Keith Lee Partnerships", description: "Selected video, editorial coverage, and approved media resources for Keith Lee." };

const clips = [
  ["/media/keith-speaks.mp4", "Keith speaks", "Direct-to-audience"],
  ["/media/favorite-moment.mp4", "A favorite moment", "Food and culture"],
  ["/media/puddery-taste-test.mp4", "The Puddery taste test", "Restaurant review"],
];
const press = [
  ["/media/press-north-texas.jpg", "North Texas restaurant coverage"],
  ["/media/press-seattle-square.jpg", "Seattle review coverage"],
  ["/media/press-deli.jpg", "Restaurant conversation coverage"],
  ["/media/press-bay-area.jpg", "Bay Area restaurant coverage"],
  ["/media/press-seattle-wide.jpg", "Press archive detail"],
  ["/media/keith-review-clip.jpeg", "Video editorial excerpt"],
];

export default function MediaPage() {
  return <PageFrame><main className="inner-main">
    <section className="inner-hero compact-hero"><div><p className="eyebrow"><span /> Media & press</p><h1>Selected moments. Approved context.</h1><p>A working press room for editorial teams, event producers, and partners. Publication links, usage permissions, and final credits should be confirmed before republication.</p></div><a className="media-kit-card" href="/media-kit"><Download aria-hidden="true"/><span><small>Public resource</small><strong>View media kit</strong></span><ArrowUpRight aria-hidden="true"/></a></section>
    <section className="video-showcase"><div className="section-heading simple"><div><p className="eyebrow"><span /> Featured video</p><h2>Keith, in his own rhythm.</h2></div><p>Original supplied footage is presented with native controls, captions where available, and no claim that a featured moment was a paid collaboration.</p></div><div className="video-grid">{clips.map(([src,title,label])=><article key={src}><video controls playsInline preload="metadata"><source src={src} type="video/mp4"/></video><div><span><Play size={12} fill="currentColor"/> {label}</span><h3>{title}</h3></div></article>)}</div></section>
    <section className="press-section"><div className="section-heading simple"><div><p className="eyebrow light"><span /> Press archive</p><h2>Restaurant conversations in the news.</h2></div><p>Clippings are included as editorial reference. Rights remain with their respective publishers and creators.</p></div><div className="press-grid">{press.map(([src,title],index)=><figure className={index===0||index===3?"press-wide":""} key={src}><img src={src} alt={title}/><figcaption>{title}<span>Editorial reference</span></figcaption></figure>)}</div></section>
  </main></PageFrame>;
}
