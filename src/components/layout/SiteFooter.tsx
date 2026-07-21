import React from "react";
import { Link } from "react-router";
import { Mail, Linkedin } from "lucide-react";
import { ROUTES } from "../../lib/siteRoutes";

const colTitle = "text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-3";
const colLink =
  "text-xs text-zinc-400 hover:text-zinc-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded";

/**
 * Editorial footer — primary home for identity and strategic navigation.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-[#080808] text-zinc-400 border-t border-[#1f1f1f] py-14 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-8 border-b border-[#1f1f1f]">
          <p className="text-sm font-medium text-zinc-200 tracking-tight">Jimmy Manalel</p>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            Venture Corridor Builder · Cross-Border Startup Strategist
          </p>
          <p className="mt-2 text-xs text-zinc-600 max-w-xl leading-relaxed">
            Building commercial pathways between Southeast Asia, South Korea, India and the GCC.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          <div>
            <h4 className={colTitle}>Corridors</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.asiaGcc} className={colLink}>
                  Asia–GCC Corridors
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ventureCorridors} className={colLink}>
                  Venture corridors
                </Link>
              </li>
              <li>
                <Link to={ROUTES.gccMarketEntry} className={colLink}>
                  GCC market entry
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={colTitle}>Founder Pathways</h4>
            <ul className="space-y-2">
              <li>
                <Link to={`${ROUTES.asiaGcc}#audit`} className={colLink}>
                  GCC readiness
                </Link>
              </li>
              <li>
                <Link to={ROUTES.advisory} className={colLink}>
                  Advisory enquiry
                </Link>
              </li>
              <li>
                <Link to={ROUTES.strategyConversation} className={colLink}>
                  Strategy conversation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={colTitle}>Operator Perspective</h4>
            <ul className="space-y-2">
              <li>
                <Link to={`${ROUTES.asiaGcc}#investors`} className={colLink}>
                  Commercial assessment
                </Link>
              </li>
              <li>
                <Link to={ROUTES.investorNarrative} className={colLink}>
                  Investor narrative
                </Link>
              </li>
              <li>
                <Link to={ROUTES.commerceInfrastructure} className={colLink}>
                  Commerce infrastructure
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={colTitle}>Ecosystem Programmes</h4>
            <ul className="space-y-2">
              <li>
                <Link to={`${ROUTES.asiaGcc}#ecosystems`} className={colLink}>
                  Corridor programmes
                </Link>
              </li>
              <li>
                <Link to={ROUTES.partnerships} className={colLink}>
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={colTitle}>Venture Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.ventureTools} className={colLink}>
                  All tools
                </Link>
              </li>
              <li>
                <Link to={ROUTES.dialogue} className={colLink}>
                  Dialogue
                </Link>
              </li>
              <li>
                <Link to={ROUTES.narrativeGrader} className={colLink}>
                  Narrative grader
                </Link>
              </li>
              <li>
                <Link to={ROUTES.commerceAudit} className={colLink}>
                  Store economics
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={colTitle}>About &amp; Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.about} className={colLink}>
                  About
                </Link>
              </li>
              <li>
                <Link to={ROUTES.privacy} className={colLink}>
                  Privacy
                </Link>
              </li>
              <li>
                <a href="mailto:jimmymanalel@gmail.com" className={colLink}>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/planterjimmy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={colLink}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 text-[11px] font-mono text-zinc-600 border-t border-[#1f1f1f] pt-6">
          <p>© 2026 Jimmy Manalel. All rights reserved.</p>
          <p className="sm:text-right max-w-md">
            Plantshop.ae participated in the 500 Global accelerator programme (as described on this
            site). Asia focus is strategic—not office locations.
          </p>
        </div>
      </div>
    </footer>
  );
}
