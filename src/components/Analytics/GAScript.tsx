import { isProduction } from "@/lib/env";

export function GAScript() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Only load GA script in production environment
  if (!GA_MEASUREMENT_ID || !isProduction()) {
    return null;
  }

  // Note: ad_storage, ad_user_data, ad_personalization are set to 'denied'
  // permanently since we don't use advertising features.
  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Google Analytics consent initialization
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Google Consent Mode v2 - Set ALL defaults BEFORE loading GA script
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'send_page_view': false
            });
          `,
        }}
      />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  );
}
