import type { CampaignId, SourceReference } from "./campaign";
export type ObjectionId = "COMMISSION" | "NOT_INTERESTED" | "PRIOR_AD_FAILURE" | "PROFITABILITY" | "PARTNER" | "CAPACITY" | "COMPETITOR" | "BUDGET" | "BID" | "OTHER";
export type Objection = { id: ObjectionId; title: string; triggerPhrases: string[]; possibleConcern: string; validate: string[]; discovery: string[]; confirm: string[]; response: string[]; nextAction: string; campaignBridge: CampaignId[]; close: string[]; source: SourceReference };
