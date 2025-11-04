"use client";

import {
  Boxes,
  GitBranch,
  KeyRound,
  Puzzle,
  Settings,
  TestTube,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { UseCaseItem } from "./constants";

interface UseCaseTimelineProps {
  data: UseCaseItem[];
  readMoreLabel: string;
}

const iconMap = {
  boxes: Boxes,
  puzzle: Puzzle,
  "key-round": KeyRound,
  "test-tube": TestTube,
  workflow: Workflow,
  settings: Settings,
  "git-branch": GitBranch,
};

export const UseCaseTimeline = ({
  data,
  readMoreLabel,
}: UseCaseTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateLineHeight = () => {
      if (!containerRef.current || !lineRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;

      // Start animation when container enters viewport
      const scrollStart = containerTop - viewportHeight + 200;
      const scrollEnd = containerTop + containerHeight - viewportHeight + 200;
      const scrollDistance = scrollEnd - scrollStart;

      // Calculate progress (0 to 1)
      let progress = -scrollStart / scrollDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Apply with easing for smoother effect
      setLineHeight(progress * 100);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateLineHeight();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    updateLineHeight();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("w-full md:px-10")}>
      <div className="relative max-w-7xl mx-auto pb-20">
        {data.map((item) => {
          const IconComponent = iconMap[item.iconName];
          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col lg:flex-row justify-start pt-10 lg:pt-40 lg:gap-10"
              )}
            >
              {/* Sticky Title Section */}
              <div
                className={cn(
                  "sticky flex flex-col lg:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm lg:w-full"
                )}
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    "h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center",
                    "bg-background border border-neutral-700"
                  )}
                >
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border border-neutral-700 p-2",
                      "[background-image:var(--gradient-numbers)]"
                    )}
                  />
                </div>

                {/* Desktop Title */}
                <h3
                  className={cn(
                    "hidden lg:block text-base lg:pl-20 lg:text-4xl font-bold",
                    "[background-image:var(--gradient-numbers)] bg-clip-text text-transparent"
                  )}
                >
                  {item.title}
                </h3>
              </div>

              {/* Content Section */}
              <div className="relative pl-20 pr-4 lg:pl-4 w-full">
                {/* Mobile Title */}
                <h3
                  className={cn(
                    "lg:hidden block text-lg mb-4 text-left font-bold",
                    "[background-image:var(--gradient-numbers)] bg-clip-text text-transparent"
                  )}
                >
                  {item.title}
                </h3>

                {/* Card */}
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block rounded-lg p-[1px] box-shadow-card backdrop-blur-42px",
                    "[background-image:var(--gradient-stroke)] bg-size-[150%]",
                    "transition-all duration-300 ease-in-out",
                    "hover:scale-[1.01] hover:shadow-lg",
                    "group"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-[calc(0.5rem-1px)] bg-gradient-dark-purple",
                      "p-8"
                    )}
                  >
                    {/* Icon and Description */}
                    <div
                      className={cn(
                        "flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6"
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 p-2 sm:p-4 rounded-lg",
                          "bg-background border border-neutral-700",
                          "transition-transform duration-300",
                          "group-hover:scale-110"
                        )}
                      >
                        <IconComponent
                          className={cn(
                            "w-8 h-8 sm:w-12 sm:h-12 transition-colors duration-300",
                            "[stroke:url(#gradient-icon)]"
                          )}
                        />
                        <svg width="0" height="0" aria-hidden="true">
                          <title>Icon gradient definition</title>
                          <defs>
                            <linearGradient
                              id="gradient-icon"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="10%" stopColor="#F500FF" />
                              <stop offset="100%" stopColor="#4200FF" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className={cn("flex-1")}>
                        <p
                          className={cn(
                            "text-(length:--font-size-body-2) text-neutral-0 mb-4"
                          )}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Link */}
                    <div
                      className={cn(
                        "flex items-center gap-2 text-sm text-neutral-0",
                        "group-hover:[background-image:var(--gradient-numbers)] group-hover:bg-clip-text group-hover:text-transparent",
                        "transition-all duration-300"
                      )}
                    >
                      <span>{readMoreLabel}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Arrow right"
                        className={cn(
                          "transition-transform duration-300",
                          "group-hover:translate-x-1"
                        )}
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="External link"
                        className={cn("opacity-60")}
                      >
                        <path
                          d="M10 1L1 10M10 1H3M10 1V8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Animated Timeline Line */}
        <div
          ref={lineRef}
          className={cn(
            "absolute md:left-8 left-8 top-0 w-[2px]",
            "overflow-hidden"
          )}
          style={{
            height: "100%",
          }}
        >
          {/* Background Line */}
          <div
            className={cn(
              "absolute inset-0 w-[2px]",
              "bg-gradient-to-b from-transparent via-neutral-700 to-transparent opacity-30"
            )}
          />

          {/* Animated Progress Line */}
          <div
            className={cn(
              "absolute top-0 left-0 w-[2px] rounded-full",
              "[background-image:var(--gradient-numbers)]",
              "shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            )}
            style={{
              height: `${lineHeight}%`,
              transition: "height 0.1s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};
