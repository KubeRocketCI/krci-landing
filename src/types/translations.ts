export interface TranslationAiFabricPillar {
  title: string;
  description: string;
}

export interface TranslationAiFabric {
  title: string;
  description: string;
  stats: {
    ciMinutes: string;
    agentPRs: string;
    capacity: string;
    governance: string;
  };
  statsSource: string;
  learnMore: string;
  pillars: {
    harness: TranslationAiFabricPillar;
    guardrails: TranslationAiFabricPillar;
    ephemeral: TranslationAiFabricPillar;
  };
}

export interface TranslationPlatformItem {
  title: string;
  description: string;
}

export interface TranslationStat {
  value: string;
  label: string;
}

export interface TranslationPlatform {
  title: string;
  description: string;
  githubLink: string;
  items: {
    goldenPath: TranslationPlatformItem;
    gates: TranslationPlatformItem;
    openSource: TranslationPlatformItem;
    quickStart: TranslationPlatformItem;
  };
}

export interface TranslationAiFactoryItem {
  title: string;
  description: string;
}

export interface TranslationAiFactoryDeliveryItem {
  description: string;
  linkLabel: string;
}

export interface TranslationAiFactory {
  title: string;
  descriptionLead: string;
  description: string;
  market: {
    description: string;
    stats: {
      commits: TranslationStat;
      agentPRs: TranslationStat;
      ciMinutes: TranslationStat;
      capacity: TranslationStat;
    };
    statsSource: string;
  };
  shift: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    warningValue: string;
    warning: string;
    warningSource: string;
    survivors: string;
  };
  needs: {
    title: string;
    description: string;
    items: {
      harness: TranslationAiFactoryItem;
      qualityGates: TranslationAiFactoryItem;
      guardrails: TranslationAiFactoryItem;
      auditTrail: TranslationAiFactoryItem;
      ephemeral: TranslationAiFactoryItem;
      observability: TranslationAiFactoryItem;
    };
  };
  delivery: {
    description: string;
    needLabel: string;
    deliveryLabel: string;
    items: {
      harness: TranslationAiFactoryDeliveryItem;
      qualityGates: TranslationAiFactoryDeliveryItem;
      guardrails: TranslationAiFactoryDeliveryItem;
      auditTrail: TranslationAiFactoryDeliveryItem;
      ephemeral: TranslationAiFactoryDeliveryItem;
      observability: TranslationAiFactoryDeliveryItem;
    };
  };
  cta: {
    title: string;
    subtitle: string;
    docsLink: string;
    pricingLink: string;
  };
}

export interface TranslationHero {
  title: string;
  description: string;
  contactButton: string;
  demoButton: string;
  docsLink: string;
  visual: {
    label: string;
    sources: {
      agent: string;
      developer: string;
    };
    legend: {
      agent: string;
      developer: string;
      blocked: string;
      tornDown: string;
      loop: string;
    };
    stagesShort: {
      pipeline: string;
      gates: string;
      environment: string;
      merge: string;
      audit: string;
    };
    stages: {
      pipeline: string;
      gates: string;
      environment: string;
      merge: string;
      audit: string;
    };
    status: {
      passed: string;
      blocked: string;
      tornDown: string;
      skipped: string;
      committed: string;
    };
  };
}

export interface TranslationCTA {
  title: string;
  subtitle: string;
  button: string;
}

export interface TranslationFooter {
  sections: {
    readings: {
      title: string;
      links: Record<string, string>;
    };
    learnMore: {
      title: string;
      links: Record<string, string>;
    };
    community: {
      title: string;
    };
  };
  copyright: string;
  legal: {
    privacyPolicy: string;
    terms: string;
  };
}

export interface TranslationCookieConsent {
  banner: {
    title: string;
    description: string;
    acceptAll: string;
    onlyNecessary: string;
    customize: string;
  };
  preferences: {
    title: string;
    savePreferences: string;
    acceptAll: string;
    onlyNecessary: string;
    privacyLink: string;
    privacyPolicy: string;
  };
  categories: {
    necessary: {
      title: string;
      description: string;
      required: string;
    };
    analytics: {
      title: string;
      description: string;
    };
  };
  settingsButton: string;
  closeLabel: string;
}

export interface TranslationPrivacy {
  title: string;
  backToHome: string;
  effectiveDate: string;
  lastUpdated: string;
  date: string;
}

export interface TranslationTerms {
  title: string;
  backToHome: string;
  effectiveDate: string;
  lastUpdated: string;
  date: string;
}

export interface TranslationNotFound {
  title: string;
  description: string;
  backToHome: string;
  docsLink: string;
}

export interface PrivacyConsentTranslation {
  prefix: string;
  privacyLink: string;
  middle: string;
  termsLink: string;
  suffix: string;
}

export interface TranslationContactForm {
  title: string;
  description: string;
  fields: {
    name: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    question: {
      label: string;
      placeholder: string;
    };
  };
  buttons: {
    submit: string;
    submitting: string;
    cancel: string;
    close: string;
  };
  privacyConsent: PrivacyConsentTranslation;
  messages: {
    success: string;
    networkError: string;
    unexpectedError: string;
  };
  success: {
    title: string;
    docsLabel: string;
  };
}

export interface TranslationPricingTier {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  link: {
    label: string;
  };
  label?: string;
}

export interface TranslationExpertiseRow {
  label: string;
  openSource: string;
  team: string;
  scale: string;
  enterprise: string;
}

export interface TranslationExpertiseGroup {
  label: string;
  rows: TranslationExpertiseRow[];
}

export interface TranslationPricing {
  title: string;
  description: string;
  tiers: {
    openSource: TranslationPricingTier;
    team: TranslationPricingTier;
    scale: TranslationPricingTier;
    enterprise: TranslationPricingTier;
  };
  notes: {
    disclaimer: string;
  };
  expertiseTable: {
    title: string;
    headers: {
      capability: string;
      openSource: string;
      team: string;
      scale: string;
      enterprise: string;
    };
    groups: TranslationExpertiseGroup[];
  };
}

export interface TranslationDemoForm {
  title: string;
  description: string;
  fields: {
    email: {
      label: string;
      placeholder: string;
    };
    date: {
      label: string;
    };
    time: {
      label: string;
      placeholder: string;
    };
  };
  buttons: {
    submit: string;
    submitting: string;
    cancel: string;
    close: string;
  };
  privacyConsent: PrivacyConsentTranslation;
  messages: {
    success: string;
    selectDate: string;
    selectTime: string;
    emailRequired: string;
    invalidBusinessHours: string;
    networkError: string;
    unexpectedError: string;
  };
  helper: {
    businessHours: string;
    selectedTime: string;
    slotsLabel: string;
    selectDateFirst: string;
    noSlots: string;
  };
  success: {
    title: string;
    bookedFor: string;
    docsLabel: string;
  };
}

export type AiSdlcPhaseId =
  | "plan"
  | "design"
  | "build"
  | "test"
  | "review"
  | "deploy"
  | "operate";

export type AiSdlcNarratedStepId = AiSdlcPhaseId | "own";

export type AiSdlcStepId = "overview" | AiSdlcNarratedStepId;

export type AiSdlcLayerId = "agents" | "skills" | "workflows";

export type AiSdlcChipId =
  | "git"
  | "templates"
  | "webhooks"
  | "pipelines"
  | "cli"
  | "environments"
  | "gates"
  | "security"
  | "flows"
  | "gitops"
  | "rbac"
  | "observability";

export type TranslationAiSdlcLines = Record<AiSdlcLayerId, string>;

export type TranslationAiSdlcStep = TranslationAiSdlcLines & {
  title: string;
  description: string;
};

export interface TranslationAiSdlc {
  title: string;
  description: string;
  layersSummary: string;
  storyLabel: string;
  progressLabel: string;
  phases: Record<AiSdlcPhaseId, string>;
  diagram: {
    aiLayer: string;
    platform: string;
    loop: string;
    litLabel: string;
    layers: Record<AiSdlcLayerId, string>;
    chips: Record<AiSdlcChipId, string>;
  };
  steps: Record<"overview", TranslationAiSdlcLines> &
    Record<AiSdlcNarratedStepId, TranslationAiSdlcStep>;
  cta: {
    title: string;
    subtitle: string;
    aiFactoryLink: string;
    docsLink: string;
    pricingLink: string;
  };
}

export interface Translations {
  hero: TranslationHero;
  aiFabric: TranslationAiFabric;
  platform: TranslationPlatform;
  aiFactory: TranslationAiFactory;
  aiSdlc: TranslationAiSdlc;
  cta: TranslationCTA;
  footer: TranslationFooter;
  cookieConsent: TranslationCookieConsent;
  privacy: TranslationPrivacy;
  terms: TranslationTerms;
  notFound: TranslationNotFound;
  contactForm: TranslationContactForm;
  pricing: TranslationPricing;
  demoForm: TranslationDemoForm;
  accessibility: {
    skipToContent: string;
    newTab: string;
  };
}
