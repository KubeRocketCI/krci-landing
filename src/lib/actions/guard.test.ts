import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  RATE_LIMIT,
  STARTED_AT_FIELD,
  SUBMITTED_AT_FIELD,
} from "@/lib/spam-guard";

const checkBotId = vi.fn();
const requestHeaders = new Map<string, string>();

vi.mock("botid/server", () => ({ checkBotId: () => checkBotId() }));
vi.mock("next/headers", () => ({
  headers: async () => ({
    get: (name: string) => requestHeaders.get(name) ?? null,
  }),
}));

const { enforceRateLimit, guardSubmission, RATE_LIMIT_ERROR, SECURITY_ERROR } =
  await import("./guard");

function submission(overrides: Record<string, string> = {}) {
  const formData = new FormData();
  formData.set(STARTED_AT_FIELD, "1700000000000");
  formData.set(SUBMITTED_AT_FIELD, String(1_700_000_000_000 + MIN_FILL_MS));
  for (const [key, value] of Object.entries(overrides))
    formData.set(key, value);
  return formData;
}

describe("guardSubmission", () => {
  beforeEach(() => {
    checkBotId.mockReset();
    checkBotId.mockResolvedValue({ isBot: false });
  });

  it("lets a human submission through", async () => {
    expect(await guardSubmission(submission())).toBeNull();
    expect(checkBotId).toHaveBeenCalledOnce();
  });

  it("rejects a filled honeypot before calling BotID", async () => {
    const result = await guardSubmission(
      submission({ [HONEYPOT_FIELD]: "http://spam.example" }),
    );
    expect(result).toEqual({ error: SECURITY_ERROR });
    expect(checkBotId).not.toHaveBeenCalled();
  });

  it("rejects a form submitted faster than a person can fill it", async () => {
    const result = await guardSubmission(
      submission({ [SUBMITTED_AT_FIELD]: "1700000000500" }),
    );
    expect(result).toEqual({ error: SECURITY_ERROR });
    expect(checkBotId).not.toHaveBeenCalled();
  });

  it("rejects what BotID flags", async () => {
    checkBotId.mockResolvedValue({ isBot: true });
    expect(await guardSubmission(submission())).toEqual({
      error: SECURITY_ERROR,
    });
  });
});

describe("enforceRateLimit", () => {
  it("limits one client address and leaves others alone", async () => {
    requestHeaders.set("x-forwarded-for", "198.51.100.7, 10.0.0.1");
    for (let i = 0; i < RATE_LIMIT; i++) {
      expect(await enforceRateLimit()).toBeNull();
    }
    expect(await enforceRateLimit()).toEqual({ error: RATE_LIMIT_ERROR });
    requestHeaders.set("x-forwarded-for", "198.51.100.8");
    expect(await enforceRateLimit()).toBeNull();
  });

  it("does not limit when no client address is known", async () => {
    requestHeaders.clear();
    for (let i = 0; i <= RATE_LIMIT; i++) {
      expect(await enforceRateLimit()).toBeNull();
    }
  });
});
