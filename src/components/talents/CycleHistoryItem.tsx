import { CalendarDays, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CycleStatus = "concluido" | "planejamento" | "rascunho";

interface CycleHistoryItemProps {
  name: string;
  period: string;
  participants: number;
  status: CycleStatus;
}

const statusMap: Record<CycleStatus, { label: string; cls: string }> = {
  concluido: { label: "Concluído", cls: "bg-success/10 text-success" },
  planejamento: { label: "Em planejamento", cls: "bg-info/10 text-info" },
  rascunho: { label: "Rascunho", cls: "bg-muted text-muted-foreground" },
};

export function CycleHistoryItem({ name, period, participants, status }: CycleHistoryItemProps) {
  const s = statusMap[status];
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-secondary"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {period} · {participants} participantes
        </p>
      </div>
      <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", s.cls)}>
        {s.label}
      </span>
      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
