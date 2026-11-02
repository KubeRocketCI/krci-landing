import { DOCS_BASE_URL } from "@/lib/utm";

export interface UseCaseItem {
  id: string;
  link: string;
  agents?: boolean;
}

export interface UseCaseGroup {
  id: string;
  items: UseCaseItem[];
}

const DOCS = `${DOCS_BASE_URL}/use-cases`;

export const useCaseGroups: UseCaseGroup[] = [
  {
    id: "scaffold",
    items: [
      {
        id: "scaffoldDeploy",
        link: `${DOCS}/application-scaffolding`,
      },
      {
        id: "customFramework",
        link: `${DOCS}/tekton-custom-pipelines`,
      },
    ],
  },
  {
    id: "secure",
    items: [
      { id: "secretsManagement", link: `${DOCS}/external-secrets` },
      {
        id: "autotestQualityGate",
        link: `${DOCS}/autotest-as-quality-gate`,
        agents: true,
      },
      {
        id: "envVariables",
        link: `${DOCS}/cd-autotests-run-with-env-variables`,
      },
    ],
  },
  {
    id: "deploy",
    items: [
      { id: "customPipelines", link: `${DOCS}/custom-pipelines-flow` },
      {
        id: "featureBranch",
        link: `${DOCS}/deploy-application-from-feature-branch`,
        agents: true,
      },
    ],
  },
];
