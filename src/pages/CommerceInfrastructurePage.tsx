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
    question: "What is a commerce infrastructure review?",
    answer:
      "A commerce infrastructure review examines the operating system behind an online or multi-channel commerce business: unit economics, fulfilment, logistics cost, inventory risk, margins, and whether the model can scale across nodes or borders without destroying cash.",
  },
];

export default function CommerceInfrastructurePage() {
  const seo = ROUTE_SEO[ROUTES.commerceInfrastructure];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.commerceInfrastructure,
        name: seo.title,
        description: seo.description,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Commerce infrastructure", path: ROUTES.commerceInfrastructure },
      ]),
      serviceJsonLd({
        name: "Commerce infrastructure review",
        description: seo.description,
        path: ROUTES.commerceInfrastructure,
      }),
      faqPageJsonLd(faqs),
    ],
  };

  return (
    <ContentArticle
      crumbs={[{ label: "Commerce infrastructure" }]}
      badge="Operations"
      title="Commerce infrastructure review"
      lead="A commerce infrastructure review is a structured look at how an e-commerce or multi-node commerce business makes money after product cost, delivery, acquisition, and inventory risk—so founders can see whether growth will compound or burn cash."
      jsonLd={jsonLd}
      related={[
        {
          to: ROUTES.commerceAudit,
          label: "Interactive store economics tool",
          description: "Adjust AOV, CAC, COGS, delivery, and repeat rate in USD.",
        },
        {
          to: ROUTES.advisory,
          label: "Advisory enquiry",
          description: "Request a deeper infrastructure conversation.",
        },
        {
          to: ROUTES.gccMarketEntry,
          label: "GCC market entry",
          description: "How expansion multiplies logistics and licensing complexity.",
        },
      ]}
    >
      <h2>Unit economics</h2>
      <p>
        Unit economics ask what remains after the cost of goods, delivery, and customer acquisition for
        a typical order, and how repeat purchases change lifetime value. If contribution is thin or
        negative, more marketing spend accelerates loss. Jimmy’s public tools express these ideas in
        USD for founders pressure-testing scenarios.
      </p>

      <h2>Fulfilment and logistics</h2>
      <p>
        Fulfilment is the chain from order to delivered product: picking, packing, carrier handoff,
        and exception handling. Logistics cost as a share of basket size is a common failure mode in
        regional e-commerce—especially when average order value is low and last-mile is expensive.
      </p>

      <h2>Inventory and cash</h2>
      <p>
        Inventory ties cash. Overstock creates write-down risk; understock creates stockouts and wasted
        acquisition spend. Cross-border models add lead times, customs, and multi-node storage
        decisions. Reviews should map cash conversion, not only revenue charts.
      </p>

      <h2>Margins and operational scalability</h2>
      <p>
        Gross margin after COGS is not the same as cash contribution after delivery and CAC. Scalability
        means processes, suppliers, and service levels still work when order volume rises. Multi-node
        warehousing can improve speed but raises complexity and fixed cost.
      </p>

      <h2>Cross-border operations</h2>
      <p>
        Selling across borders multiplies failure points: longer fulfilment, returns friction, payment
        methods, and partner quality. Founders expanding into the{" "}
        <Link to={ROUTES.gccMarketEntry}>GCC</Link> should model these costs before promising regional
        scale to investors.
      </p>

      <h2>How to use this site</h2>
      <p>
        Start with the interactive{" "}
        <Link to={ROUTES.commerceAudit}>commerce infrastructure audit tool</Link> for directional
        diagnostics. For a discussion of your operating model,{" "}
        <Link to={ROUTES.strategyConversation}>request a strategy conversation</Link> or{" "}
        <Link to={ROUTES.advisory}>submit an advisory enquiry</Link>.
      </p>

      <FaqSection items={faqs} />
    </ContentArticle>
  );
}
