import { useEffect } from "react";

const CONSENT_KEY = "jm_hs_analytics_consent";

/**
 * HubSpot tracking is analytics-only and must not load without approved consent.
 *
 * Default: disabled until localStorage[jm_hs_analytics_consent] === "granted"
 * (set by an approved cookie banner / consent manager).
 *
 * Form submissions do not depend on this script.
 *
 * Skipped during SSR/prerender and non-production builds.
 */
export default function HubSpotTracking() {
  useEffect(() => {
    if (import.meta.env.SSR) return;
    if (!import.meta.env.PROD) return;

    // Explicit kill-switch: never load until consent integration is ready.
    // Set VITE_HUBSPOT_TRACKING_ENABLED=true only after cookie banner is live.
    if (import.meta.env.VITE_HUBSPOT_TRACKING_ENABLED !== "true") {
      return;
    }

    const trackingId = import.meta.env.VITE_HUBSPOT_TRACKING_CODE_ID as string | undefined;
    if (!trackingId || !/^\d+$/.test(trackingId)) return;

    const consent = (() => {
      try {
        return localStorage.getItem(CONSENT_KEY);
      } catch {
        return null;
      }
    })();

    if (consent !== "granted") {
      return;
    }

    if (document.getElementById("hs-script-loader")) return;

    const script = document.createElement("script");
    script.id = "hs-script-loader";
    script.async = true;
    script.defer = true;
    script.src = `//js.hs-scripts.com/${trackingId}.js`;
    document.body.appendChild(script);

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === "granted" && !document.getElementById("hs-script-loader")) {
        document.body.appendChild(script);
      }
    };
    window.addEventListener("jm-hs-consent", onConsent as EventListener);
    return () => window.removeEventListener("jm-hs-consent", onConsent as EventListener);
  }, []);

  return null;
}
