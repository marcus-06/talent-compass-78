import { Check, Circle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "done" | "current" | "upcoming" | "blocked";

export interface Step {
  id: string;
  label: string;
  status: StepStatus;
  progress?: number;
}

interface CycleStepperProps {
  steps: Step[];
}

export function CycleStepper({ steps }: CycleStepperProps) {
  return (
    <ol className="flex w-full items-start gap-2 overflow-x-auto pb-2">
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        return (
          <li key={step.id} className="flex min-w-[140px] flex-1 items-start gap-2">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  step.status === "done" &&
                    "border-success bg-success text-success-foreground",
                  step.status === "current" &&
                    "border-accent bg-accent text-accent-foreground ring-4 ring-accent/15",
                  step.status === "upcoming" &&
                    "border-border bg-card text-muted-foreground",
                  step.status === "blocked" &&
                    "border-destructive bg-destructive/10 text-destructive",
                )}
              >
                {step.status === "done" ? (
                  <Check className="h-4 w-4" />
                ) : step.status === "blocked" ? (
                  <Lock className="h-4 w-4" />
                ) : step.status === "current" ? (
                  <span>{idx + 1}</span>
                ) : (
                  <Circle className="h-3 w-3" />
                )}
              </div>
              <div className="mt-2 max-w-[120px] text-center">
                <p
                  className={cn(
                    "text-xs font-medium leading-tight",
                    step.status === "current" ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </p>
                {step.status === "current" && typeof step.progress === "number" && (
                  <p className="mt-0.5 text-[10px] font-semibold text-accent">
                    {step.progress}%
                  </p>
                )}
              </div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mt-4 h-[2px] flex-1 rounded",
                  step.status === "done" ? "bg-success" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
