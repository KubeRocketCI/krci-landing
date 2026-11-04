import { describe, expect, it } from "vitest";
import {
  isFilledTooFast,
  isRateLimited,
  MIN_FILL_MS,
  RATE_LIMIT,
  RATE_WINDOW_MS,
} from "./spam-guard";

const now = 1_700_000_000_000;

describe("isFilledTooFast", () => {
  it("rejects missing or malformed stamps", () => {
    expect(isFilledTooFast(null, String(now))).toBe(true);
    expect(isFilledTooFast(String(now), null)).toBe(true);
    expect(isFilledTooFast("", String(now))).toBe(true);
    expect(isFilledTooFast("soon", String(now))).toBe(true);
  });

  it("rejects a submission faster than the minimum fill time", () => {
    expect(isFilledTooFast(String(now), String(now + MIN_FILL_MS - 1))).toBe(
      true,
    );
  });

  it("accepts a submission after the minimum fill time", () => {
    expect(isFilledTooFast(String(now), String(now + MIN_FILL_MS))).toBe(false);
  });
});

describe("isRateLimited", () => {
  it("allows the limit and blocks the next submission inside the window", () => {
    for (let i = 0; i < RATE_LIMIT; i++) {
      expect(isRateLimited("203.0.113.1", now + i)).toBe(false);
    }
    expect(isRateLimited("203.0.113.1", now + RATE_LIMIT)).toBe(true);
  });

  it("forgets submissions older than the window", () => {
    for (let i = 0; i < RATE_LIMIT; i++) isRateLimited("203.0.113.2", now);
    expect(isRateLimited("203.0.113.2", now + RATE_WINDOW_MS)).toBe(false);
  });

  it("keeps clients apart", () => {
    for (let i = 0; i < RATE_LIMIT; i++) isRateLimited("203.0.113.3", now);
    expect(isRateLimited("203.0.113.4", now)).toBe(false);
  });
});
