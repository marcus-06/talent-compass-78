import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  ClipboardCheck,
  Scale,
  BarChart3,
  Target,
  TrendingUp,
  AlertCircle,
  Calendar,
  ArrowRight,
  GraduationCap,
  Award,
  Clock,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AppShell } from "@/components/talents/AppShell";
import { CycleStepper, type Step } from "@/components/talents/CycleStepper";
import { StatCard } from "@/components/talents/StatCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { MENUS } from "@/components/shell/TopNav";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { TalentSettings } from "@/components/settings/TalentSettings";

export const Route = createFileRoute("/talentos")({
  component: TalentDashboard,
  head: () => ({
    meta: [
      { title: "Talentos · Talent OS" },
      {
        name: "description",
        content: "Gestão de talentos, competências e ciclos de performance.",
      },
    ],
  }),
});

const steps: Step[] = [
  { id: "1", label: "Planejamento", status: "done" },
  { id: "2", label: "Avaliação", status: "done" },
  { id: "3", label: "Calibragem", status: "current", progress: 64 },
  { id: "4", label: "Resultado", status: "upcoming" },
  { id: "5", label: "Desenvolvimento", status: "upcoming" },
];

const performanceData = [
  { day: "02", completed: 45, performance: 30 },
  { day: "04", completed: 52, performance: 40 },
  { day: "06", completed: 48, performance: 35 },
  { day: "08", completed: 61, performance: 45 },
  { day: "10", completed: 55, performance: 50 },
  { day: "12", completed: 67, performance: 55 },
  { day: "14", completed: 70, performance: 65 },
  { day: "16", completed: 62, performance: 60 },
  { day: "18", completed: 78, performance: 75 },
  { day: "20", completed: 82, performance: 80 },
  { day: "22", completed: 75, performance: 70 },
  { day: "24", completed: 85, performance: 82 },
  { day: "26", completed: 90, performance: 88 },
  { day: "28", completed: 88, performance: 85 },
  { day: "30", completed: 94, performance: 92 },
];

const statusData = [
  { name: "Ativos", value: 56, color: "#10b981" },
  { name: "Férias", value: 16, color: "#3b82f6" },
  { name: "Afastados", value: 20, color: "#ef4444" },
];

function TalentDashboard() {
  const [view, setView] = useState<"dashboard" | "settings">("dashboard");

  return (
    <AppShell activeNav="talentos">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Módulo de Talentos · {view === "dashboard" ? "Dashboard" : "Configurações"}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              {view === "dashboard" ? "Gestão de Performance" : "Configurações da Jornada"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {view === "dashboard" 
                ? "Monitore o progresso das avaliações e ciclos de desenvolvimento."
                : "Defina as regras, ciclos e estrutura para a gestão de talentos."}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Atualizado há pouco
          </div>
        </div>

        {/* Sub-navigation Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {MENUS.find(m => m.key === "talentos")?.groups?.[0]?.items.map((item) => (
            <Link
              key={item.label}
              to={item.href ?? "/talentos"}
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
            <section className="mt-6 overflow-hidden rounded-2xl shadow-[var(--shadow-lg)]">
          <div
            className="px-8 pb-7 pt-8 text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                  Ciclo vigente · em andamento
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Ciclo de Performance · 2025.1
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
                  <Calendar className="h-4 w-4" />
                  03 mar · 30 jun 2025 · 1.248 participantes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-white/15">
                  Ver detalhes
                </button>
                <button className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90">
                  Continuar calibragem
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 rounded-xl bg-white/5 p-5 backdrop-blur md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/60">Progresso geral</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">64%</span>
                  <span className="text-sm text-white/70">concluído</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-success" style={{ width: "64%" }} />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/60">Etapa atual</p>
                <p className="mt-2 text-lg font-semibold">Calibragem</p>
                <p className="text-sm text-white/70">Encerra em 8 dias</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/60">Saúde</p>
                <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                  Atenção
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-border bg-card px-8 py-6">
            <CycleStepper steps={steps} />
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Performance Metrics - Line Chart */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Métricas de Performance</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  Taxa de conclusão vs Desempenho geral
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-secondary/50 p-1">
                {["Hoje", "Semana", "Mês"].map((t) => (
                  <button
                    key={t}
                    className={cn(
                      "rounded px-3 py-1 text-[10px] font-medium transition-colors",
                      t === "Mês" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[240px] w-full">
              <ChartContainer
                config={{
                  completed: { label: "Tarefas Concluídas", color: "#10b981" },
                  performance: { label: "Performance", color: "#3b82f6" },
                }}
                className="h-full w-full"
              >
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    dy={10}
                  />
                  <YAxis
                    hide
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="performance"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
            
            <div className="mt-4 flex items-center gap-6 justify-center text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success" />
                Tarefas Concluídas
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Performance
              </div>
            </div>
          </div>

          {/* Status - Donut Chart */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
            <h3 className="text-base font-semibold text-foreground mb-6">Status dos Colaboradores</h3>
            <div className="relative h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">92</span>
                <span className="text-[10px] text-muted-foreground">Total Staff</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {statusData.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs font-medium uppercase tracking-tight">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
            </section>
          </>
        ) : (
          <div className="mt-8">
            <TalentSettings />
          </div>
        )}
      </main>
    </AppShell>
  );
}

function ActionRow({ title, meta, cta }: { title: string; meta: string; cta: string }) {
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-secondary/40">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{meta}</p>
      </div>
      <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-semibold">
        {cta}
      </button>
    </li>
  );
}
