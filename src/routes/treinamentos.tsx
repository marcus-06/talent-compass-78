import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  Settings2,
  BookOpen,
  Layout,
  Award,
} from "lucide-react";
import { AppShell } from "@/components/talents/AppShell";
import { StatCard } from "@/components/talents/StatCard";
import { MENUS } from "@/components/shell/TopNav";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/treinamentos")({
  component: TrainingDashboard,
  head: () => ({
    meta: [
      { title: "Gestão de Treinamentos · Talent OS" },
      {
        name: "description",
        content: "Gestão de trilhas, capacitações e desenvolvimento dos colaboradores.",
      },
    ],
  }),
});

function TrainingDashboard() {
  const [view, setView] = useState<"dashboard" | "settings">("dashboard");

  return (
    <AppShell activeNav="pessoas-talentos">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Módulo de Pessoas e Talentos · {view === "dashboard" ? "Treinamentos" : "Configurações"}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              {view === "dashboard" ? "Capacitação & Trilhas" : "Regras de Treinamento"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {view === "dashboard"
                ? "Gerencie o desenvolvimento e capacitação da sua força de trabalho."
                : "Defina os critérios de elegibilidade e trilhas obrigatórias."}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Atualizado recentemente
          </div>
        </div>

        {/* Sub-navigation Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {MENUS.find(m => m.key === "pessoas-talentos")?.groups?.[0]?.items.map((item) => (
            <Link
              key={item.label}
              to={item.href ?? "/treinamentos"}
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
                label="Trilhas Ativas"
                value="12"
                icon={Layout}
                tone="default"
              />
              <StatCard
                label="Conclusão Média"
                value="78%"
                icon={CheckCircle2}
                tone="success"
              />
              <StatCard
                label="Total de Alunos"
                value="1.248"
                icon={Users}
                tone="default"
              />
              <StatCard
                label="Certificações"
                value="342"
                icon={Award}
                tone="success"
              />
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h3 className="mb-4 text-base font-semibold text-foreground">Status das Trilhas</h3>
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
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Destaques do Mês</h3>
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Melhor Engajamento</span>
                      <span className="font-bold text-foreground">Vendas LATAM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Horas de Treinamento</span>
                      <span className="font-bold text-foreground">2.450h</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="mt-8 flex items-center justify-center rounded-2xl border border-dashed border-border p-24 text-center">
            <div>
              <Settings2 className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-medium text-foreground">Configurações de Treinamento</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Parametrize as regras de conclusão, certificados e integração com LMS.
              </p>
            </div>
          </div>
        )}
      </main>
    </AppShell>
  );
}

function TrainingRow({ title, status, progress, participants }: { title: string; status: string; progress: number; participants: number }) {
  return (
    <li className="px-4 py-4 hover:bg-secondary/40 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{participants} participantes · {status}</p>
        </div>
        <span className="text-xs font-bold text-accent">{progress}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-success transition-all duration-700" style={{ width: `${progress}%` }} />
      </div>
    </li>
  );
}
