import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { LEGACY_HASH_REDIRECTS, normalizePathname } from "../lib/siteRoutes";

/**
 * Client-only migration for legacy shared fragment URLs.
 * Fragments are never sent to the server, so this cannot be a Vercel redirect.
 */
export default function LegacyHashRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = normalizePathname(location.pathname);
    // Only migrate when landing on the homepage shell with a legacy hash
    if (path !== "/") return;

    const raw = window.location.hash.replace(/^#/, "").trim();
    if (!raw) return;

    const target = LEGACY_HASH_REDIRECTS[raw];
    if (!target) return;

    navigate(target, { replace: true });
  }, [location.pathname, location.hash, navigate]);

  return null;
}
