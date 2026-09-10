import { describe, expect, it } from "vitest";
import { timeSensitiveOffers } from "@/data/time-sensitive-offers";

describe("time-sensitive source controls", () => {
  it("keeps historical and confidential offers inactive", () => expect(timeSensitiveOffers.every((offer) => !offer.active)).toBe(true));
  it("marks the NHL record confidential", () => expect(timeSensitiveOffers.find((offer) => offer.id === "NHL_GAME_NIGHT")?.confidential).toBe(true));
});
