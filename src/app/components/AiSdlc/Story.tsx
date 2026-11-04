"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { AiSdlcPhaseId, TranslationAiSdlc } from "@/types/translations";
import { LIT, NARRATED_STEPS, PhaseDiagram, STEPS } from "./PhaseDiagram";

function stepSummary(copy: TranslationAiSdlc, index: number) {
  const id = STEPS[index];
  const step = copy.steps[id];
  const { aiLayer, layers, chips, litLabel } = copy.diagram;
  const parts = [
    `${aiLayer}.`,
    `${layers.agents}: ${step.agents}.`,
    `${layers.skills}: ${step.skills}.`,
    `${layers.workflows}: ${step.workflows}.`,
  ];
  if (id in LIT) {
    const names = LIT[id as AiSdlcPhaseId].map((chip) => chips[chip]);
    parts.push(`${litLabel}: ${names.join(", ")}.`);
  }
  return parts.join(" ");
}

// A step becomes active when its top crosses this fraction of the viewport height.
const ACTIVE_LINE = 0.4;

export function Story({
  copy,
  hero,
}: {
  copy: TranslationAiSdlc;
  hero: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * ACTIVE_LINE;
      let next = 0;
      stepRefs.current.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top <= line) {
          next = index;
        }
      });
      setActive(next);
    };
    const observer = new IntersectionObserver(update, {
      rootMargin: `-${ACTIVE_LINE * 100}% 0px -${100 - ACTIVE_LINE * 100}% 0px`,
    });
    for (const step of stepRefs.current) {
      if (step) observer.observe(step);
    }
    update();
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const register = (index: number) => (element: HTMLElement | null) => {
    stepRefs.current[index] = element;
  };

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 xl:gap-20">
      <div>
        <div
          ref={register(0)}
          className="lg:min-h-[calc(100svh-var(--story-top))]"
        >
          {hero}
          <p className="sr-only">{stepSummary(copy, 0)}</p>
          <PhaseDiagram copy={copy} step={0} className="mt-10 lg:hidden" />
        </div>

        <section aria-label={copy.storyLabel}>
          {NARRATED_STEPS.map((id, offset) => {
            const index = offset + 1;
            const step = copy.steps[id];
            return (
              <article
                key={id}
                ref={register(index)}
                aria-labelledby={`sdlc-step-${id}`}
                className="border-t border-neutral-70 py-12 lg:min-h-[50svh] lg:border-t-0 lg:py-0 lg:pb-16 lg:last:min-h-[max(36rem,70svh)]"
              >
                <h2
                  id={`sdlc-step-${id}`}
                  className="mb-4 text-balance text-(length:--font-size-h2) leading-10 text-neutral-0"
                >
                  {step.title}
                </h2>
                <p className="max-w-130 text-pretty text-neutral-10">
                  {step.description}
                </p>
                <p className="sr-only">{stepSummary(copy, index)}</p>
                <PhaseDiagram
                  copy={copy}
                  step={index}
                  compact
                  className="mt-10 lg:hidden"
                />
              </article>
            );
          })}
        </section>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-(--story-top)">
          <PhaseDiagram copy={copy} step={active} />
          <div
            aria-hidden="true"
            className="sdlc-progress mt-8 flex items-center gap-4"
          >
            <ol className="flex flex-1 gap-1.5">
              {STEPS.map((id, index) => (
                <li
                  key={id}
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors duration-300",
                    index === active
                      ? "bg-signal-cyan"
                      : index < active
                        ? "bg-neutral-40"
                        : "bg-neutral-70",
                  )}
                />
              ))}
            </ol>
            <span className="text-(length:--font-size-caption) text-neutral-20 tabular-nums">
              {copy.progressLabel
                .replace("{current}", String(active + 1))
                .replace("{total}", String(STEPS.length))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
