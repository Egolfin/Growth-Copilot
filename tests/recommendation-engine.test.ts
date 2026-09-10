import { describe, expect, it } from "vitest";
import { sampleMerchants } from "@/data/sample-merchants";
import { recommendCampaigns } from "@/lib/recommendation-engine";

describe("recommendation engine", () => {
  it("recommends Sponsored Listings for visibility", () => expect(recommendCampaigns(sampleMerchants[0])[0].campaignId).toBe("SPONSORED_LISTINGS"));
  it("recommends Spend $X, Get $Y for bigger orders", () => expect(recommendCampaigns(sampleMerchants[2])[0].campaignId).toBe("SPEND_X_GET_Y"));
  it("recommends a retention product for repeat customers", () => expect(["ORDER_AGAIN_SAVE", "STORE_LOYALTY"]).toContain(recommendCampaigns(sampleMerchants[3])[0].campaignId));
  it("recommends Happy Hour for a slow daypart", () => expect(recommendCampaigns(sampleMerchants[4])[0].campaignId).toBe("HAPPY_HOUR"));
});
