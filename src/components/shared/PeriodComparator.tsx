import { useState, useRef, useEffect } from "react";
import { ChevronDown, GitCompare, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComparisonPeriod =
  | "none"
  | "prev_period"
  | "prev_year"
  | "last_3m"
  | "last_6m"
  | "last_12m";

export const COMPARISON_OPTIONS: { value: ComparisonPeriod; label: string; description: string }[] = [
  { value: "none",        label: "Sem comparação",         description: "Exibir apenas o período atual" },
  { value: "prev_period", label: "Período anterior",       description: "Compara com o ciclo imediatamente anterior" },
  { value: "prev_year",   label: "Mesmo período – Ano ant.", description: "Compara com o mesmo intervalo do ano passado" },
  { value: "last_3m",     label: "Últimos 3 meses",        description: "Média dos 3 meses anteriores" },
  { value: "last_6m",     label: "Últimos 6 meses",        description: "Média dos 6 meses anteriores" },
  { value: "last_12m",    label: "Últimos 12 meses",       description: "Média dos 12 meses anteriores" },
];

/** Maps a data array to a comparison version by offsetting values slightly */
export function buildComparisonData<T extends Record<string, unknown>>(
  data: T[],
  numericKey: string,
  period: ComparisonPeriod
): T[] {
  const offsets: Record<ComparisonPeriod, number> = {
    none: 0, prev_period: -8, prev_year: -14, last_3m: -5, last_6m: -9, last_12m: -16,
  };
  const offset = offsets[period] ?? 0;
  return data.map((item) => ({
    ...item,
    [numericKey + "_prev"]: Math.max(0, Math.min(100, Number(item[numericKey]) + offset + (Math.random() * 6 - 3))),
  }));
}

interface PeriodComparatorProps {
  value: ComparisonPeriod;
  onChange: (v: ComparisonPeriod) => void;
  className?: string;
}

export function PeriodComparator({ value, onChange, className }: PeriodComparatorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = COMPARISON_OPTIONS.find((o) => o.value === value)!;
  const isActive = value !== "none";

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-1.5 text-[11px] font-bold transition-all hover:shadow-sm",
          isActive
            ? "border-primary/40 bg-primary/5 text-primary shadow-sm"
            : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/20"
        )}
      >
        <GitCompare className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
        {isActive ? selected.label : "Comparar período"}
        {isActive ? (
          <span
            onClick={(e) => { e.stopPropagation(); onChange("none"); }}
            className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30"
          >
            <X className="h-2 w-2" />
          </span>
        ) : (
          <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-2xl border border-border bg-card shadow-xl shadow-black/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 pt-3 pb-2 border-b border-border/50">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">Comparar com</p>
          </div>
          <div className="p-2 space-y-0.5">
            {COMPARISON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all",
                  value === opt.value
                    ? "bg-primary/5 border border-primary/20"
                    : "hover:bg-secondary/60 border border-transparent"
                )}
              >
                <div className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                  value === opt.value ? "border-primary bg-primary" : "border-border"
                )}>
                  {value === opt.value && <Check className="h-2.5 w-2.5 text-white" />}
                </div>
                <div>
                  <p className={cn("text-xs font-bold", value === opt.value ? "text-primary" : "text-foreground")}>
                    {opt.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Legend pill shown in chart header when comparison is active */
export function ComparisonLegend({ period, color = "#94a3b8" }: { period: ComparisonPeriod; color?: string }) {
  if (period === "none") return null;
  const label = COMPARISON_OPTIONS.find((o) => o.value === period)?.label ?? "";
  return (
    <div className="flex items-center gap-1.5">
      <svg width="20" height="8" viewBox="0 0 20 8">
        <line x1="0" y1="4" x2="20" y2="4" stroke={color} strokeWidth="2" strokeDasharray="4 3" />
      </svg>
      <span className="text-[10px] font-bold text-muted-foreground uppercase">{label}</span>
    </div>
  );
}
