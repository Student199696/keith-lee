"use client";

import { useEffect, useState } from "react";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(!localStorage.getItem("kl-cookie-choice")));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!visible) return null;

  function choose(value: "necessary" | "analytics") {
    localStorage.setItem("kl-cookie-choice", value);
    setVisible(false);
  }

  return (
    <aside className="cookie-notice" aria-label="Cookie preferences">
      <div><strong>Your privacy, kept simple.</strong><p>Necessary storage keeps this site working. Optional measurement will only be enabled with consent.</p></div>
      <div><button type="button" onClick={() => choose("necessary")}>Necessary only</button><button type="button" onClick={() => choose("analytics")}>Allow measurement</button></div>
      <a href="/legal/cookies">Cookie details</a>
    </aside>
  );
}
