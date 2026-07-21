/** Allowed website lead types — browser cannot invent HubSpot form IDs. */
export const LEAD_TYPES = ["advisory", "booking", "assessment", "partnership"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

/** Service options visible on the website (BookingForm / Pathways). */
export const SERVICE_INTERESTS = [
  "Founder Strategic Advisory",
  "Investor Narrative Architecture",
  "Venture Readiness Intensive",
  "Commerce Infrastructure Review",
  "GCC Expansion Pathways",
] as const;
export type ServiceInterest = (typeof SERVICE_INTERESTS)[number];

/** Partnership enquiry types supported by visible site content. */
export const PARTNERSHIP_TYPES = [
  "Speaking request",
  "Founder-community collaboration",
  "Ecosystem partnership",
  "Startup-programme collaboration",
  "Strategic partnership",
] as const;
export type PartnershipType = (typeof PARTNERSHIP_TYPES)[number];

export type LeadSubmissionInput = {
  leadType?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  company?: string;
  website?: string;
  phone?: string;
  message?: string;
  serviceInterest?: string;
  partnershipType?: string;
  preferredMeetingDate?: string;
  preferredMeetingTime?: string;
  toolUsed?: string;
  assessmentScore?: string | number;
  assessmentSummary?: string;
  pageUri?: string;
  pageName?: string;
  leadSourceDetail?: string;
  componentSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  hutk?: string;
  /** Client-side form open timestamp (ms) for timing checks */
  formStartedAt?: number;
  /** Honeypot — must be empty */
  companyFax?: string;
};

export type PublicLeadResponse = {
  success: boolean;
  message: string;
  leadType?: LeadType;
  /**
   * True only in development (or preview with HUBSPOT_ALLOW_DRY_RUN) when
   * HubSpot form config is missing — never a production success path.
   */
  dryRun?: boolean;
  /** Machine-readable error code for clients (e.g. lead_service_unavailable) */
  code?: string;
};

export type FieldErrorMap = Record<string, string>;

export type ValidatedLead = {
  leadType: LeadType;
  fields: Array<{ objectTypeId: string; name: string; value: string }>;
  context: {
    pageUri?: string;
    pageName?: string;
    hutk?: string;
    ipAddress?: string;
  };
};
