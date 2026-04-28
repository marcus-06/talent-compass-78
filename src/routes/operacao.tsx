import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap,
  Video,
  Building2,
  Workflow,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  Settings2,
} from "lucide-react";
import { AppShell } from "@/components/talents/AppShell";
import { StatCard } from "@/components/talents/StatCard";
import { MENUS } from "@/components/shell/TopNav";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { OperationSettings } from "@/components/settings/OperationSettings";

export const Route = createFileRoute("/operacao")({
  component: OperationDashboard,
  head: () => ({
    meta: [
      { title: "Operação · Talent OS" },
      {
        name: "description",
        content: "Gestão operacional, treinamento e estrutura organizacional.",
      },
    ],
  }),
});

function OperationDashboard() {
  const [view, setView] = useState<"dashboard" | "settings">("dashboard");

  return (
    <AppShell activeNav="operacao">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Módulo de Operação · {view === "dashboard" ? "Dashboard" : "Configurações"}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              {view === "dashboard" ? "Execução & Excelência" : "Regras Operacionais"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {view === "dashboard"
                ? "Gestão operacional, treinamento e estrutura organizacional."
                : "Defina os ritos de reunião e trilhas de capacitação obrigatórias."}
            </p>
          </div>
        </div>

        {/* Sub-navigation Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {MENUS.find(m => m.key === "operacao")?.groups?.[0]?.items.map((item) => (
            <Link
              key={item.label}
              to={item.href ?? "/operacao"}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-accent/40 hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setView(view === "dashboard" ? "settings" : "dashboard")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition-all shadow-sm",
              view === "settings"
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-accent hover:border-accent/40 hover:bg-accent/5"
            )}
          >
            <Settings2 className="h-3.5 w-3.5" />
            {view === "settings" ? "Voltar ao Dashboard" : "Configurações"}
          </button>
        </div>

        {view === "dashboard" ? (
          <>
            <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Trilhas de Treinamento"
            value="12"
            icon={GraduationCap}
            tone="default"
          />
          <StatCard
            label="Média de Conclusão"
            value="78%"
            icon={CheckCircle2}
            tone="success"
          />
          <StatCard
            label="Reuniões Agendadas"
            value="15"
            icon={Video}
            tone="default"
          />
          <StatCard
            label="Gargalos Operacionais"
            value="2"
            icon={AlertCircle}
            tone="warning"
          />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-base font-semibold text-foreground">Status dos Treinamentos</h3>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <ul className="divide-y divide-border">
                <TrainingRow
                  title="Onboarding de Novos Colaboradores"
                  status="Em andamento"
                  progress={90}
                  participants={42}
                />
                <TrainingRow
                  title="Liderança Situacional"
                  status="Próximo de concluir"
                  progress={65}
                  participants={15}
                />
                <TrainingRow
                  title="Segurança da Informação 2025"
                  status="Iniciando"
                  progress={12}
                  participants={1248}
                />
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Estrutura (Snapshot)</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Áreas Totais</span>
                  </div>
                  <span className="text-sm font-bold">14</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Colaboradores</span>
                  </div>
                  <span className="text-sm font-bold">1.248</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Workflows Ativos</span>
                  </div>
                  <span className="text-sm font-bold">8</span>
                </div>
              </div>
              <button className="mt-4 w-full rounded-md border border-border py-2 text-xs font-semibold hover:bg-secondary">
                Ver Organograma
              </button>
            </div>
          </div>
            </section>
          </>
        ) : (
          <div className="mt-8">
            <OperationSettings />
          </div>
        )}
      </main>
    </AppShell>
  );
}

function TrainingRow({ title, status, progress, participants }: { title: string; status: string; progress: number; participants: number }) {
  return (
    <li className="px-4 py-4 hover:bg-secondary/40">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{participants} participantes · {status}</p>
        </div>
        <span className="text-xs font-bold text-accent">{progress}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-success" style={{ width: `${progress}%` }} />
      </div>
    </li>
  );
}
