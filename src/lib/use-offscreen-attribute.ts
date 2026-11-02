"use client";

import { type RefObject, useEffect } from "react";

export function useOffscreenAttribute(
  ref: RefObject<HTMLElement | null>,
  rootMargin = "0px",
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const latest = entries.at(-1);
        if (latest) {
          element.toggleAttribute("data-offscreen", !latest.isIntersecting);
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
}
