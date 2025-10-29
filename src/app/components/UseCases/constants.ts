export interface UseCaseItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | "boxes"
    | "puzzle"
    | "key-round"
    | "test-tube"
    | "workflow"
    | "settings"
    | "git-branch";
  link: string;
}

export const useCasesData: UseCaseItem[] = [
  {
    id: "scaffold-deploy",
    title: "Scaffold and Deploy FastAPI Application",
    description:
      "Rapidly create, customize, and deploy FastAPI applications using a scaffolding tool and standardized processes, streamlining development and enhancing code quality for quicker and reliable feature releases.",
    iconName: "boxes",
    link: "https://docs.kuberocketci.io/docs/use-cases/application-scaffolding",
  },
  {
    id: "custom-framework",
    title: "Bring Your Own Framework",
    description:
      "Facilitate the onboarding of custom tools and frameworks into the KubeRocketCI by integrating custom Tekton libraries, empowering the modification of pipelines and tasks for tailored workflows.",
    iconName: "puzzle",
    link: "https://docs.kuberocketci.io/docs/use-cases/tekton-custom-pipelines",
  },
  {
    id: "secrets-management",
    title: "Secrets Management for Application Deployment",
    description:
      "Ensure secure handling of sensitive data by leveraging an external secret store within the KubeRocketCI, allowing secure transmission and usage of confidential information across namespaces, facilitating secure connections to databases during development and deployment.",
    iconName: "key-round",
    link: "https://docs.kuberocketci.io/docs/use-cases/external-secrets",
  },
  {
    id: "autotest-quality-gate",
    title: "Autotest as a Quality Gate",
    description:
      "Implement autotests as a quality gate within the Continuous Deployment pipeline, verifying application stability and functionality, allowing reliable versions to be promoted while enabling quick creation of applications, streamlined testing, and seamless deployment updates.",
    iconName: "test-tube",
    link: "https://docs.kuberocketci.io/docs/use-cases/autotest-as-quality-gate",
  },
  {
    id: "custom-pipelines",
    title: "Creating and Using Custom Tekton Pipelines",
    description:
      "Create and use custom Tekton pipelines. While KubeRocketCI offers pre-configured Tekton pipelines for common use cases, custom pipelines allow you to adapt workflows to meet unique project requirements.",
    iconName: "workflow",
    link: "https://docs.kuberocketci.io/docs/use-cases/custom-pipelines-flow",
  },
  {
    id: "env-variables",
    title:
      "Set Test Suite Parameters Using Environment Variables in CD Pipelines",
    description:
      "Dynamically adjust parameters adding, modifying, or removing them without changing the test suite code. This provides precise control over quality gates, streamlines workflows, and allows pipelines to adapt to different environments or requirements while maintaining efficiency and quality standards.",
    iconName: "settings",
    link: "https://docs.kuberocketci.io/docs/use-cases/cd-autotests-run-with-env-variables",
  },
  {
    id: "feature-branch",
    title: "Deploy Application from Feature Branch",
    description:
      "Create a feature branch for your application and deploy it in a separate environment. Deploying a feature branch allows for deep testing of new features under development without merging them into the main branch.",
    iconName: "git-branch",
    link: "https://docs.kuberocketci.io/docs/use-cases/deploy-application-from-feature-branch",
  },
];
