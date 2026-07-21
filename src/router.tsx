import React from "react";
import {
  createBrowserRouter,
  createMemoryRouter,
  Outlet,
  type RouteObject,
} from "react-router";
import { RouteFocusManager, RouteSeo } from "./lib/seo";
import LegacyHashRedirect from "./components/LegacyHashRedirect";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./pages/HomePage";
import VentureToolsPage from "./pages/VentureToolsPage";
import StrategyConversationPage from "./pages/StrategyConversationPage";
import AdvisoryPage from "./pages/AdvisoryPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import { ROUTES } from "./lib/siteRoutes";

function RootLayout() {
  return (
    <>
      <RouteSeo />
      <RouteFocusManager />
      <LegacyHashRedirect />
      <Outlet />
    </>
  );
}

/**
 * Explicit route tree only — no splat catch-all for production HTTP status.
 * Unknown server paths fall through to Vercel static 404.
 * Client NotFoundPage is a defensive fallback if the SPA shell is ever mis-served.
 */
export const routeObjects: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.ventureTools, element: <VentureToolsPage /> },
      { path: ROUTES.dialogue, element: <VentureToolsPage /> },
      { path: ROUTES.narrativeGrader, element: <VentureToolsPage /> },
      { path: ROUTES.commerceAudit, element: <VentureToolsPage /> },
      { path: ROUTES.strategyConversation, element: <StrategyConversationPage /> },
      { path: ROUTES.advisory, element: <AdvisoryPage /> },
      { path: ROUTES.partnerships, element: <PartnershipsPage /> },
      // Defensive client fallback only — not the production HTTP 404 mechanism
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routeObjects);
}

/** Build-time prerender router for a single pathname. */
export function createPrerenderRouter(pathname: string) {
  return createMemoryRouter(routeObjects, {
    initialEntries: [pathname],
    initialIndex: 0,
  });
}
