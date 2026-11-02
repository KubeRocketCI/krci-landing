import {
  Bot,
  Check,
  GitCommitHorizontal,
  Minus,
  PowerOff,
  Repeat,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TranslationHero } from "@/types/translations";
import { PausingFigure } from "./PausingFigure";

export type Outcome = "ship" | "gates" | "environment";
type NodeState = "passed" | "blocked" | "tornDown" | "skipped";

export interface Change {
  source: "agent" | "developer";
  service: string;
  id: string;
  outcome: Outcome;
  compact: boolean;
}

const CHANGES: Change[] = [
  {
    source: "agent",
    service: "payments-api",
    id: "7f2a",
    outcome: "ship",
    compact: true,
  },
  {
    source: "agent",
    service: "auth-service",
    id: "c91d",
    outcome: "gates",
    compact: true,
  },
  {
    source: "developer",
    service: "web-portal",
    id: "e04b",
    outcome: "ship",
    compact: true,
  },
  {
    source: "agent",
    service: "search-indexer",
    id: "a60c",
    outcome: "environment",
    compact: false,
  },
  {
    source: "agent",
    service: "notifier",
    id: "58d1",
    outcome: "ship",
    compact: true,
  },
];

const STATES: Record<
  Outcome,
  {
    pipeline: NodeState;
    gates: NodeState;
    environment: NodeState;
    merge: NodeState;
    audit: NodeState;
  }
> = {
  ship: {
    pipeline: "passed",
    gates: "passed",
    environment: "passed",
    merge: "passed",
    audit: "passed",
  },
  gates: {
    pipeline: "passed",
    gates: "blocked",
    environment: "skipped",
    merge: "skipped",
    audit: "skipped",
  },
  environment: {
    pipeline: "passed",
    gates: "passed",
    environment: "tornDown",
    merge: "skipped",
    audit: "skipped",
  },
};

const nodeStyles: Record<NodeState, string> = {
  passed: "border-neutral-40 text-neutral-0",
  blocked: "border-error text-error-text",
  tornDown: "border-neutral-40 text-neutral-20",
  skipped: "border-dashed border-neutral-70 text-neutral-40",
};

const ROW_COLUMNS =
  "grid-cols-[7.5rem_repeat(3,minmax(0,1fr))] sm:grid-cols-[10rem_repeat(5,minmax(0,1fr))]";

function isShipped(change: Change) {
  return STATES[change.outcome].audit === "passed";
}

function lastShippedIndex(changes: Change[]) {
  for (let index = changes.length - 1; index >= 0; index--) {
    if (isShipped(changes[index])) return index;
  }
  return -1;
}

function NodeIcon({ state }: { state: NodeState }) {
  const className = "size-4 sm:size-5";
  if (state === "passed") return <Check className={className} aria-hidden />;
  if (state === "skipped") return <Minus className={className} aria-hidden />;
  if (state === "tornDown")
    return <PowerOff className={className} aria-hidden />;
  return <X className={className} aria-hidden />;
}

interface NodeProps {
  state: NodeState;
  label: string;
  statusText: string;
  className?: string;
  gate?: boolean;
}

function Node({ state, label, statusText, className, gate }: NodeProps) {
  return (
    <div className={cn("relative z-10 flex justify-center", className)}>
      <span
        className={cn(
          "grid size-7 place-items-center rounded-[4px] border bg-background sm:size-9",
          nodeStyles[state],
          gate && state === "passed" && "path-gate",
        )}
      >
        <NodeIcon state={state} />
        <span className="sr-only">
          {label}: {statusText}
        </span>
      </span>
    </div>
  );
}

function StageHeader({
  short,
  full,
  className,
}: {
  short: string;
  full: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-center text-(length:--font-size-caption) leading-snug text-neutral-20 sm:text-(length:--font-size-body-2)",
        className,
      )}
    >
      <span className="xl:hidden">{short}</span>
      <span className="hidden xl:inline">{full}</span>
    </span>
  );
}

export function PathDiagram({
  visual,
  changes = CHANGES,
}: {
  visual: TranslationHero["visual"];
  changes?: Change[];
}) {
  const { stages, status } = visual;
  const short = visual.stagesShort;
  const statusText: Record<NodeState, string> = {
    passed: status.passed,
    blocked: status.blocked,
    tornDown: status.tornDown,
    skipped: status.skipped,
  };
  // Commit loop attaches to the last shipped row.
  const feedbackIndex = lastShippedIndex(changes);

  return (
    <PausingFigure aria-label={visual.label} className="w-full">
      <div aria-hidden className={cn("mb-3 grid sm:mb-4", ROW_COLUMNS)}>
        <span />
        <StageHeader short={short.pipeline} full={stages.pipeline} />
        <StageHeader short={short.gates} full={stages.gates} />
        <StageHeader
          short={short.environment}
          full={stages.environment}
          className="hidden sm:block"
        />
        <StageHeader
          short={short.merge}
          full={stages.merge}
          className="hidden sm:block"
        />
        <StageHeader short={short.audit} full={stages.audit} />
      </div>

      <ul className="space-y-4 sm:space-y-5">
        {changes.map((change, index) => {
          const state = STATES[change.outcome];
          const shipped = isShipped(change);
          const showLoop = !shipped || index === feedbackIndex;

          return (
            <li
              key={change.id}
              data-end={change.outcome}
              style={{ "--i": index } as React.CSSProperties}
              className={cn(
                "path-row relative grid h-8 items-center sm:h-11",
                ROW_COLUMNS,
                !change.compact && "hidden sm:grid",
              )}
            >
              <span className="col-start-1 row-start-1 flex items-center gap-2 font-mono text-(length:--font-size-caption) text-neutral-0 sm:text-(length:--font-size-body-2)">
                {change.source === "agent" ? (
                  <Bot
                    className="size-4 shrink-0 text-neutral-20"
                    aria-hidden
                  />
                ) : (
                  <User
                    className="size-4 shrink-0 text-neutral-20"
                    aria-hidden
                  />
                )}
                <span className="truncate">{change.service}</span>
              </span>

              <span
                aria-hidden
                className="path-track relative col-start-2 -col-end-1 row-start-1 h-px bg-neutral-70"
              >
                <span className="path-lit" />
                <span className="path-packet" />
                {showLoop ? (
                  <span
                    className={cn(
                      "path-loop absolute top-3.5 h-2.5 rounded-b-md sm:top-[18px] sm:h-3 border border-t-0 border-dashed",
                      shipped ? "border-signal-cyan/60" : "border-error/70",
                    )}
                  >
                    <Repeat
                      className={cn(
                        "absolute -bottom-[7px] left-1/2 size-3.5 -translate-x-1/2 bg-background sm:-bottom-2 sm:size-4",
                        shipped ? "text-signal-cyan" : "text-error-text",
                      )}
                      aria-hidden
                    />
                    <span className="loop-packet" />
                  </span>
                ) : null}
              </span>

              <Node
                className="col-start-2 row-start-1"
                state={state.pipeline}
                label={`${visual.sources[change.source]} ${change.service} ${stages.pipeline}`}
                statusText={statusText[state.pipeline]}
              />
              <Node
                className="col-start-3 row-start-1"
                state={state.gates}
                label={`${visual.sources[change.source]} ${change.service} ${stages.gates}`}
                statusText={statusText[state.gates]}
                gate
              />
              <Node
                className="col-start-4 row-start-1 hidden sm:flex"
                state={state.environment}
                label={`${visual.sources[change.source]} ${change.service} ${stages.environment}`}
                statusText={statusText[state.environment]}
              />
              <Node
                className="col-start-5 row-start-1 hidden sm:flex"
                state={state.merge}
                label={`${visual.sources[change.source]} ${change.service} ${stages.merge}`}
                statusText={statusText[state.merge]}
              />

              <div className="relative z-10 col-start-4 row-start-1 flex justify-center sm:col-start-6">
                {shipped ? (
                  <span className="inline-flex h-7 items-center gap-1 rounded-[4px] border border-signal-cyan bg-background px-1.5 font-mono text-(length:--font-size-caption) text-neutral-0 sm:h-9 sm:gap-1.5 sm:px-2 sm:text-(length:--font-size-body-2)">
                    <GitCommitHorizontal
                      className="size-4 sm:size-5"
                      aria-hidden
                    />
                    {change.id}
                    <span className="sr-only">
                      {visual.sources[change.source]} {change.service}{" "}
                      {stages.audit}: {status.committed}
                    </span>
                  </span>
                ) : (
                  <span className="grid size-7 place-items-center rounded-[4px] border border-dashed border-neutral-70 bg-background text-neutral-40 sm:size-9">
                    <Minus className="size-4 sm:size-5" aria-hidden />
                    <span className="sr-only">
                      {visual.sources[change.source]} {change.service}{" "}
                      {stages.audit}: {status.skipped}
                    </span>
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p
        aria-hidden
        className="mt-6 flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-(length:--font-size-caption) text-neutral-20"
      >
        <span className="inline-flex items-center gap-1.5">
          <Bot className="size-4" />
          {visual.legend.agent}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <User className="size-4" />
          {visual.legend.developer}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <X className="size-4 text-error-text" />
          {visual.legend.blocked}
        </span>
        <span className="hidden items-center gap-1.5 sm:inline-flex">
          <PowerOff className="size-4" />
          {visual.legend.tornDown}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Repeat className="size-4" />
          {visual.legend.loop}
        </span>
      </p>
    </PausingFigure>
  );
}
