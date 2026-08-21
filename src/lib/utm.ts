const UTM_SOURCE = "kuberocketci.io";
const UTM_MEDIUM = "referral";

/**
 * Tags an outbound docs URL with UTM parameters so the docs GA property
 * can attribute traffic to the landing-page placement that sent it.
 */
export function withUtm(url: string, campaign: string): string {
  const tagged = new URL(url);
  tagged.searchParams.set("utm_source", UTM_SOURCE);
  tagged.searchParams.set("utm_medium", UTM_MEDIUM);
  tagged.searchParams.set("utm_campaign", campaign);
  return tagged.toString();
}
