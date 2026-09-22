import { CookieNotice } from "./CookieNotice";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WebMCP } from "./WebMCP";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /><CookieNotice /><WebMCP /></>;
}
