import { useEffect } from "react";
import { useLocation } from "react-router";
import { absoluteUrl, seoForPath } from "./siteRoutes";

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Updates document head on client navigations.
 * Prerender also writes route-specific meta into each HTML shell.
 */
export function RouteSeo() {
  const { pathname } = useLocation();
  const seo = seoForPath(pathname);
  const url = absoluteUrl(pathname);

  useEffect(() => {
    document.title = seo.title;
    setMetaByName("description", seo.description);
    setMetaByName("robots", seo.robots);
    setCanonical(url);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:title", seo.title);
    setMetaByProperty("og:description", seo.description);
    setMetaByName("twitter:title", seo.title);
    setMetaByName("twitter:description", seo.description);
  }, [pathname, seo.title, seo.description, seo.robots, url]);

  return null;
}

/**
 * After client navigation: focus primary H1 when no hash, otherwise scroll to the
 * hash target below the sticky header. Never force scroll-to-top when a hash is present
 * (that broke /asia-gcc#audit and footer section links).
 */
export function RouteFocusManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const h1 = document.querySelector("main h1") as HTMLElement | null;
    if (h1 && !h1.hasAttribute("tabindex")) {
      h1.setAttribute("tabindex", "-1");
    }

    const id = hash.replace(/^#/, "").trim();
    if (id) {
      let cancelled = false;
      const scrollToTarget = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "auto", block: "start" });
      };
      // Double rAF + short timeout covers paint after route transition / hydration.
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });
      const t = window.setTimeout(scrollToTarget, 50);
      return () => {
        cancelled = true;
        window.clearTimeout(t);
      };
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (h1 && !prefersReduced) {
      h1.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
