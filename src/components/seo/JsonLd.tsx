import React from "react";

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * Embeds JSON-LD in the document body so prerender includes it.
 * Prefer a single @graph object when combining entities.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const payload =
    Array.isArray(data) || data["@context"]
      ? data
      : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      // Content is generated from site-owned strings only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
