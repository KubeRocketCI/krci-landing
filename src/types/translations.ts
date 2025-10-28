export interface TranslationStatistics {
  migrationTime: string;
  fasterDeploy: string;
  automatedTasks: string;
  hoursSaved: string;
}

export interface TranslationBenefitItem {
  title: string;
  description: string;
}

export interface TranslationBenefits {
  title: string;
  description: string;
  items: {
    quickStart: TranslationBenefitItem;
    cloudAgnostic: TranslationBenefitItem;
    easySetup: TranslationBenefitItem;
    reduceCosts: TranslationBenefitItem;
    healthMonitor: TranslationBenefitItem;
    aiAdoption: TranslationBenefitItem;
  };
}

export interface TranslationFeatureItem {
  title: string;
  description: string;
}

export interface TranslationFeatures {
  title: string;
  description: string;
  items: {
    appTemplates: TranslationFeatureItem;
    sso: TranslationFeatureItem;
    openSource: TranslationFeatureItem;
    kubernetes: TranslationFeatureItem;
  };
}

export interface TranslationKeyDifferentiationItem {
  title: string;
  description: string;
}

export interface TranslationKeyDifferentiation {
  title: string;
  description: string;
  items: {
    goldenPath: TranslationKeyDifferentiationItem;
    security: TranslationKeyDifferentiationItem;
    flexibility: TranslationKeyDifferentiationItem;
  };
}

export interface TranslationHero {
  title: string;
  description: string;
  contactButton: string;
  demoButton: string;
}

export interface TranslationAbout {
  title: string;
  description: string;
  statistics: TranslationStatistics;
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
    subscribe: {
      title: string;
      label: string;
      placeholder: string;
      button: string;
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
    marketing: {
      title: string;
      description: string;
    };
    functionality: {
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

export interface TranslationTestimonials {
  title: string;
  description: string;
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
  };
  messages: {
    success: string;
    error: string;
    configError: string;
    securityError: string;
    validationError: string;
  };
}

export interface Translations {
  hero: TranslationHero;
  about: TranslationAbout;
  benefits: TranslationBenefits;
  features: TranslationFeatures;
  keyDifferentiation: TranslationKeyDifferentiation;
  testimonials: TranslationTestimonials;
  cta: TranslationCTA;
  footer: TranslationFooter;
  cookieConsent: TranslationCookieConsent;
  privacy: TranslationPrivacy;
  terms: TranslationTerms;
  contactForm: TranslationContactForm;
}
