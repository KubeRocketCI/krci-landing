import { Check, Minus } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface ExpertiseTableProps {
  translations: Translations;
}

const TIER_KEYS = ["openSource", "team", "scale", "enterprise"] as const;

// An empty cell value means the capability is not included in the tier,
// keeping the included/excluded state independent of translated copy
const CellValue = ({ value }: { value: string }) => {
  if (!value) {
    return (
      <Minus className="w-5 h-5 text-neutral-60" aria-label="Not included" />
    );
  }

  return (
    <span className="flex items-center gap-2">
      <Check className="w-5 h-5 text-[#0094ff] flex-shrink-0" />
      <span className="text-(length:--font-size-body-2) text-neutral-0">
        {value}
      </span>
    </span>
  );
};

export const ExpertiseTable = ({ translations }: ExpertiseTableProps) => {
  const { title, headers, groups } = translations.pricing.expertiseTable;

  return (
    <div className="mt-16">
      <h2 className="text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3">
        {title}
      </h2>

      {/* Desktop: full comparison table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-neutral-70">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-dark-purple border-b border-neutral-70">
              <th className="p-4 text-left text-(length:--font-size-body) font-medium text-neutral-0">
                {headers.capability}
              </th>
              {TIER_KEYS.map((tier) => (
                <th
                  key={tier}
                  className="p-4 text-left text-(length:--font-size-body) font-medium text-neutral-0"
                >
                  {headers[tier]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.label}>
                <tr className="bg-gradient-dark-purple border-b border-neutral-70">
                  <td
                    colSpan={TIER_KEYS.length + 1}
                    className="px-4 py-3 text-(length:--font-size-caption) font-medium uppercase tracking-wider text-neutral-20"
                  >
                    {group.label}
                  </td>
                </tr>
                {group.rows.map((row, rowIdx) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b border-neutral-70 last:border-b-0",
                      rowIdx % 2 === 1 && "bg-neutral-80/30",
                    )}
                  >
                    <td className="p-4 text-(length:--font-size-body-2) text-neutral-0 font-medium">
                      {row.label}
                    </td>
                    {TIER_KEYS.map((tier) => (
                      <td key={tier} className="p-4">
                        <CellValue value={row[tier]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked per-tier sections */}
      <div className="md:hidden space-y-3">
        {TIER_KEYS.map((tier) => (
          <details
            key={tier}
            className="rounded-lg bg-gradient-dark-purple border border-neutral-70 overflow-hidden"
          >
            <summary className="p-4 cursor-pointer text-(length:--font-size-subtitle) font-medium text-neutral-0">
              {headers[tier]}
            </summary>
            <div className="px-4 pb-4 space-y-4">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="text-(length:--font-size-caption) font-medium uppercase tracking-wider text-neutral-20 mb-2">
                    {group.label}
                  </p>
                  <ul className="space-y-3">
                    {group.rows.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-start justify-between gap-4 border-b border-neutral-70 last:border-b-0 pb-3 last:pb-0"
                      >
                        <span className="text-(length:--font-size-body-2) text-neutral-20">
                          {row.label}
                        </span>
                        <CellValue value={row[tier]} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
