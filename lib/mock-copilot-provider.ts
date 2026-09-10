import { classifyObjection } from "./objection-engine";
import { campaignById } from "@/data/campaigns";
import type { MerchantProfile } from "@/types/merchant";
import { recommendCampaigns } from "./recommendation-engine";

export interface CopilotProvider { analyzeObjection(statement: string): ReturnType<typeof classifyObjection>; generateTalkTrack(merchant: MerchantProfile): { discovery: string; value: string; close: string }; explainRecommendation(merchant: MerchantProfile): string; }
export class MockCopilotProvider implements CopilotProvider {
  analyzeObjection(statement: string) { return classifyObjection(statement); }
  generateTalkTrack(merchant: MerchantProfile) { const recommendation = recommendCampaigns(merchant)[0]; if (!recommendation) return { discovery: "Select the merchant's main goal to begin.", value: "Insufficient source information.", close: "What outcome matters most right now?" }; const campaign = campaignById(recommendation.campaignId)!; return { discovery: campaign.talkTrack.discovery[0], value: campaign.talkTrack.pitch[0], close: campaign.talkTrack.close[0] }; }
  explainRecommendation(merchant: MerchantProfile) { const recommendation = recommendCampaigns(merchant)[0]; return recommendation ? recommendation.whyRecommended.join(" ") : "Select the merchant's primary goal to generate a source-grounded recommendation."; }
}
