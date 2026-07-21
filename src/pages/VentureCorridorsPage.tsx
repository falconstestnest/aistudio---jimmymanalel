import React from "react";
import { Link } from "react-router";
import ContentArticle from "../components/content/ContentArticle";
import FaqSection from "../components/content/FaqSection";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  personJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "../lib/entity";
import { ROUTES, ROUTE_SEO } from "../lib/siteRoutes";

const faqs = [
  {
    question: "What does a venture corridor builder do?",
    answer:
      "A venture corridor builder helps connect founders, capital, distribution, and ecosystem partners across markets so startups can expand without relying on a single local network. Jimmy Manalel uses that framing for India–GCC and Middle East founder pathways.",
  },
  {
    question: "What markets does Jimmy Manalel work across?",
    answer:
      "Public positioning focuses on India, the GCC including the UAE, and broader Middle East founder and ecosystem connections.",
  },
];

export default function VentureCorridorsPage() {
  const seo = ROUTE_SEO[ROUTES.ventureCorridors];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.ventureCorridors,
        name: seo.title,
        description: seo.description,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Venture corridors", path: ROUTES.ventureCorridors },
      ]),
      faqPageJsonLd(faqs),
    ],
  };

  return (
    <ContentArticle
      crumbs={[{ label: "Venture corridors" }]}
      badge="Corridors"
      title="Venture corridor building"
      lead="A venture corridor is a practical pathway that moves startups, capital, customers, and know-how between markets—not a slogan. Venture corridor building is the work of connecting those pieces so founders can expand with clearer partners, narratives, and operating plans."
      jsonLd={jsonLd}
      related={[
        {
          to: ROUTES.gccMarketEntry,
          label: "GCC market entry",
          description: "Country-level expansion challenges and mistakes.",
        },
        {
          to: ROUTES.about,
          label: "About Jimmy Manalel",
          description: "Background that informs corridor work.",
        },
        {
          to: ROUTES.partnerships,
          label: "Partnerships",
          description: "Programme and ecosystem collaboration enquiries.",
        },
      ]}
    >
      <h2>What a venture corridor is</h2>
      <p>
        In this context, a corridor links at least two markets—for example India and the GCC—so that
        founders can access customers, partners, talent, or capital that would be harder to reach
        from only one side. Corridors are built from relationships, programmes, operating knowledge,
        and repeated patterns of successful expansion, not from a single conference panel.
      </p>

      <h2>India–GCC opportunity</h2>
      <p>
        India supplies large founder density, engineering talent, and growing consumer and B2B
        products. GCC markets offer different demand, capital pools, and distribution conditions.
        The opportunity is real when a company has a specific customer in the destination market and
        an economic model that survives logistics, pricing, and partnership costs—not when “GCC” is
        only a slide header.
      </p>

      <h2>Founders, capital, distribution, and ecosystems</h2>
      <p>
        Useful corridor work usually touches four layers:
      </p>
      <ul>
        <li>
          <strong>Founders</strong> — clarity on product, narrative, and readiness
        </li>
        <li>
          <strong>Capital</strong> — introductions and story quality, not promised funding
        </li>
        <li>
          <strong>Distribution</strong> — how the product actually reaches customers
        </li>
        <li>
          <strong>Ecosystems</strong> — programmes, communities, and partners who reduce trust friction
        </li>
      </ul>

      <h2>Jimmy’s role</h2>
      <p>
        Jimmy’s corridor work draws on operator experience from co-founding Plantshop.ae (including
        that company’s 500 Global accelerator programme participation), founder-facing advisory, and
        community building through <strong>1trepreneur</strong> in Dubai. He does not claim to replace
        local counsel, banks, or government licensing processes.
      </p>
      <p>
        Through 1trepreneur founder community programmes, meetups, mentoring sessions and ecosystem
        initiatives in Dubai, he has mentored more than 800 founders. That is a mentoring and community
        claim—not a statement of 800 advisory retainers or investments.
      </p>

      <h2>1Tank and Expand North Star</h2>
      <p>
        Co-created <strong>1Tank</strong>, a pitch competition held at{" "}
        <strong>Expand North Star</strong>, connecting selected founders with investors and ecosystem
        leaders. Jimmy helped create and conduct the competition. Participation as an applicant is not
        the same as being personally mentored by Jimmy, and this page does not claim investment outcomes
        for competitors.
      </p>

      <h2>Next steps</h2>
      <p>
        Founders exploring expansion can read{" "}
        <Link to={ROUTES.gccMarketEntry}>GCC market entry</Link>, try{" "}
        <Link to={ROUTES.ventureTools}>founder tools</Link>, or{" "}
        <Link to={ROUTES.strategyConversation}>request a strategy conversation</Link>. Ecosystem
        partners can open a <Link to={ROUTES.partnerships}>partnership enquiry</Link>.
      </p>

      <FaqSection items={faqs} />
    </ContentArticle>
  );
}
