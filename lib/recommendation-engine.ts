import { campaignById, campaigns } from "@/data/campaigns";
import type { MerchantProfile } from "@/types/merchant";
import type { Recommendation } from "@/types/recommendation";
import { goalCampaignRules } from "./campaign-rules";

export function recommendCampaigns(merchant: MerchantProfile): Recommendation[] {
  if (!merchant.primaryGoal) return [];
  const candidates = goalCampaignRules[merchant.primaryGoal];
  return candidates.map((id, index) => {
    const campaign = campaignById(id)!;
    let score = index === 0 ? 78 : 68;
    const reasons = [`Directly addresses the merchant's goal: ${campaign.jobToBeDone.toLowerCase()}.`];
    if (merchant.primaryGoal === "visibility" && !merchant.hasSponsoredListings) { score += 16; reasons.push("There is no active Sponsored Listings campaign."); }
    if (merchant.primaryGoal === "slow_daypart" && merchant.slowestDayparts?.length) { score += 12; reasons.push(`The merchant identified ${merchant.slowestDayparts.join(", ")} as a slower period.`); }
    if (merchant.operationalConstraints.includes("peak_full") && (id === "HAPPY_HOUR" || id === "SPONSORED_LISTINGS")) { score += 7; reasons.push("Scheduling can support controlled growth around operational capacity."); }
    if (merchant.budgetSensitivity === "high") { score -= 6; reasons.push("Use a controlled setup and verify current terms before committing."); }
    if (merchant.currentCampaigns.includes(id)) { score -= 18; reasons.push("This campaign is already active; review current performance before changing it."); }
    score = Math.max(0, Math.min(100, score));
    const excluded = campaigns.filter((c) => !candidates.includes(c.id)).slice(0, 2).map((c) => `${c.name}: it is less directly aligned to the stated goal.`);
    return { campaignId: id, fitScore: score, rank: index + 1, whyRecommended: reasons.slice(0, 3), goalAlignment: `Aligned to ${merchant.primaryGoal.replaceAll("_", " ")}.`, operationalFit: merchant.operationalConstraints.length ? "Review capacity and scheduling before launch." : "No operational constraint has been identified.", budgetFit: merchant.budgetSensitivity === "high" ? "Start with the merchant's investment comfort; terms require verification." : "Confirm current budget settings with the merchant.", tradeoffs: campaign.budgetConsiderations, nextAction: campaign.talkTrack.close[0], sourceIds: [`${campaign.source.sourceDocument} · p. ${campaign.source.sourcePage}`], whyNot: excluded } satisfies Recommendation;
  }).sort((a, b) => b.fitScore - a.fitScore).map((item, index) => ({ ...item, rank: index + 1 }));
}

export const fitLabel = (score: number) => score >= 90 ? "Excellent Fit" : score >= 75 ? "Strong Fit" : score >= 60 ? "Possible Fit" : "Low Fit";
