/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PitchInput {
  name: string;
  pitch: string;
  targetUser: string;
  businessModel: string;
  gccOpportunity: string;
  currentTraction: string;
}

export interface PitchGradeResult {
  overallScore: number;
  storytellingGrade: string;
  executionGrade: string;
  marketFitGrade: string;
  summary: string;
  constructiveCritiques: string[];
  actionableSteps: string[];
  middleEastAdvisory: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface EcomMetrics {
  avgOrderValue: number;
  monthlyOrders: number;
  cogsPercent: number;
  deliveryCost: number;
  cac: number;
  repeatPurchaseRate: number;
}

export interface BookingRequest {
  id: string;
  serviceName: string;
  founderName: string;
  founderEmail: string;
  startupName: string;
  bottleneck: string;
  date: string;
  timeSlot: string;
  createdAt: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  bullets: string[];
  duration: string;
  target: string;
  focus: string;
}
