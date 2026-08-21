"use client";

import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";
import { trackEvent } from "@/lib/analytics";
import type { TranslationContactForm } from "@/types/translations";
import { PricingCard } from "../components/Pricing/PricingCard";
import type { PricingItem } from "../components/Pricing/types";

interface PricingClientProps {
  pricingList: PricingItem[];
  contactFormTranslations: TranslationContactForm;
}

export function PricingClient({
  pricingList,
  contactFormTranslations,
}: PricingClientProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {pricingList.map((item) => (
          <div key={item.id} className="flex">
            <PricingCard
              {...item}
              onContactClick={() => {
                trackEvent("contact_open", {
                  location: "pricing",
                  plan: item.id,
                });
                setSelectedPlan(item.id);
                setContactModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        translations={contactFormTranslations}
        location="pricing"
        plan={selectedPlan}
      />
    </>
  );
}
