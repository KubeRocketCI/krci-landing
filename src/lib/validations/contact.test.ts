import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./contact";

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  question: "How do I install the platform on EKS?",
};

describe("contactFormSchema", () => {
  it("accepts names with the punctuation people use", () => {
    for (const name of [
      "John (Acme)",
      "Jane Doe, CTO",
      "O'Brien-Smith",
      "Team 42 & Co.",
    ]) {
      expect(
        contactFormSchema.safeParse({ ...valid, name }).success,
        name,
      ).toBe(true);
    }
  });

  it("collapses whitespace and line breaks in the name", () => {
    const result = contactFormSchema.parse({ ...valid, name: "Jane\r\n  Doe" });
    expect(result.name).toBe("Jane Doe");
  });

  it("rejects names that are too short or carry markup", () => {
    expect(contactFormSchema.safeParse({ ...valid, name: "J" }).success).toBe(
      false,
    );
    expect(
      contactFormSchema.safeParse({ ...valid, name: "<b>Jane</b>" }).success,
    ).toBe(false);
  });

  it("requires a routable email address and lower-cases it", () => {
    expect(
      contactFormSchema.parse({ ...valid, email: "Jane@Example.com" }).email,
    ).toBe("jane@example.com");
    for (const email of [
      "john@company",
      "<x>@y.z",
      "a,b@c.d",
      "x@y.z<script>",
    ]) {
      expect(
        contactFormSchema.safeParse({ ...valid, email }).success,
        email,
      ).toBe(false);
    }
  });

  it("takes plan and location as lower-case identifiers only", () => {
    expect(
      contactFormSchema.safeParse({
        ...valid,
        plan: "team",
        location: "pricing",
      }).success,
    ).toBe(true);
    expect(contactFormSchema.safeParse({ ...valid, plan: "" }).success).toBe(
      true,
    );
    expect(
      contactFormSchema.safeParse({ ...valid, plan: "Team!" }).success,
    ).toBe(false);
  });
});
