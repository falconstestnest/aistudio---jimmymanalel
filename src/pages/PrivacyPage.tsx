import React from "react";
import { Link } from "react-router";
import ContentArticle from "../components/content/ContentArticle";
import {
  CONTACT_EMAIL,
  breadcrumbJsonLd,
  personJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "../lib/entity";
import { ROUTES, ROUTE_SEO } from "../lib/siteRoutes";

export default function PrivacyPage() {
  const seo = ROUTE_SEO[ROUTES.privacy];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: ROUTES.privacy,
        name: seo.title,
        description: seo.description,
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Privacy", path: ROUTES.privacy },
      ]),
    ],
  };

  return (
    <ContentArticle
      crumbs={[{ label: "Privacy" }]}
      badge="Legal"
      title="Privacy"
      lead="This page explains how jimmymanalel.com handles information you submit through enquiry and tool forms. It is written in plain language and is not a substitute for formal legal counsel."
      jsonLd={jsonLd}
    >
      <h2>Who controls this site</h2>
      <p>
        This website is operated by Jimmy Manalel for public information, founder tools, and enquiry
        forms. Contact:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        When you submit a form (strategy conversation, advisory, partnership, or “email my results”),
        you may provide name, email, company, website, message, preferred meeting times, assessment
        scores, and similar fields you choose to enter. Technical data such as page URL and optional
        analytics identifiers may be processed if you grant analytics consent where applicable.
      </p>

      <h2>How we use it</h2>
      <p>
        Enquiry data is used to respond to your request and to manage related follow-up. Assessment
        result emails are used to send a summary and, if relevant, continue a conversation. Forms on
        this site are not presented as marketing subscription sign-ups with pre-checked opt-ins.
      </p>

      <h2>Processors</h2>
      <p>
        Form submissions may be processed through hosting and CRM tools configured for this website
        (for example Vercel for hosting and HubSpot for lead capture when enabled). Those providers
        process data under their own terms and security practices.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not sell your enquiry data as a product</li>
        <li>We do not ask for passwords or payment card numbers on these forms</li>
        <li>We do not use form fields to provide legal or investment advice</li>
      </ul>

      <h2>Your choices</h2>
      <p>
        To correct or delete enquiry information we hold, email {CONTACT_EMAIL} with enough detail to
        locate your submission. You may also stop using the site and refrain from further form
        submissions.
      </p>

      <h2>Related pages</h2>
      <p>
        Return to the <Link to={ROUTES.home}>homepage</Link> or{" "}
        <Link to={ROUTES.strategyConversation}>request a strategy conversation</Link>.
      </p>
    </ContentArticle>
  );
}
