import { AlertTriangle, ChevronRight } from "lucide-react";

interface BottleneckItemProps {
  title: string;
  detail: string;
  count: number;
  severity: "high" | "medium" | "low";
}

const severityMap = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/15 text-warning border-warning/20",
  low: "bg-muted text-muted-foreground border-border",
};

export function BottleneckItem({ title, detail, count, severity }: BottleneckItemProps) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-secondary"
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${severityMap[severity]}`}
      >
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{detail}</p>
      </div>
      <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-foreground">
        {count}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
