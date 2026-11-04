import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { demoFormSchema, isBusinessTime } from "./demo";

const email = "jane@example.com";

beforeAll(() => {
  vi.useFakeTimers({
    now: new Date("2026-11-03T12:00:00.000Z"),
    toFake: ["Date"],
  });
});

afterAll(() => {
  vi.useRealTimers();
});

// The next weekday at 09:00 UTC: 11:00 or 12:00 in Kyiv, inside business hours all year.
function nextBusinessSlot() {
  const date = new Date();
  date.setUTCHours(9, 0, 0, 0);
  do {
    date.setUTCDate(date.getUTCDate() + 1);
  } while (!isBusinessTime(date));
  return date;
}

describe("demoFormSchema datetime", () => {
  it("accepts a future business-hours slot in ISO form", () => {
    const datetime = nextBusinessSlot().toISOString();
    expect(demoFormSchema.safeParse({ email, datetime }).success).toBe(true);
  });

  it("rejects anything but the ISO form, even when Date would parse it", () => {
    const legacy = "Tue Nov 10 2026 11:00:00 GMT+0200 (any text can go here)";
    expect(Number.isNaN(new Date(legacy).getTime())).toBe(false);
    expect(demoFormSchema.safeParse({ email, datetime: legacy }).success).toBe(
      false,
    );
  });

  it("rejects slots in the past and outside business hours", () => {
    expect(
      demoFormSchema.safeParse({ email, datetime: "2020-01-06T09:00:00.000Z" })
        .success,
    ).toBe(false);
    const night = nextBusinessSlot();
    night.setUTCHours(22);
    expect(
      demoFormSchema.safeParse({ email, datetime: night.toISOString() })
        .success,
    ).toBe(false);
  });
});
