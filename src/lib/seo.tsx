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

/** After client navigation, move focus to the primary H1 when present. */
export function RouteFocusManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const h1 = document.querySelector("main h1") as HTMLElement | null;
    if (!h1) return;
    if (!h1.hasAttribute("tabindex")) {
      h1.setAttribute("tabindex", "-1");
    }
    // Avoid stealing focus on first paint of a full page load with hash legacy redirect
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      h1.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
