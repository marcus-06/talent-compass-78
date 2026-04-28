import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  badgeTone?: "default" | "warning" | "success";
}

const toneMap = {
  default: "bg-secondary text-secondary-foreground",
  warning: "bg-warning/15 text-warning",
  success: "bg-success/15 text-success",
};

export function QuickAction({
  title,
  description,
  icon: Icon,
  badge,
  badgeTone = "default",
}: QuickActionProps) {
  return (
    <button
      type="button"
      className="group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-accent/40 hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
        {badge && (
          <span
            className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${toneMap[badgeTone]}`}
          >
            {badge}
          </span>
        )}
      </div>
    </button>
  );
}
