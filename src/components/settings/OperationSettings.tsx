import { Link } from "@tanstack/react-router";
import {
  GraduationCap,
  Video,
  Plus,
  Settings2,
} from "lucide-react";
import { StructureCard } from "./shared/StructureCard";

export function OperationSettings() {
  return (
    <div className="space-y-10">
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Regras de Operação</h2>
          <p className="text-sm text-muted-foreground text-balance">
            Parametrize ritos, reuniões e trilhas de capacitação obrigatórias.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <StructureCard
            icon={GraduationCap}
            title="Gestão de Treinamento"
            description="Categorias, instrutores e regras de expiração de certificados."
            count="15 Trilhas ativas"
            status="ok"
          />
          <StructureCard
            icon={Video}
            title="Configuração Reunião+"
            description="Templates de pauta, ritos padrões e integrações de vídeo."
            count="4 Templates"
            status="vazio"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/60 text-secondary-foreground">
          <Settings2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-lg font-semibold text-foreground">
          Automação Operacional
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Configure as regras de notificação e escalonamento para reuniões e treinamentos atrasados.
        </p>
        <button className="mt-8 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Configurar Alertas
        </button>
      </section>
    </div>
  );
}
