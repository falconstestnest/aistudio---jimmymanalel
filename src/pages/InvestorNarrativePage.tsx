import React from "react";
import { Link } from "react-router";
import ContentArticle from "../components/content/ContentArticle";
import FaqSection from "../components/content/FaqSection";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  personJsonLd,
  serviceJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "../lib/entity";
import { ROUTES, ROUTE_SEO } from "../lib/siteRoutes";

const faqs = [
  {
    question: "What is investor narrative architecture?",
    answer:
      "Investor narrative architecture is the structured way a founder explains the problem, solution, market logic, traction, unit economics, risks, and ask so investors can evaluate the business as an operating system—not a collection of slides.",
  },
  {
    question: "What is startup venture readiness?",
    answer:
      "Venture readiness is whether the company can withstand investor scrutiny: clear story, credible metrics, defined market path, team execution, and awareness of risks. It is not the same as having a polished deck template.",
  },
];

export default function InvestorNarrativePage() {
  const seo = ROUTE_SEO[ROUTES.investorNarrative];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.investorNarrative,
        name: seo.title,
        description: seo.description,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Investor narrative", path: ROUTES.investorNarrative },
      ]),
      serviceJsonLd({
        name: "Investor narrative architecture",
        description: seo.description,
        path: ROUTES.investorNarrative,
      }),
      faqPageJsonLd(faqs),
    ],
  };

  return (
    <ContentArticle
      crumbs={[{ label: "Investor narrative" }]}
      badge="Narrative"
      title="Investor narrative architecture"
      lead="Investor narrative architecture is the discipline of building a clear, evidence-backed story about why a startup exists, who it serves, how it makes money, and why this team can win—so investors can stress-test the business, not just the design of a deck."
      jsonLd={jsonLd}
      related={[
        {
          to: ROUTES.narrativeGrader,
          label: "Narrative grader tool",
          description: "Interactive diagnostic for concept and narrative clarity.",
        },
        {
          to: ROUTES.advisory,
          label: "Advisory",
          description: "Enquiry for deeper narrative and readiness work.",
        },
        {
          to: ROUTES.strategyConversation,
          label: "Strategy conversation",
          description: "Request a discussion of your investor story.",
        },
      ]}
    >
      <h2>What it means in practice</h2>
      <p>
        A useful investor narrative answers a small set of hard questions in a consistent order:
        problem intensity, customer definition, solution mechanism, market logic, traction and
        evidence, unit economics, competitive dynamics, team fitness, risks, and the ask. Architecture
        means those pieces fit together without contradiction.
      </p>

      <h2>Why investor narratives fail</h2>
      <ul>
        <li>Story and metrics disagree (growth claims without retention or margin logic)</li>
        <li>Market size replaces customer specificity</li>
        <li>Product features dominate without distribution path</li>
        <li>Risks are hidden instead of owned</li>
        <li>The ask is unclear or disconnected from milestones</li>
      </ul>

      <h2>What founders should communicate</h2>
      <p>
        Founders should communicate the operating thesis: who pays, why they pay, how often, at what
        margin, and what must be true for the business to scale. Visual polish helps readability; it
        cannot replace that thesis.
      </p>

      <h2>Storytelling versus evidence</h2>
      <p>
        Storytelling organises attention. Evidence is what remains after scrutiny—cohorts, conversion,
        contribution margin, pipeline quality, or verified pilot outcomes. Strong narratives use story
        to frame evidence; weak narratives use story to replace it.
      </p>

      <h2>Metrics, market logic, traction, and risks</h2>
      <p>
        Metrics should match the stage: early companies may emphasise learning velocity and retention
        signals; later companies emphasise efficiency and expansion. Market logic should explain why
        this segment, now. Traction should be defined honestly. Risks should include competition,
        regulation, concentration, and execution—especially for cross-border plans into the{" "}
        <Link to={ROUTES.gccMarketEntry}>GCC</Link>.
      </p>

      <h2>How Jimmy works with founders on narrative</h2>
      <p>
        Jimmy approaches narrative from an operator and fundraising-scrutiny lens shaped by building
        Plantshop.ae and participating in accelerator-style investor processes. Work may include
        clarifying the thesis, pressure-testing slides, or aligning expansion claims with commerce
        reality. Use the free{" "}
        <Link to={ROUTES.narrativeGrader}>narrative grader</Link> for a first pass, or{" "}
        <Link to={ROUTES.advisory}>enquire about advisory</Link>.
      </p>

      <FaqSection items={faqs} />
    </ContentArticle>
  );
}
