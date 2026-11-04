"use client";

import {
  Activity,
  Bot,
  Boxes,
  Check,
  ChevronsRight,
  ClipboardList,
  Eye,
  FlaskConical,
  Gauge,
  GitBranch,
  GitCommitHorizontal,
  Hammer,
  KeyRound,
  LayoutTemplate,
  type LucideIcon,
  PenTool,
  Repeat,
  Rocket,
  Route,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Webhook,
  Workflow,
  X,
} from "lucide-react";
import { type CSSProperties, useRef } from "react";
import { useOffscreenAttribute } from "@/lib/use-offscreen-attribute";
import { cn } from "@/lib/utils";
import type {
  AiSdlcChipId,
  AiSdlcLayerId,
  AiSdlcNarratedStepId,
  AiSdlcPhaseId,
  AiSdlcStepId,
  TranslationAiSdlc,
} from "@/types/translations";

export const NARRATED_STEPS: AiSdlcNarratedStepId[] = [
  "plan",
  "design",
  "build",
  "test",
  "review",
  "deploy",
  "operate",
  "own",
];

export const STEPS: AiSdlcStepId[] = ["overview", ...NARRATED_STEPS];

const PHASES: {
  id: AiSdlcPhaseId;
  Icon: LucideIcon;
  sx: string;
  sy: string;
  sr: string;
}[] = [
  { id: "plan", Icon: ClipboardList, sx: "-40%", sy: "-120%", sr: "-10deg" },
  { id: "design", Icon: PenTool, sx: "30%", sy: "110%", sr: "8deg" },
  { id: "build", Icon: Hammer, sx: "-20%", sy: "-150%", sr: "12deg" },
  { id: "test", Icon: FlaskConical, sx: "10%", sy: "130%", sr: "-7deg" },
  { id: "review", Icon: Eye, sx: "-30%", sy: "-110%", sr: "9deg" },
  { id: "deploy", Icon: Rocket, sx: "25%", sy: "140%", sr: "-12deg" },
  { id: "operate", Icon: Gauge, sx: "40%", sy: "-130%", sr: "6deg" },
];

const LAYERS: { id: AiSdlcLayerId; Icon: LucideIcon }[] = [
  { id: "agents", Icon: Bot },
  { id: "skills", Icon: Sparkles },
  { id: "workflows", Icon: Workflow },
];

const CHIPS: { id: AiSdlcChipId; Icon: LucideIcon }[] = [
  { id: "git", Icon: GitBranch },
  { id: "templates", Icon: LayoutTemplate },
  { id: "webhooks", Icon: Webhook },
  { id: "pipelines", Icon: ChevronsRight },
  { id: "cli", Icon: SquareTerminal },
  { id: "environments", Icon: Boxes },
  { id: "gates", Icon: ShieldCheck },
  { id: "security", Icon: ScanSearch },
  { id: "flows", Icon: Route },
  { id: "gitops", Icon: GitCommitHorizontal },
  { id: "rbac", Icon: KeyRound },
  { id: "observability", Icon: Activity },
];

export const LIT: Record<AiSdlcPhaseId, AiSdlcChipId[]> = {
  plan: ["git", "cli"],
  design: ["templates", "environments", "git"],
  build: ["git", "webhooks", "pipelines", "cli"],
  test: ["environments", "gates", "gitops"],
  review: ["pipelines", "gates", "security", "rbac", "gitops"],
  deploy: ["flows", "gitops", "gates", "rbac"],
  operate: ["observability", "gitops", "cli"],
};

const BUILD_INDEX = PHASES.findIndex((phase) => phase.id === "build");
const COMMIT_HASH = "7f2a";

const PIECE_W = 100;
const PIECE_H = 62;
const KNOB = 13;
const KNOB_NECK = 6;
const KNOB_HEAD = 14;

type Edge = "flat" | "tab" | "blank";

// Knob is symmetric: a shared edge matches when traversed in reverse.
function edge(
  [x, y]: [number, number],
  [dx, dy]: [number, number],
  length: number,
  kind: Edge,
) {
  const end = `L${x + dx * length} ${y + dy * length}`;
  if (kind === "flat") return end;
  const k = kind === "tab" ? KNOB : -KNOB;
  const [nx, ny] = [dy, -dx];
  const mid = length / 2;
  const at = (u: number, v: number) =>
    `${(x + dx * (mid + u) + nx * v).toFixed(2)} ${(y + dy * (mid + u) + ny * v).toFixed(2)}`;
  return [
    `L${at(-KNOB_NECK, 0)}`,
    `C${at(-KNOB_NECK * 0.4, 0.35 * k)} ${at(-KNOB_HEAD, k)} ${at(0, k)}`,
    `C${at(KNOB_HEAD, k)} ${at(KNOB_NECK * 0.4, 0.35 * k)} ${at(KNOB_NECK, 0)}`,
    end,
  ].join(" ");
}

function piecePath(index: number, count: number) {
  const right: Edge =
    index === count - 1 ? "flat" : index % 2 === 0 ? "tab" : "blank";
  const left: Edge = index === 0 ? "flat" : index % 2 === 1 ? "blank" : "tab";
  return [
    "M0 0",
    edge([0, 0], [1, 0], PIECE_W, "flat"),
    edge([PIECE_W, 0], [0, 1], PIECE_H, right),
    edge([PIECE_W, PIECE_H], [-1, 0], PIECE_W, "flat"),
    edge([0, PIECE_H], [0, -1], PIECE_H, left),
    "Z",
  ].join(" ");
}

function vars(values: Record<string, string | number>) {
  return values as CSSProperties;
}

const CAPTION = "text-(length:--font-size-caption) leading-snug";

function PhaseLabel({ Icon, name }: { Icon: LucideIcon; name: string }) {
  return (
    <span className="sdlc-phase-label relative flex flex-col items-center gap-1">
      <Icon className="size-4 sm:size-5" />
      <span className="hidden text-(length:--font-size-caption) sm:block xl:text-(length:--font-size-body-2)">
        {name}
      </span>
    </span>
  );
}

function Moment({ stepId, at }: { stepId: AiSdlcStepId; at: number }) {
  if (stepId === "test" || stepId === "review") {
    const back = at - BUILD_INDEX;
    return (
      <div
        key={stepId}
        className="sdlc-moment"
        data-moment="gate"
        style={vars({
          "--at": at,
          "--from": BUILD_INDEX + 0.5,
          "--span": back,
        })}
      >
        <span className="sdlc-track">
          <span className="sdlc-lit" />
          <span className="sdlc-packet" />
        </span>
        <span className="sdlc-return">
          <Repeat className="sdlc-return-icon size-3.5 sm:size-4" />
          <span className="sdlc-return-packet" />
        </span>
        <span className="sdlc-badge">
          <X className="sdlc-badge-x size-3.5" />
          <Check className="sdlc-badge-check size-3.5" />
        </span>
      </div>
    );
  }
  if (stepId === "deploy") {
    return (
      <div
        key={stepId}
        className="sdlc-moment"
        data-moment="commit"
        style={vars({ "--at": at, "--from": at - 0.5, "--span": 1 })}
      >
        <span className="sdlc-track">
          <span className="sdlc-lit" />
          <span className="sdlc-packet" />
        </span>
        <span className="sdlc-stem" />
        <span className="sdlc-commit -translate-x-1/2 -translate-y-full inline-flex h-6 items-center gap-1 rounded-[4px] border border-signal-cyan bg-background px-1.5 font-mono text-(length:--font-size-caption) text-neutral-0">
          <GitCommitHorizontal className="size-3.5" />
          {COMMIT_HASH}
        </span>
      </div>
    );
  }
  if (stepId === "own") {
    return (
      <div key={stepId} className="sdlc-moment" data-moment="own">
        <span className="sdlc-rail" />
      </div>
    );
  }
  return null;
}

// Hidden marker parks at the nearest phase: Plan before the story, Operate after it.
function markerPosition(activePhase: number, own: boolean) {
  if (activePhase !== -1) return activePhase;
  return own ? PHASES.length - 1 : 0;
}

export function PhaseDiagram({
  copy,
  step,
  compact = false,
  className,
}: {
  copy: TranslationAiSdlc;
  step: number;
  // Only the chips this step lights, for the copy that follows each step on small screens.
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useOffscreenAttribute(ref, "0px 0px -20% 0px");

  const stepId = STEPS[step];
  const activePhase = PHASES.findIndex((phase) => phase.id === stepId);
  const lit = activePhase === -1 ? [] : LIT[PHASES[activePhase].id];
  const own = stepId === "own";
  const lines = copy.steps[stepId];
  const { diagram } = copy;
  const chips =
    compact && !own ? CHIPS.filter((chip) => lit.includes(chip.id)) : CHIPS;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-step={stepId}
      data-offscreen=""
      className={cn("sdlc-diagram w-full", className)}
    >
      <div className="relative">
        <ol className="relative grid grid-cols-7">
          {PHASES.map((phase, index) => {
            const state =
              activePhase === -1
                ? own
                  ? "done"
                  : "idle"
                : index === activePhase
                  ? "active"
                  : index < activePhase
                    ? "done"
                    : "idle";
            return (
              <li
                key={phase.id}
                data-state={state}
                data-slot={index === BUILD_INDEX || undefined}
                className="sdlc-phase relative grid aspect-[100/62] place-items-center"
                style={vars({
                  "--n": index,
                  "--sx": phase.sx,
                  "--sy": phase.sy,
                  "--sr": phase.sr,
                  zIndex: state === "active" ? 2 : 1,
                })}
              >
                <svg
                  viewBox={`0 0 ${PIECE_W} ${PIECE_H}`}
                  className="absolute inset-0 size-full overflow-visible"
                  aria-hidden="true"
                >
                  <path
                    d={piecePath(index, PHASES.length)}
                    className="sdlc-phase-shape"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <PhaseLabel Icon={phase.Icon} name={copy.phases[phase.id]} />
                {own && index === BUILD_INDEX ? (
                  <span className="sdlc-yours absolute inset-0 grid place-items-center">
                    <svg
                      viewBox={`0 0 ${PIECE_W} ${PIECE_H}`}
                      className="absolute inset-0 size-full overflow-visible"
                      aria-hidden="true"
                    >
                      <path
                        d={piecePath(index, PHASES.length)}
                        className="sdlc-yours-shape"
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <PhaseLabel
                      Icon={phase.Icon}
                      name={copy.phases[phase.id]}
                    />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
        <span
          className="sdlc-marker absolute -bottom-2 left-0 h-0.5 w-[calc(100%/7)] rounded-full bg-signal-cyan"
          style={vars({ "--p": markerPosition(activePhase, own) })}
          data-visible={activePhase !== -1}
        />
        <Moment stepId={stepId} at={activePhase} />
      </div>

      <div className="relative mt-4 h-8">
        <span
          className="sdlc-loop absolute top-0 right-[calc(100%/14)] left-[calc(100%/14)] h-4 rounded-b-md border border-t-0 border-dashed"
          data-lit={stepId === "operate" || own}
        >
          {stepId === "operate" ? <span className="sdlc-loop-packet" /> : null}
        </span>
        <span
          className={cn(
            "sdlc-loop-label absolute top-2 left-1/2 -translate-x-1/2 bg-background px-2 whitespace-nowrap",
            CAPTION,
          )}
          data-lit={stepId === "operate" || own}
        >
          {diagram.loop}
        </span>
      </div>

      <p className="mt-2 text-center text-(length:--font-size-body-2) text-neutral-0 sm:hidden">
        {activePhase === -1 ? " " : copy.phases[PHASES[activePhase].id]}
      </p>

      <section className="mt-4 border-t border-neutral-70 pt-4">
        <p
          className={cn("sdlc-ai-label mb-3 text-neutral-20", CAPTION)}
          data-lit={own}
        >
          {diagram.aiLayer}
        </p>
        <dl className="space-y-2">
          {LAYERS.map(({ id, Icon }) => (
            <div
              key={id}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
            >
              <dt className="flex items-center gap-2 text-(length:--font-size-body-2) leading-5 text-neutral-10">
                <Icon className="size-4 shrink-0 text-signal-cyan" />
                {diagram.layers[id]}
              </dt>
              <dd
                key={`${stepId}-${id}`}
                className="sdlc-ai-line text-(length:--font-size-body-2) leading-5 text-neutral-0"
              >
                {lines[id]}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-5 border-t border-neutral-70 pt-4">
        <p className={cn("mb-3 text-neutral-20", CAPTION)}>
          {diagram.platform}
        </p>
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
          {chips.map(({ id, Icon }, index) => (
            <li
              key={id}
              data-state={lit.includes(id) ? "lit" : own ? "open" : "idle"}
              className="sdlc-chip flex min-h-9 items-center gap-1.5 rounded-[4px] border px-2 py-1.5 text-(length:--font-size-caption) leading-tight sm:min-h-10 sm:gap-2 sm:text-(length:--font-size-body-2) lg:text-(length:--font-size-caption) xl:text-(length:--font-size-body-2)"
              style={vars({ "--n": index })}
            >
              <Icon className="sdlc-chip-icon size-3.5 shrink-0 sm:size-4" />
              <span className="min-w-0">{diagram.chips[id]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
