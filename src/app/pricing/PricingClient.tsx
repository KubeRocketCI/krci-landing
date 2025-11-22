"use client";

import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {pricingList.map((item) => (
          <div key={item.id} className="flex">
            <PricingCard
              {...item}
              onContactClick={() => setContactModalOpen(true)}
            />
          </div>
        ))}
      </div>

      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        translations={contactFormTranslations}
      />
    </>
  );
}
