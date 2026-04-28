import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Target,
  Award,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Target as TargetIcon,
  Sparkles,
  ClipboardCheck,
  Building2,
  Clock,
  Activity,
  AlertCircle,
  BarChart3 as BarChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";
import { AppShell } from "@/components/talents/AppShell";
import { StatCard } from "@/components/talents/StatCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: ExecutiveDashboard,
  head: () => ({
    meta: [
      { title: "Dashboard Executivo · Talent OS" },
      {
        name: "description",
        content: "Visão consolidada de Estratégia, Talentos e Operação.",
      },
    ],
  }),
});

const chartData = [
  { month: "Jan", estrategia: 40, talentos: 30, operacao: 50 },
  { month: "Fev", estrategia: 45, talentos: 35, operacao: 55 },
  { month: "Mar", estrategia: 55, talentos: 48, operacao: 65 },
  { month: "Abr", estrategia: 48, talentos: 64, operacao: 78 },
];

const performanceTrend = [
  { day: "02", value: 30 },
  { day: "05", value: 45 },
  { day: "08", value: 42 },
  { day: "12", value: 60 },
  { day: "15", value: 55 },
  { day: "18", value: 72 },
  { day: "22", value: 68 },
  { day: "25", value: 85 },
  { day: "28", value: 92 },
];

function ExecutiveDashboard() {
  return (
    <AppShell activeNav="inicio">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Painel Executivo
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
            Sua Organização em um Olhar
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acompanhe a saúde e o progresso dos principais pilares da empresa.
          </p>
        </header>

        {/* Pilares Principais */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ESTRATÉGIA */}
          <ModuleCard
            title="Estratégia"
            subtitle="OKRs & Metas"
            icon={Target}
            href="/estrategia"
            metrics={[
              { label: "Progresso OKR", value: "48%", tone: "default" },
              { label: "Check-ins em dia", value: "92%", tone: "success" },
            ]}
          />

          {/* TALENTOS */}
          <ModuleCard
            title="Talentos"
            subtitle="Performance & Desenvolvimento"
            icon={Award}
            href="/talentos"
            metrics={[
              { label: "Conclusão Ciclo", value: "64%", tone: "success" },
              { label: "Engajamento", value: "92%", tone: "success" },
            ]}
          />

          {/* OPERAÇÃO */}
          <ModuleCard
            title="Operação"
            subtitle="Estrutura & Capacitação"
            icon={GraduationCap}
            href="/operacao"
            metrics={[
              { label: "Treinamento", value: "78%", tone: "success" },
              { label: "Pessoas Ativas", value: "1.248", tone: "default" },
            ]}
          />
        </div>

        {/* Atenção & Riscos (Insights Negativos) */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Atenção & Riscos</h3>
                <p className="text-sm text-muted-foreground">Insights críticos que demandam ação imediata</p>
              </div>
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <RiskCard 
                title="Risco de Execução Estratégica"
                desc="12% dos OKRs prioritários estão há mais de 15 dias sem check-in."
                severity="high"
                impact="Alto Impacto no Q2"
              />
              <RiskCard 
                title="Retenção de Talentos Chave"
                desc="5 sucessores críticos identificados sem Plano de Desenvolvimento ativo."
                severity="medium"
                impact="Risco de Continuidade"
              />
              <RiskCard 
                title="Engajamento em Treinamento"
                desc="Queda de 18% na taxa de conclusão de trilhas obrigatórias este mês."
                severity="medium"
                impact="Gap de Compliance"
              />
              <RiskCard 
                title="Calibragem de Performance"
                desc="Desvio padrão < 0.5 em 3 departamentos. Possível viés de leniência."
                severity="low"
                impact="Qualidade da Avaliação"
              />
            </div>
          </div>

          {/* Tendência de Performance (Keep this one as it's tangible) */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Tendência de Performance</h3>
                <p className="text-xs text-muted-foreground">Média global da organização</p>
              </div>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>

            <div className="h-[240px] w-full">
              <ChartContainer
                config={{
                  value: { label: "Performance", color: "#3b82f6" },
                }}
                className="h-full w-full"
              >
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function RiskCard({ title, desc, severity, impact }: { title: string; desc: string; severity: "high" | "medium" | "low"; impact: string }) {
  const colors = {
    high: "border-destructive/30 bg-destructive/5 text-destructive",
    medium: "border-warning/30 bg-warning/5 text-warning",
    low: "border-info/30 bg-info/5 text-info",
  };
  
  const iconColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-warning text-warning-foreground",
    low: "bg-info text-info-foreground",
  };

  return (
    <div className={cn("rounded-xl border p-4 transition-all hover:shadow-md", colors[severity])}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-bold uppercase tracking-tight">{title}</h4>
          <p className="mt-1 text-xs font-medium opacity-90 leading-relaxed text-foreground">{desc}</p>
        </div>
        <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold", iconColors[severity])}>
          !
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-current/10 pt-3 opacity-80">
        <span className="text-[10px] font-semibold uppercase">{impact}</span>
        <button className="text-[10px] font-bold underline underline-offset-2">Agir agora</button>
      </div>
    </div>
  );
}

function ModuleCard({ title, subtitle, icon: Icon, href, metrics }: { title: string, subtitle: string, icon: any, href: string, metrics: any[] }) {
  return (
    <Link
      to={href}
      className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">{subtitle}</p>
      
      <div className="mt-6 flex flex-col gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{m.label}</span>
            <span className={`text-sm font-bold ${m.tone === 'success' ? 'text-success' : 'text-accent'}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

function InsightItem({ icon: Icon, label, desc }: { icon: any, label: string, desc: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-secondary-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </li>
  );
}

function QuickLink({ label }: { label: string }) {
  return (
    <button className="w-full flex items-center justify-between rounded-lg border border-border p-3 text-left hover:bg-secondary/40 transition-colors">
      <span className="text-sm font-medium">{label}</span>
      <ArrowRight className="h-3 w-3 text-muted-foreground" />
    </button>
  );
}
