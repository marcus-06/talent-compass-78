import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  Info,
  Workflow,
  ClipboardList,
  Shield,
  Save,
  Eye,
  CheckCircle2,
  GripVertical,
  Plus,
  Trash2,
  Users,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/talents/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/configuracoes/ciclo/$cycleId")({
  component: CycleConfig,
  head: ({ params }) => ({
    meta: [
      { title: `Configurar ciclo ${params.cycleId} · Talent OS` },
      {
        name: "description",
        content:
          "Configure informações gerais, fluxo de etapas, avaliação e regras do ciclo de competências.",
      },
    ],
  }),
});

type Tab = "geral" | "fluxo" | "avaliacao" | "regras";

const tabs: { id: Tab; label: string; icon: typeof Info; hint: string }[] = [
  { id: "geral", label: "Informações gerais", icon: Info, hint: "Nome, período e escopo" },
  { id: "fluxo", label: "Estrutura do fluxo", icon: Workflow, hint: "Etapas e prazos" },
  { id: "avaliacao", label: "Configuração da avaliação", icon: ClipboardList, hint: "Avaliadores e formulário" },
  { id: "regras", label: "Regras do ciclo", icon: Shield, hint: "Visibilidade e calibragem" },
];

function CycleConfig() {
  const { cycleId } = Route.useParams();
  const [tab, setTab] = useState<Tab>("geral");

  return (
    <AppShell mode="config">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Breadcrumb + header */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/configuracoes" className="hover:text-foreground">
            Configurações
          </Link>
          <span>/</span>
          <span className="text-foreground">Ciclo {cycleId}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              to="/configuracoes"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Voltar para ciclos
            </Link>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Avaliação de Competências · {cycleId}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full border border-info/20 bg-info/10 px-2 py-0.5 font-medium text-info">
                Em planejamento
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> 03 mar – 30 jun 2025
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3" /> 1.248 participantes
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
              <Eye className="h-3.5 w-3.5" /> Pré-visualizar
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
              <Save className="h-3.5 w-3.5" /> Salvar rascunho
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-success px-3 py-2 text-xs font-semibold text-success-foreground hover:opacity-90">
              <CheckCircle2 className="h-3.5 w-3.5" /> Tornar vigente
            </button>
          </div>
        </div>

        {/* Layout: tabs verticais + conteúdo */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Tabs verticais */}
          <aside>
            <nav className="space-y-1 rounded-xl border border-border bg-card p-2">
              {tabs.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                        active ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground",
                      )}
                    >
                      <t.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-tight">{t.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{t.hint}</p>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 rounded-xl border border-warning/20 bg-warning/5 p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <p className="text-sm font-medium text-foreground">Ciclo não vigente</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Alterações não impactam ciclos em execução. Torne vigente apenas quando estiver pronto.
              </p>
            </div>
          </aside>

          {/* Conteúdo */}
          <section className="rounded-xl border border-border bg-card p-6">
            {tab === "geral" && <GeneralTab />}
            {tab === "fluxo" && <FlowTab />}
            {tab === "avaliacao" && <EvaluationTab />}
            {tab === "regras" && <RulesTab />}
          </section>
        </div>
      </main>
    </AppShell>
  );
}

/* ---------- TAB CONTENTS ---------- */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-5 border-b border-border pb-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function GeneralTab() {
  return (
    <div>
      <SectionHeader
        title="Informações gerais"
        description="Identificação básica do ciclo. Estes dados aparecem no dashboard e nos comunicados."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nome do ciclo">
          <input className={inputCls} defaultValue="Avaliação de Competências · 2025.1" />
        </Field>
        <Field label="Identificador interno" hint="Usado em integrações e relatórios.">
          <input className={inputCls} defaultValue="aval-comp-2025-1" />
        </Field>
        <Field label="Data de início">
          <input type="date" className={inputCls} defaultValue="2025-03-03" />
        </Field>
        <Field label="Data de encerramento">
          <input type="date" className={inputCls} defaultValue="2025-06-30" />
        </Field>
        <Field label="Escopo" hint="Quem participa do ciclo.">
          <select className={inputCls} defaultValue="todos">
            <option value="todos">Toda a empresa</option>
            <option value="areas">Áreas selecionadas</option>
            <option value="trilha">Trilha de carreira</option>
          </select>
        </Field>
        <Field label="Responsável">
          <select className={inputCls}>
            <option>Marina Ribeiro · Head de RH</option>
            <option>Equipe de Talent Management</option>
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field label="Descrição">
            <textarea
              rows={3}
              className={inputCls}
              defaultValue="Ciclo semestral de avaliação de competências técnicas e comportamentais."
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

const flowSteps = [
  { name: "Planejamento", days: 7, owner: "RH", required: true },
  { name: "Avaliação", days: 21, owner: "Colaborador + Gestor", required: true },
  { name: "Pré-Calibragem", days: 10, owner: "Gestor", required: true },
  { name: "Calibragem", days: 7, owner: "Comitê", required: true },
  { name: "Feedback", days: 14, owner: "Gestor", required: true },
  { name: "Resultado & PDI", days: 21, owner: "Colaborador + Gestor", required: false },
];

function FlowTab() {
  return (
    <div>
      <SectionHeader
        title="Estrutura do fluxo"
        description="Defina quais etapas existem, em que ordem ocorrem e quem é responsável por cada uma."
      />
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{flowSteps.length} etapas configuradas</p>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
          <Plus className="h-3.5 w-3.5" /> Adicionar etapa
        </button>
      </div>
      <ol className="space-y-2">
        {flowSteps.map((s, i) => (
          <li
            key={s.name}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface-sunken px-3 py-2.5"
          >
            <button className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-card">
              <GripVertical className="h-4 w-4" />
            </button>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">Responsável: {s.owner}</p>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-xs text-muted-foreground">Duração</span>
              <input
                type="number"
                defaultValue={s.days}
                className="w-16 rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground"
              />
              <span className="text-xs text-muted-foreground">dias</span>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium",
                s.required
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {s.required ? "Obrigatória" : "Opcional"}
            </span>
            <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EvaluationTab() {
  return (
    <div>
      <SectionHeader
        title="Configuração da avaliação"
        description="Defina quem avalia quem, qual formulário será usado e como as notas são consolidadas."
      />

      <h3 className="mb-3 text-sm font-semibold text-foreground">Tipos de avaliador ativos</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { name: "Autoavaliação", weight: 20, on: true },
          { name: "Gestor direto", weight: 50, on: true },
          { name: "Pares", weight: 20, on: true },
          { name: "Subordinados", weight: 10, on: true },
          { name: "Cliente interno", weight: 0, on: false },
        ].map((a) => (
          <div
            key={a.name}
            className={cn(
              "flex items-center justify-between rounded-lg border p-3",
              a.on ? "border-border bg-card" : "border-dashed border-border bg-surface-sunken",
            )}
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked={a.on} className="h-4 w-4 accent-[var(--accent)]" />
              <span className={cn("text-sm font-medium", a.on ? "text-foreground" : "text-muted-foreground")}>
                {a.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={a.weight}
                disabled={!a.on}
                className="w-16 rounded-md border border-border bg-card px-2 py-1 text-right text-sm text-foreground disabled:opacity-50"
              />
              <span className="text-xs text-muted-foreground">% peso</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Formulário" hint="Modelo da biblioteca de Formulários.">
          <select className={inputCls}>
            <option>Competências comportamentais — Padrão 2025</option>
            <option>Competências técnicas — Engenharia</option>
            <option>Liderança — Gestores</option>
          </select>
        </Field>
        <Field label="Escala de resposta">
          <select className={inputCls}>
            <option>Likert 1–5 (Insatisfatório → Excepcional)</option>
            <option>Likert 1–4 (sem ponto neutro)</option>
            <option>Numérica 0–10</option>
          </select>
        </Field>
        <Field label="Método de cálculo" hint="Da biblioteca de Métodos de cálculo.">
          <select className={inputCls}>
            <option>Média ponderada por avaliador</option>
            <option>Mediana com descarte de extremos</option>
          </select>
        </Field>
        <Field label="Comentários abertos">
          <select className={inputCls}>
            <option>Obrigatórios em notas baixas e altas</option>
            <option>Opcionais</option>
            <option>Obrigatórios em todas as questões</option>
          </select>
        </Field>
      </div>
    </div>
  );
}

function RulesTab() {
  const rules = [
    {
      title: "Anonimato dos pares",
      desc: "Avaliações entre pares são exibidas sem identificar o autor.",
      on: true,
    },
    {
      title: "Mínimo de avaliadores por colaborador",
      desc: "Se não houver avaliadores suficientes, o ciclo bloqueia a calibragem.",
      on: true,
      extra: "3 avaliadores",
    },
    {
      title: "Calibragem obrigatória",
      desc: "Notas finais só são publicadas após aprovação do comitê.",
      on: true,
    },
    {
      title: "Forçar distribuição (curva)",
      desc: "Aplicar curva de Gauss na distribuição final de notas.",
      on: false,
    },
    {
      title: "Visibilidade do resultado para o colaborador",
      desc: "O colaborador vê sua nota final após o feedback do gestor.",
      on: true,
    },
    {
      title: "Permitir reabertura de avaliação",
      desc: "RH pode reabrir avaliações já enviadas em casos excepcionais.",
      on: false,
    },
  ];
  return (
    <div>
      <SectionHeader
        title="Regras do ciclo"
        description="Políticas que governam o comportamento do ciclo. Mudanças aqui afetam diretamente colaboradores e gestores."
      />
      <ul className="space-y-2">
        {rules.map((r) => (
          <li
            key={r.title}
            className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{r.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
              {r.extra && (
                <p className="mt-1 inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">
                  {r.extra}
                </p>
              )}
            </div>
            <label className="relative inline-flex shrink-0 cursor-pointer items-center">
              <input type="checkbox" defaultChecked={r.on} className="peer sr-only" />
              <span className="h-5 w-9 rounded-full bg-muted transition-colors peer-checked:bg-success" />
              <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-card shadow transition-transform peer-checked:translate-x-4" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
