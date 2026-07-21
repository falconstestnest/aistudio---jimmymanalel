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
  { to: ROUTES.strategyConversation, label: "Private Conversation" },
] as const;

/**
 * Compact identity header:
 * Left: JM + Jimmy Manalel (+ muted title on desktop)
 * Centre: Venture Tools · Asia–GCC · About
 * Right: Private Conversation (desktop) / menu (mobile)
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-14 py-2.5 flex items-center justify-between gap-3">
        <Link
          to={ROUTES.home}
          className="flex items-center gap-2.5 min-w-0 shrink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
          aria-label="Jimmy Manalel — Home"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 text-[11px] font-mono font-bold tracking-wide text-amber-500"
            aria-hidden="true"
          >
            JM
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-sans font-semibold text-zinc-100 tracking-tight leading-tight truncate">
              Jimmy Manalel
            </span>
            <span className="hidden md:block text-[10px] font-mono uppercase tracking-wider text-zinc-500 leading-tight mt-0.5">
              Venture Corridor Builder · Cross-Border Startup Strategist
            </span>
          </span>
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
            className="hidden md:inline-flex bg-amber-500 hover:bg-amber-400 text-black px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-sans font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
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
          <p className="px-3 pb-3 text-[10px] font-mono uppercase tracking-wider text-zinc-500 leading-relaxed">
            Venture Corridor Builder · Cross-Border Startup Strategist
          </p>
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {MOBILE_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-3 py-2.5 text-sm hover:bg-zinc-900 ${
                  item.to === ROUTES.strategyConversation
                    ? "mt-1 bg-amber-500 text-black font-semibold hover:bg-amber-400"
                    : "text-zinc-300"
                }`}
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
