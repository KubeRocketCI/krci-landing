"use client";

import { useRef } from "react";
import { useOffscreenAttribute } from "@/lib/use-offscreen-attribute";

export function PausingFigure(props: React.ComponentProps<"figure">) {
  const ref = useRef<HTMLElement>(null);
  useOffscreenAttribute(ref);
  return <figure ref={ref} {...props} />;
}
