import React from "react";
import { Link } from "react-router";
import { Mail, Linkedin } from "lucide-react";
import { PERSON_DESCRIPTION_SHORT } from "../../lib/entity";
import { ROUTES } from "../../lib/siteRoutes";

const subtleLink =
  "text-zinc-500 hover:text-zinc-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0c0c0c] text-zinc-400 border-t border-[#1f1f1f] py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-[#1f1f1f]">
          <div className="md:col-span-4 space-y-3">
            <p className="text-sm text-zinc-300 font-medium">Jimmy Manalel</p>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-sm">
              {PERSON_DESCRIPTION_SHORT}
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">
              Explore
            </h4>
            <div className="flex flex-col gap-2 text-xs md:text-sm">
              <Link to={ROUTES.ventureTools} className="hover:text-amber-500 transition">
                Founder tools
              </Link>
              <Link to={ROUTES.strategyConversation} className="hover:text-amber-500 transition">
                Strategy conversation
              </Link>
              <Link to={ROUTES.advisory} className="hover:text-amber-500 transition">
                Advisory
              </Link>
              <Link to={ROUTES.partnerships} className="hover:text-amber-500 transition">
                Partnerships
              </Link>
              <Link to={ROUTES.privacy} className="hover:text-amber-500 transition">
                Privacy
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">
              Topics
            </h4>
            <div className="flex flex-col gap-2 text-xs md:text-sm">
              <Link to={ROUTES.investorNarrative} className="hover:text-amber-500 transition">
                Investor narrative
              </Link>
              <Link to={ROUTES.commerceInfrastructure} className="hover:text-amber-500 transition">
                Commerce infrastructure
              </Link>
              <Link to={ROUTES.partnerships} className="hover:text-amber-500 transition">
                Ecosystem partnerships
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-2 text-xs md:text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:jimmymanalel@gmail.com"
                  className="hover:text-amber-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
                >
                  jimmymanalel@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-amber-500 flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://www.linkedin.com/in/planterjimmy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
                >
                  LinkedIn
                </a>
              </div>
              <Link
                to={ROUTES.strategyConversation}
                className="inline-block text-amber-500 hover:text-amber-400 font-semibold mt-1"
              >
                Request a strategy conversation
              </Link>
            </div>
          </div>
        </div>

        {/* Understated profile / AEO crawl links — low emphasis */}
        <div className="mb-6 text-[11px] leading-relaxed text-zinc-600">
          <p className="text-zinc-500 font-medium tracking-tight">Jimmy Manalel</p>
          <p className="mt-0.5 font-mono uppercase tracking-wider text-[10px] text-zinc-600">
            Venture Corridor Builder · Cross-Border Startup Strategist
          </p>
          <nav
            className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"
            aria-label="Profile and topic pages"
          >
            <Link to={ROUTES.about} className={subtleLink}>
              About
            </Link>
            <span className="text-zinc-700" aria-hidden="true">
              ·
            </span>
            <Link to={ROUTES.ventureCorridors} className={subtleLink}>
              Venture Corridors
            </Link>
            <span className="text-zinc-700" aria-hidden="true">
              ·
            </span>
            <Link to={ROUTES.gccMarketEntry} className={subtleLink}>
              GCC Market Entry
            </Link>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 font-mono space-y-3 md:space-y-0 gap-2">
          <div>© 2026 Jimmy Manalel. All rights reserved.</div>
          <div className="text-center md:text-right max-w-md">
            Plantshop.ae participated in the 500 Global accelerator programme (as described on this
            site).
          </div>
        </div>
      </div>
    </footer>
  );
}
