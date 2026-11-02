"use client";

import { useDialogs } from "@/components/DialogHost";
import { PricingCard } from "../components/Pricing/PricingCard";
import type { PricingItem } from "../components/Pricing/types";

interface PricingClientProps {
  pricingList: PricingItem[];
}

export function PricingClient({ pricingList }: PricingClientProps) {
  const { openContact, preloadContact } = useDialogs();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {pricingList.map((item) => (
        <div key={item.id} className="flex">
          <PricingCard
            {...item}
            onContactClick={(event) =>
              openContact("pricing", {
                opener: event.currentTarget,
                plan: item.id,
              })
            }
            onContactIntent={preloadContact}
          />
        </div>
      ))}
    </div>
  );
}
