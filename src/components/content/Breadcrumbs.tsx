import React from "react";
import { Link } from "react-router";
import { ROUTES } from "../../lib/siteRoutes";

export type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-mono text-zinc-500 mb-4">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            to={ROUTES.home}
            className="hover:text-amber-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
          >
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {item.to ? (
              <Link
                to={item.to}
                className="hover:text-amber-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-400" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
