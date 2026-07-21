import React from "react";
import { Link, NavLink } from "react-router";
import { ROUTES } from "../../lib/siteRoutes";

const linkClass =
  "hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkClass} ${isActive ? "text-white" : ""}`;

type SiteHeaderProps = {
  /** When true, homepage section anchors stay on-page */
  homeSectionLinks?: boolean;
};

/**
 * Compact site header: small home mark + original tool/pathways nav + CTA.
 * Profile routes (About, Corridors, GCC entry) live in the footer.
 */
export default function SiteHeader({ homeSectionLinks = false }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 bg-[#050505]/80 backdrop-blur-md border-b border-[#1f1f1f] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          to={ROUTES.home}
          className="flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 shrink-0"
          aria-label="Jimmy Manalel homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-display font-bold text-sm">
            JM
          </div>
          <span className="font-display font-medium text-white tracking-tight text-sm sm:text-base uppercase">
            Jimmy Manalel
          </span>
        </Link>

        <nav
          className="hidden xl:flex items-center gap-5 text-xs sm:text-sm font-medium text-zinc-400 font-sans"
          aria-label="Primary"
        >
          {homeSectionLinks ? (
            <>
              <a href="#ecosystem-engagement" className={linkClass}>
                Ecosystem
              </a>
              <a href="#services-header" className={linkClass}>
                Pathways
              </a>
            </>
          ) : (
            <>
              <Link to={`${ROUTES.home}#ecosystem-engagement`} className={linkClass}>
                Ecosystem
              </Link>
              <Link to={`${ROUTES.home}#services-header`} className={linkClass}>
                Pathways
              </Link>
            </>
          )}
          <NavLink to={ROUTES.dialogue} className={navLinkClass} end>
            Dialogue
          </NavLink>
          <NavLink to={ROUTES.narrativeGrader} className={navLinkClass}>
            Narrative Grader
          </NavLink>
          <NavLink to={ROUTES.commerceAudit} className={navLinkClass}>
            Analytics
          </NavLink>
          <NavLink
            to={ROUTES.advisory}
            className={({ isActive }) =>
              `${linkClass} text-amber-500 font-semibold ${isActive ? "text-amber-400" : ""}`
            }
          >
            Work With Jimmy
          </NavLink>
        </nav>

        <Link
          to={ROUTES.strategyConversation}
          className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-xs md:text-sm font-sans font-bold shadow-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 shrink-0"
          id="header-booking"
        >
          Request a Strategy Conversation
        </Link>
      </div>
    </header>
  );
}
