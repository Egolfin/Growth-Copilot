import type { CampaignId } from "./campaign";
export type Recommendation = { campaignId: CampaignId; fitScore: number; rank: number; whyRecommended: string[]; goalAlignment: string; operationalFit: string; budgetFit: string; tradeoffs: string[]; nextAction: string; sourceIds: string[]; whyNot: string[] };
