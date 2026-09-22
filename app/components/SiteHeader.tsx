"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors preserve Vinext client compatibility */

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  ["About", "/about"],
  ["Collaborations", "/collaborations"],
  ["Impact", "/impact"],
  ["Media", "/media"],
  ["Speaking", "/speaking"],
  ["FAQ", "/faq"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Keith Lee partnership platform home">
        <span className="brand-mark">KL</span>
        <span className="brand-copy">Keith Lee<small>Partnerships</small></span>
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="header-cta" href="/partner">
        Partner with Keith <ArrowUpRight aria-hidden="true" size={17} />
      </a>
      <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && (
        <div className="mobile-menu">
          {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          <a href="/partner">Start an inquiry <ArrowUpRight aria-hidden="true" size={18} /></a>
        </div>
      )}
    </header>
  );
}
