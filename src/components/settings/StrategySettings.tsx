import { Link } from "@tanstack/react-router";
import {
  Target,
  BarChart3,
  DollarSign,
  Plus,
  Settings2,
} from "lucide-react";
import { StructureCard } from "./shared/StructureCard";

export function StrategySettings() {
  return (
    <div className="space-y-10">
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Parametrização Estratégica</h2>
          <p className="text-sm text-muted-foreground text-balance">
            Configure as regras de negócio para OKRs, Metas Financeiras e Remuneração.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <StructureCard
            icon={Target}
            title="Metas e OKR"
            description="Períodos de ciclo, pesos de KRs e regras de desdobramento."
            count="Ciclos Trimestrais"
            status="ok"
          />
          <StructureCard
            icon={BarChart3}
            title="Indicadores Financeiros"
            description="Fontes de dados, fórmulas de margem e EBITDA."
            count="12 KPIs ativos"
            status="atencao"
          />
          <StructureCard
            icon={DollarSign}
            title="Remuneração Variável"
            description="Grades de bônus, aceleradores e travas de pagamento."
            count="Regra 2025 v1"
            status="ok"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/60 text-secondary-foreground">
          <Settings2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-lg font-semibold text-foreground">
          Configurações Avançadas de Estratégia
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Módulo de sincronização de dados externos em fase de configuração. 
          As alterações aqui impactam o cálculo de performance corporativa.
        </p>
        <button className="mt-8 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Sync com ERP/BI
        </button>
      </section>
    </div>
  );
}
