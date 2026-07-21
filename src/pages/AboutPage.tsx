import React from "react";
import { Link } from "react-router";
import ContentArticle from "../components/content/ContentArticle";
import FaqSection from "../components/content/FaqSection";
import {
  PERSON_DESCRIPTION_MEDIUM,
  PERSON_ID,
  VENTURES,
  breadcrumbJsonLd,
  faqPageJsonLd,
  onetrepreneurOrgJsonLd,
  personJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "../lib/entity";
import { ROUTES, ROUTE_SEO, SITE_ORIGIN } from "../lib/siteRoutes";

const faqs = [
  {
    question: "Who is Jimmy Manalel?",
    answer:
      "Jimmy Manalel is a venture corridor builder and cross-border startup strategist. He co-founded Plantshop.ae in the UAE, co-founded and helped run 1trepreneur in Dubai—through which he has mentored more than 800 founders—helped create 1Tank at Expand North Star, and works with founders on narrative, commerce operations, and market expansion across India, the GCC, and the Middle East.",
  },
  {
    question: "Who founded Plantshop.ae?",
    answer:
      "Jimmy Manalel co-founded Plantshop.ae. On this site he describes building an online plants and gardening brand in the UAE and later entering the 500 Global accelerator programme with that company.",
  },
  {
    question: "What is 1trepreneur?",
    answer:
      "1trepreneur is a Dubai-based founder community built around peer mentoring, founder meetups, and practical startup support. Through the community and its programmes, Jimmy has mentored more than 800 founders. It is not described here as an investment fund.",
  },
  {
    question: "What markets does Jimmy Manalel work across?",
    answer:
      "His public work focuses on founders and ecosystems connecting India, the GCC (including Dubai and the UAE), and the wider Middle East, with attention to cross-border expansion and corridor-building between those regions.",
  },
];

export default function AboutPage() {
  const seo = ROUTE_SEO[ROUTES.about];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      onetrepreneurOrgJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.about,
        name: seo.title,
        description: seo.description,
      }),
      {
        "@type": "ProfilePage",
        "@id": `${SITE_ORIGIN}/about#profile`,
        url: `${SITE_ORIGIN}/about`,
        name: seo.title,
        mainEntity: { "@id": PERSON_ID },
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: ROUTES.about },
      ]),
      faqPageJsonLd(faqs),
    ],
  };

  return (
    <ContentArticle
      crumbs={[{ label: "About" }]}
      badge="About"
      title="About Jimmy Manalel"
      lead={PERSON_DESCRIPTION_MEDIUM}
      jsonLd={jsonLd}
      related={[
        {
          to: ROUTES.ventureCorridors,
          label: "Venture corridor building",
          description: "How India–GCC corridors connect founders, capital, and distribution.",
        },
        {
          to: ROUTES.advisory,
          label: "Startup & GCC advisory",
          description: "Who advisory is for and how to enquire.",
        },
        {
          to: ROUTES.strategyConversation,
          label: "Request a strategy conversation",
          description: "Share timing and topic for a founder discussion.",
        },
      ]}
    >
      <h2>Professional background</h2>
      <p>
        Jimmy’s early career was in banking, working with corporate finance and asset management.
        That experience shaped how he later evaluated cash flow, risk, and operating discipline inside
        startups—not as abstract theory, but as constraints that decide whether a company survives
        scaling.
      </p>

      <h2>Founder journey: Plantshop.ae</h2>
      <p>
        In 2015, Jimmy co-founded <strong>Plantshop.ae</strong>, an online plants and gardening brand
        in the UAE. Public descriptions on this site emphasise operational realities: inventory,
        last-mile delivery, product care in regional climate conditions, and co-founder coordination—
        not only digital marketing.
      </p>
      <p>
        Plantshop later entered the <strong>500 Global</strong> accelerator programme. Jimmy describes
        that period as intensifying fundraising scrutiny, board alignment, and investor narrative
        pressure. The accurate framing used here is that Plantshop participated in 500 Global’s
        programme—not a claim that Jimmy personally is a 500 Global partner or investor.
      </p>

      <h2>1trepreneur founder community</h2>
      <p>
        Jimmy co-founded and helped run <strong>1trepreneur</strong>, a Dubai-based founder community
        built around peer mentoring, founder meetups and practical startup support. Through the
        community and its programmes, he has mentored more than 800 founders.
      </p>
      <p>
        1trepreneur organised founder meetups, peer mentorship, speed mentoring and startup ecosystem
        activities in Dubai. This figure refers to <strong>founders mentored</strong> through community
        programmes—not a count of paying consulting clients, portfolio companies, or investments made.
      </p>

      <h2>1Tank at Expand North Star</h2>
      <p>
        He helped create and conduct <strong>1Tank</strong>, a startup pitch competition hosted at{" "}
        <strong>Expand North Star</strong> in Dubai. Co-created 1Tank, a pitch competition held at
        Expand North Star, connecting selected founders with investors and ecosystem leaders.
      </p>
      <p>
        1Tank is a competition format for selected applicants. It is separate from the “more than 800
        founders mentored” community figure, and this site does not claim personal mentoring of every
        applicant or document investment outcomes from the panel.
      </p>

      <h2>Current work</h2>
      <p>
        Today Jimmy positions his work as <strong>venture corridor building</strong>: helping founders
        and ecosystem partners connect across India, the GCC, and related markets. That includes
        founder-community mentoring experience from 1trepreneur, advisory on investor narrative, venture
        readiness, commerce infrastructure, and market-entry pathways, plus partnership conversations
        with programmes, communities, and speakers.
      </p>

      <h2>Roles and ventures (as stated on this site)</h2>
      <ul>
        {VENTURES.map((v) => (
          <li key={v.name}>
            <strong>{v.name}</strong> — {v.role}. {v.note}
          </li>
        ))}
        <li>
          <strong>Advisory &amp; corridor work</strong> — independent founder-facing strategy and
          ecosystem collaboration (not a regulated investment firm or law practice).
        </li>
      </ul>

      <h2>Public profiles</h2>
      <ul>
        <li>
          Website:{" "}
          <a href="https://www.jimmymanalel.com/" rel="noopener noreferrer">
            www.jimmymanalel.com
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/planterjimmy"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/planterjimmy
          </a>
        </li>
        <li>
          Email:{" "}
          <a href="mailto:jimmymanalel@gmail.com">jimmymanalel@gmail.com</a>
        </li>
      </ul>

      <h2>How to work together</h2>
      <p>
        Founders can{" "}
        <Link to={ROUTES.strategyConversation}>request a strategy conversation</Link>, submit an{" "}
        <Link to={ROUTES.advisory}>advisory enquiry</Link>, or explore{" "}
        <Link to={ROUTES.partnerships}>partnership options</Link>. Free tools for dialogue, narrative
        grading, and store economics live under{" "}
        <Link to={ROUTES.ventureTools}>founder strategy tools</Link>.
      </p>

      <FaqSection items={faqs} />
    </ContentArticle>
  );
}
