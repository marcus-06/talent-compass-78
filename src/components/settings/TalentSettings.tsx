import { Link } from "@tanstack/react-router";
import {
  Users,
  ListChecks,
  FileText,
  Calculator,
  Plus,
  Copy,
  Pencil,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StructureCard } from "./shared/StructureCard";

type CycleStatus = "vigente" | "rascunho" | "planejamento" | "concluido" | "arquivado";

interface CycleRow {
  id: string;
  name: string;
  period: string;
  participants: number;
  status: CycleStatus;
  updatedAt: string;
}

const cycles: CycleRow[] = [
  {
    id: "2025-1",
    name: "Avaliação de Competências · 2025.1",
    period: "03 mar – 30 jun 2025",
    participants: 1248,
    status: "vigente",
    updatedAt: "Atualizado há 2 h",
  },
  {
    id: "2025-2",
    name: "Avaliação de Competências · 2025.2",
    period: "ago – dez 2025",
    participants: 1300,
    status: "planejamento",
    updatedAt: "Editado ontem",
  },
  {
    id: "trainee-2025",
    name: "Ciclo Trainee 2025",
    period: "a definir",
    participants: 42,
    status: "rascunho",
    updatedAt: "Criado há 3 dias",
  },
  {
    id: "2024-2",
    name: "Avaliação 360 · 2024.2",
    period: "set – dez 2024",
    participants: 1180,
    status: "concluido",
    updatedAt: "Encerrado em jan 2025",
  },
];

const statusMap: Record<CycleStatus, { label: string; cls: string }> = {
  vigente: { label: "Vigente", cls: "bg-success/10 text-success border border-success/20" },
  planejamento: { label: "Em planejamento", cls: "bg-info/10 text-info border border-info/20" },
  rascunho: { label: "Rascunho", cls: "bg-muted text-muted-foreground border border-border" },
  concluido: { label: "Concluído", cls: "bg-secondary text-secondary-foreground border border-border" },
  arquivado: { label: "Arquivado", cls: "bg-muted text-muted-foreground border border-border" },
};

export function TalentSettings() {
  return (
    <div className="space-y-10">
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Estrutura do Módulo de Talentos</h2>
          <p className="text-sm text-muted-foreground text-balance">
            Componentes reutilizáveis por todos os ciclos. Configure uma vez, use sempre.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <StructureCard
            icon={Users}
            title="Tipos de Avaliador"
            description="Quem avalia quem (autoavaliação, gestor, par, subordinado)."
            count="5 tipos ativos"
            status="ok"
          />
          <StructureCard
            icon={ListChecks}
            title="Competências"
            description="Biblioteca de competências e comportamentos esperados."
            count="42 competências"
            status="ok"
          />
          <StructureCard
            icon={FileText}
            title="Formulários"
            description="Modelos de questionário e escalas de resposta."
            count="3 formulários"
            status="atencao"
          />
          <StructureCard
            icon={Calculator}
            title="Método de cálculo"
            description="Pesos por avaliador e regras de nota final."
            count="Padrão ponderado"
            status="ok"
          />
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Gestão de Ciclos</h2>
            <p className="text-sm text-muted-foreground">
              Crie, edite e defina o ciclo vigente. Apenas um ciclo pode estar vigente por vez.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
              <Plus className="h-3.5 w-3.5" /> Novo Ciclo
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface-sunken text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Ciclo</th>
                <th className="px-4 py-3 text-left font-medium">Período</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((c) => {
                const s = statusMap[c.status];
                return (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                    <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.period}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium", s.cls)}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
