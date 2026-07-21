import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createAppRouter } from "./router.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import HubSpotTracking from "./components/HubSpotTracking.tsx";
import "./index.css";

const router = createAppRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <HubSpotTracking />
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
