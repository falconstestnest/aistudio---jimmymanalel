/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
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
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
        <section
          className="relative w-full overflow-hidden rounded-3xl border border-[#1f1f1f] bg-[#0d0d0d] p-8 shadow-sm md:p-12"
          aria-labelledby="error-boundary-heading"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl"
            aria-hidden="true"
          />
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Something Interrupted the Route
          </div>
          <h1
            id="error-boundary-heading"
            tabIndex={-1}
            className="max-w-xl text-3xl font-display font-semibold tracking-tight text-white md:text-4xl"
          >
            This page couldn’t complete its journey.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            An unexpected issue prevented this section from loading. You can try again or return to the homepage.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try Again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1f1f1f] px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Return to Homepage
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("React render error:", error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
