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
  Search,
  MessageSquare,
  DollarSign,
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

import { usePerspective } from "@/hooks/usePerspective";
import { useState, useMemo } from "react";
import { PeriodComparator, ComparisonLegend, buildComparisonData, type ComparisonPeriod } from "@/components/shared/PeriodComparator";

function ExecutiveDashboard() {
  const { perspective } = usePerspective();
  const [compPeriod, setCompPeriod] = useState<ComparisonPeriod>("none");

  const trendDataWithComparison = useMemo(() => 
    compPeriod !== "none" ? buildComparisonData(performanceTrend, "value", compPeriod) : performanceTrend,
    [compPeriod]
  );

  if (perspective === "admin") {
    return (
      <AppShell activeNav="inicio">
        <main className="mx-auto max-w-[1400px] px-6 py-8 animate-in fade-in duration-700">
          <header className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Painel de Operações</p>
            <h1 className="text-4xl font-black tracking-tight text-foreground leading-[1.1] max-w-md">Controle de Ciclo e Gestão</h1>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><ClipboardCheck className="h-5 w-5" /></div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Ciclo Atual</span>
               </div>
               <h3 className="text-xl font-bold text-foreground">Avaliação 2024.1</h3>
               <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Progresso Global</span>
                  <span className="text-sm font-bold text-primary">64%</span>
               </div>
               <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: "64%" }} />
               </div>
            </div>
            
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500"><Clock className="h-5 w-5" /></div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Pendências de Gestão</span>
               </div>
               <h3 className="text-xl font-bold text-foreground">12 Aprovações</h3>
               <p className="text-xs text-muted-foreground mt-1">Aguardando revisão de desligamentos e promoções.</p>
               <button className="mt-6 w-full py-2 rounded-xl bg-secondary text-xs font-bold hover:bg-secondary/80 transition-all">Ver Todas</button>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success"><Activity className="h-5 w-5" /></div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Saúde dos Dados</span>
               </div>
               <h3 className="text-xl font-bold text-foreground">98.5%</h3>
               <p className="text-xs text-muted-foreground mt-1">Campos obrigatórios preenchidos no cadastro.</p>
               <div className="mt-4 flex -space-x-2">
                  {[1,2,3,4].map(i => <div key={i} className="h-6 w-6 rounded-full border-2 border-card bg-secondary" />)}
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-primary text-[8px] font-bold text-white">+12</div>
               </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
             <div className="lg:col-span-8 space-y-6">
                <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                   <h3 className="text-lg font-bold text-foreground mb-6">Próximos Marcos Operacionais</h3>
                   <div className="space-y-4">
                      {[
                        { date: "Amanhã", label: "Fechamento de Folha (PPR)", status: "Urgente", color: "text-red-500" },
                        { date: "15 Mai", label: "Treinamento de Lideranças - Módulo 2", status: "Agendado", color: "text-primary" },
                        { date: "22 Mai", label: "Calibragem Final de Performance", status: "Preparação", color: "text-muted-foreground" },
                      ].map((task, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border/50 hover:bg-secondary/30 transition-all cursor-pointer group">
                           <div className="flex items-center gap-4">
                              <div className="text-center min-w-[50px]"><p className="text-[10px] font-black uppercase text-muted-foreground">{task.date}</p></div>
                              <div className="h-10 w-px bg-border/50" />
                              <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{task.label}</p>
                           </div>
                           <span className={cn("text-[9px] font-black uppercase tracking-widest", task.color)}>{task.status}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
             <div className="lg:col-span-4">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm h-full">
                   <h3 className="text-sm font-bold text-foreground mb-6">Atalhos Administrativos</h3>
                   <div className="space-y-2">
                      {[
                        "Importar Dados (Excel/CSV)",
                        "Gerenciar Fluxos de Aprovação",
                        "Configurações do Sistema",
                        "Logs de Atividade",
                        "Suporte Mereo"
                      ].map(link => (
                        <button key={link} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-all text-xs font-semibold text-muted-foreground hover:text-foreground">
                           {link} <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell activeNav="inicio">
      <main className="mx-auto max-w-[1400px] px-6 py-8 animate-in fade-in duration-700">
        <header className="mb-12 grid gap-6 lg:grid-cols-4 lg:items-center">
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
              Painel Executivo
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground leading-[1.1] max-w-md">
              Sua Organização em um Olhar
            </h1>
          </div>

          {/* AI Copilot Card */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F172A] text-white shadow-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground leading-tight">Mereo Copilot</h2>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">IA Estratégica</p>
                </div>
              </div>

              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Como posso ajudar hoje?" 
                  className="w-full rounded-full border border-border bg-background py-3.5 pl-11 pr-32 text-sm transition-all focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/5"
                />
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-[#0a0a0b] px-6 py-2 text-[11px] font-bold text-white transition-all hover:bg-black">
                  Perguntar
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dash Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ModuleCard
            title="Estratégia e Resultados"
            subtitle="OKRs & Metas"
            icon={Target}
            href="/estrategia"
            metrics={[
              { label: "Progresso OKR", value: "48%", tone: "default" },
              { label: "Check-ins em dia", value: "92%", tone: "success" },
            ]}
          />

          <ModuleCard
            title="Pessoas e Talentos"
            subtitle="Desenvolvimento & Performance"
            icon={Award}
            href="/talentos"
            metrics={[
              { label: "Conclusão Ciclo", value: "64%", tone: "success" },
              { label: "Plano Sucessório", value: "85%", tone: "default" },
            ]}
          />

          <ModuleCard
            title="Engajamento e Cultura"
            subtitle="Escuta & Experiência"
            icon={MessageSquare}
            href="/engajamento-cultura"
            metrics={[
              { label: "Pesquisa Pulse", value: "92%", tone: "success" },
              { label: "Taxa de Feedback", value: "15/mês", tone: "default" },
            ]}
          />

          <ModuleCard
            title="Remuneração"
            subtitle="Incentivos & Mérito"
            icon={DollarSign}
            href="/recompensa-reconhecimento"
            metrics={[
              { label: "Orçamento Utilizado", value: "84%", tone: "default" },
              { label: "Elegibilidade", value: "92%", tone: "success" },
            ]}
          />
        </div>

        {/* Atenção & Riscos */}
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
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Tendência de Performance</h3>
                <p className="text-xs text-muted-foreground">Média global da organização</p>
              </div>
              <div className="flex items-center gap-3">
                 <ComparisonLegend period={compPeriod} />
                 <PeriodComparator value={compPeriod} onChange={setCompPeriod} />
              </div>
            </div>

            <div className="h-[240px] w-full">
              <ChartContainer
                config={{
                  value: { label: "Performance", color: "#3b82f6" },
                  value_prev: { label: "Comparação", color: "#94a3b8" }
                }}
                className="h-full w-full"
              >
                <LineChart data={trendDataWithComparison}>
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
                  {compPeriod !== "none" && (
                    <Line
                      type="monotone"
                      dataKey="value_prev"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      strokeDasharray="4 3"
                      dot={false}
                    />
                  )}
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
