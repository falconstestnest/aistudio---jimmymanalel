/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { Compass, Home, Mail } from "lucide-react";

const HOME_TITLE = "Jimmy Manalel | Venture Corridor Builder & Cross-Border Startup Strategist";
const NOT_FOUND_TITLE = "Page Not Found | Jimmy Manalel";

function sanitizePath(path: string): string {
  return path
    .replace(/[<>"'`\\]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

function getRouteAwareCopy(pathname: string): { heading: string; body: string } {
  const lower = pathname.toLowerCase();

  if (/\/projects?(?:\/|$)/.test(lower) || /\/ventures?(?:\/|$)/.test(lower)) {
    return {
      heading: "This project route is no longer available.",
      body: "The project path you requested may have been retired, renamed, or never published. Explore the live work and active corridors on the homepage.",
    };
  }

  if (
    /\/insights?(?:\/|$)/.test(lower) ||
    /\/articles?(?:\/|$)/.test(lower) ||
    /\/blog(?:\/|$)/.test(lower)
  ) {
    return {
      heading: "This insight may have moved or is still being developed.",
      body: "That article path isn’t available right now. Return home to review active pathways, tools, and operator resources.",
    };
  }

  if (
    /\/advis(?:ory|ing)(?:\/|$)/.test(lower) ||
    /\/services?(?:\/|$)/.test(lower) ||
    /\/pathways?(?:\/|$)/.test(lower)
  ) {
    return {
      heading: "This advisory route is not currently available.",
      body: "That advisory path isn’t live. You can still explore strategic pathways and request a clarity session from the homepage.",
    };
  }

  return {
    heading: "This path hasn’t been built yet.",
    body: "The page you’re looking for may have moved, changed, or was never part of the journey. Let’s return to a route that leads somewhere useful.",
  };
}

/**
 * Client-side not-found UI.
 * Primary production 404s are served by public/404.html with HTTP 404.
 * This component is a defensive fallback if the SPA is ever served for an unknown path.
 */
export default function NotFoundPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const safePath = sanitizePath(pathname);
  const copy = getRouteAwareCopy(safePath);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = NOT_FOUND_TITLE;

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const createdRobots = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const previousRobots = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, follow");

    headingRef.current?.focus();

    return () => {
      document.title = previousTitle || HOME_TITLE;
      if (robots) {
        if (createdRobots) {
          robots.remove();
        } else if (previousRobots) {
          robots.setAttribute("content", previousRobots);
        } else {
          robots.removeAttribute("content");
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans antialiased selection:bg-amber-500 selection:text-black">
      <header className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            aria-label="Jimmy Manalel homepage"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-black font-display">
              JM
            </span>
            <span>
              <span className="block text-sm font-medium uppercase tracking-tight text-white font-display sm:text-base">
                Jimmy Manalel
              </span>
              <span className="mt-0.5 block text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-500">
                Venture Corridor Builder · Cross-Border Startup Strategist
              </span>
            </span>
          </a>
          <a
            href="/#booking-section"
            className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 md:text-sm"
          >
            Book Clarity Session
          </a>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
        <section
          className="relative w-full overflow-hidden rounded-3xl border border-[#1f1f1f] bg-[#0d0d0d] p-8 shadow-sm md:p-12"
          aria-labelledby="client-not-found-heading"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl motion-safe:animate-pulse"
            aria-hidden="true"
          />
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            404 — Route Not Found
          </p>
          <h1
            id="client-not-found-heading"
            ref={headingRef}
            tabIndex={-1}
            className="mt-4 max-w-xl text-3xl font-display font-semibold tracking-tight text-white outline-none md:text-5xl"
          >
            {copy.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {copy.body}
          </p>
          {safePath && safePath !== "/" ? (
            <p className="mt-4 w-fit max-w-full break-all rounded-xl border border-[#1f1f1f] bg-[#090909] px-3 py-2 font-mono text-xs text-zinc-500">
              Requested path: {safePath}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Return to Homepage
            </a>
            <a
              href="/#ecosystem-engagement"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1f1f1f] px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              Explore My Work
            </a>
            <a
              href="mailto:jimmymanalel@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1f1f1f] px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in Touch
            </a>
          </div>
          <p className="mt-8 font-serif text-sm italic text-zinc-500">
            Every meaningful venture begins by finding the right direction.
          </p>
        </section>
      </main>

      <footer className="mt-auto border-t border-[#1f1f1f] bg-[#0c0c0c] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 font-mono text-xs text-zinc-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <span>© 2026 Jimmy Manalel. All Rights Reserved.</span>
          <a
            href="/"
            className="transition hover:text-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            www.jimmymanalel.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export function isHomePath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === "/";
}
