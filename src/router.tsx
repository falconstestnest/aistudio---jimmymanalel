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
import AboutPage from "./pages/AboutPage";
import VentureToolsPage from "./pages/VentureToolsPage";
import StrategyConversationPage from "./pages/StrategyConversationPage";
import AdvisoryPage from "./pages/AdvisoryPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import GccMarketEntryPage from "./pages/GccMarketEntryPage";
import InvestorNarrativePage from "./pages/InvestorNarrativePage";
import VentureCorridorsPage from "./pages/VentureCorridorsPage";
import CommerceInfrastructurePage from "./pages/CommerceInfrastructurePage";
import PrivacyPage from "./pages/PrivacyPage";
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
      { path: ROUTES.about, element: <AboutPage /> },
      { path: ROUTES.ventureTools, element: <VentureToolsPage /> },
      { path: ROUTES.dialogue, element: <VentureToolsPage /> },
      { path: ROUTES.narrativeGrader, element: <VentureToolsPage /> },
      { path: ROUTES.commerceAudit, element: <VentureToolsPage /> },
      { path: ROUTES.strategyConversation, element: <StrategyConversationPage /> },
      { path: ROUTES.advisory, element: <AdvisoryPage /> },
      { path: ROUTES.partnerships, element: <PartnershipsPage /> },
      { path: ROUTES.gccMarketEntry, element: <GccMarketEntryPage /> },
      { path: ROUTES.investorNarrative, element: <InvestorNarrativePage /> },
      { path: ROUTES.ventureCorridors, element: <VentureCorridorsPage /> },
      { path: ROUTES.commerceInfrastructure, element: <CommerceInfrastructurePage /> },
      { path: ROUTES.privacy, element: <PrivacyPage /> },
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
