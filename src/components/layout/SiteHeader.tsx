import React, { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { ROUTES } from "../../lib/siteRoutes";

const linkClass =
  "hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkClass} ${isActive ? "text-white" : "text-zinc-400"}`;

/** Secondary destinations live in the footer; mobile menu surfaces a compact set. */
const MOBILE_LINKS = [
  { to: ROUTES.ventureTools, label: "Venture Tools" },
  { to: ROUTES.asiaGcc, label: "Asia–GCC" },
  { to: ROUTES.about, label: "About" },
  { to: ROUTES.ventureCorridors, label: "Venture Corridors" },
  { to: ROUTES.gccMarketEntry, label: "GCC Market Entry" },
  { to: ROUTES.advisory, label: "Advisory" },
  { to: ROUTES.partnerships, label: "Partnerships" },
] as const;

/**
 * Minimal desktop header:
 * Left: Home · Centre: Venture Tools · Asia–GCC · About · Right: Private Conversation
 * Mobile: one menu + one CTA. No monogram, identity stack, or dual CTAs.
 */
export default function SiteHeader(_props: { homeSectionLinks?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobilePanelId = useId();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    mobileToggleRef.current?.focus();
  };

  return (
    <header className="sticky top-0 bg-[#050505]/90 backdrop-blur-md border-b border-[#1f1f1f] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        <Link
          to={ROUTES.home}
          className="text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded shrink-0"
          aria-label="Home"
        >
          Home
        </Link>

        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium"
          aria-label="Primary"
        >
          <NavLink to={ROUTES.ventureTools} className={navLinkClass}>
            Venture Tools
          </NavLink>
          <NavLink to={ROUTES.asiaGcc} className={navLinkClass}>
            Asia–GCC
          </NavLink>
          <NavLink to={ROUTES.about} className={navLinkClass} end>
            About
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={ROUTES.strategyConversation}
            className="bg-amber-500 hover:bg-amber-400 text-black px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-sans font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            id="header-booking"
          >
            Private Conversation
          </Link>

          <button
            ref={mobileToggleRef}
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-[#1f1f1f] p-2 text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            aria-expanded={mobileOpen}
            aria-controls={mobilePanelId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id={mobilePanelId}
          className="md:hidden border-t border-[#1f1f1f] bg-[#050505] px-4 py-4"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {MOBILE_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
                onClick={closeMobile}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
