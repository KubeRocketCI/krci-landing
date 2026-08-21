import { withUtm } from "@/lib/utm";

const FOOTER_CAMPAIGN = "footer";

export const FOOTER_LINKS = {
  readings: {
    whatIs: withUtm(
      "https://docs.kuberocketci.io/docs/about-platform",
      FOOTER_CAMPAIGN,
    ),
    blogs: withUtm("https://docs.kuberocketci.io/blog", FOOTER_CAMPAIGN),
    userGuide: withUtm(
      "https://docs.kuberocketci.io/docs/user-guide",
      FOOTER_CAMPAIGN,
    ),
    developerGuide: withUtm(
      "https://docs.kuberocketci.io/docs/developer-guide",
      FOOTER_CAMPAIGN,
    ),
    apiReference: withUtm(
      "https://docs.kuberocketci.io/docs/api/overview",
      FOOTER_CAMPAIGN,
    ),
  },
  learnMore: {
    github: "https://github.com/kuberocketci",
    artifactHub: "https://artifacthub.io/packages/search?repo=epmdedp",
    operatorHub: "https://operatorhub.io/?keyword=edp",
    dockerHub: "https://hub.docker.com/u/epamedp",
    blogCategories: withUtm(
      "https://docs.kuberocketci.io/blog/tags",
      FOOTER_CAMPAIGN,
    ),
    rssFeed: "https://docs.kuberocketci.io/blog/rss.xml",
    atomFeed: "https://docs.kuberocketci.io/blog/atom.xml",
  },
  community: {
    youtube: "https://www.youtube.com/@theplatformteam",
    github: "https://github.com/kuberocketci",
    medium: "https://medium.com/kuberocketci",
  },
} as const;
