import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface TableRow {
  category?: string;
  description: string;
  hours: string;
  isHighlighted?: boolean;
}

interface TableSection {
  category: string;
  rows: TableRow[];
}

interface FeaturesTableProps {
  translations: Translations;
}

export const FeaturesTable = ({ translations }: FeaturesTableProps) => {
  const t = translations.pricing.featuresTable;

  const tableData: TableSection[] = [
    {
      category: t.categories.deployment.title,
      rows: [
        {
          description: t.categories.deployment.items.minimum,
          hours: "8",
          isHighlighted: true,
        },
        {
          description: t.categories.deployment.items.full,
          hours: "60",
        },
        {
          description: t.categories.deployment.items.observability,
          hours: "40",
          isHighlighted: true,
        },
        {
          description: t.categories.deployment.items.monitoring,
          hours: "40",
        },
        {
          description: t.categories.deployment.items.logging,
          hours: "40",
          isHighlighted: true,
        },
        {
          description: t.categories.deployment.items.sonarqube,
          hours: "8",
        },
        {
          description: t.categories.deployment.items.security,
          hours: "8",
          isHighlighted: true,
        },
      ],
    },
    {
      category: t.categories.framework.title,
      rows: [
        {
          description: t.categories.framework.items.onboard,
          hours: "40",
        },
        {
          description: t.categories.framework.items.template,
          hours: "40",
          isHighlighted: true,
        },
      ],
    },
    {
      category: t.categories.integration.title,
      rows: [
        {
          description: t.categories.integration.items.api,
          hours: "30",
        },
        {
          description: t.categories.integration.items.kubernetes,
          hours: "40",
          isHighlighted: true,
        },
        {
          description: t.categories.integration.items.portal,
          hours: "80",
        },
      ],
    },
    {
      category: t.categories.deployment_platform.title,
      rows: [
        {
          description: t.categories.deployment_platform.items.custom,
          hours: "80",
          isHighlighted: true,
        },
      ],
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg my-8">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className={cn(
                "bg-[#a821ff] text-white text-left p-4",
                "text-(length:--font-size-body-2) font-medium",
              )}
            >
              {t.headers.category}
            </th>
            <th
              className={cn(
                "bg-[#7820c0] text-white text-left p-4",
                "text-(length:--font-size-body-2) font-medium",
              )}
            >
              {t.headers.description}
            </th>
            <th
              className={cn(
                "bg-[#7820c0] text-white text-left p-4",
                "text-(length:--font-size-body-2) font-medium",
                "w-1/4 max-w-[25%]",
              )}
            >
              {t.headers.hours}
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((section) =>
            section.rows.map((row, rowIdx) => (
              <tr
                key={`${section.category}-${rowIdx}`}
                className={cn(
                  "border-b border-neutral-70",
                  row.isHighlighted && "bg-neutral-80/30",
                )}
              >
                {rowIdx === 0 && (
                  <td
                    rowSpan={section.rows.length}
                    className="p-4 align-top border-r border-neutral-70"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#a821ff] flex-shrink-0 mt-0.5" />
                      <span className="text-(length:--font-size-body-2) font-medium text-neutral-0">
                        {section.category}
                      </span>
                    </div>
                  </td>
                )}
                <td className="p-4 text-(length:--font-size-body-2) text-neutral-0 min-w-[50%]">
                  {row.description}
                </td>
                <td className="p-4 text-(length:--font-size-body-2) text-neutral-0 text-center">
                  {row.hours}
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
};
