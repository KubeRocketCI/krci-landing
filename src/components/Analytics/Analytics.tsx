"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import { useConsent } from "@/lib/consent-context";

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useConsent();

  useEffect(() => {
    if (consent?.analytics && pathname) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      trackPageView(url);
    }
  }, [pathname, searchParams, consent?.analytics]);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
