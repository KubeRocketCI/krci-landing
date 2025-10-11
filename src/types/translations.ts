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
}

export interface Translations {
  hero: TranslationHero;
  about: TranslationAbout;
  benefits: TranslationBenefits;
  features: TranslationFeatures;
  keyDifferentiation: TranslationKeyDifferentiation;
  cta: TranslationCTA;
  footer: TranslationFooter;
}
