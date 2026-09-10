import type { CampaignId, Goal } from "@/types/campaign";

// Documented goal-to-tool mappings. UI components must not contain campaign logic.
export const goalCampaignRules: Record<Goal, CampaignId[]> = {
  visibility: ["SPONSORED_LISTINGS"],
  new_customers: ["TRY_WITH_DISCOUNT", "TRY_ME_FREE"],
  bigger_orders: ["SPEND_X_GET_Y", "FREE_ITEM_MIN_SPEND"],
  repeat_customers: ["ORDER_AGAIN_SAVE", "STORE_LOYALTY"],
  overall_sales: ["SPONSORED_LISTINGS", "SMART_CAMPAIGNS"],
  slow_daypart: ["HAPPY_HOUR", "SPONSORED_LISTINGS"],
  specific_item: ["BOGO", "FREE_DISCOUNTED_ITEM"],
  automation: ["SMART_CAMPAIGNS"],
  delivery_friction: ["DOORDASH_DEALS", "TRY_ME_FREE"]
};
