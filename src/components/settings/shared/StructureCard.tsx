import { cn } from "@/lib/utils";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface StructureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  count: string;
  status: "ok" | "atencao" | "vazio";
}

export function StructureCard({ icon: Icon, title, description, count, status }: StructureCardProps) {
  const statusMap = {
    ok: { label: "Configurado", cls: "bg-success/10 text-success" },
    atencao: { label: "Precisa revisão", cls: "bg-warning/15 text-warning" },
    vazio: { label: "Não configurado", cls: "bg-muted text-muted-foreground" },
  };
  const s = statusMap[status];

  return (
    <button
      type="button"
      className="group flex w-full flex-col items-start rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-accent/40 hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h4 className="mt-4 text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-3 flex w-full items-center justify-between">
        <span className="text-xs font-medium text-foreground">{count}</span>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", s.cls)}>
          {s.label}
        </span>
      </div>
    </button>
  );
}
