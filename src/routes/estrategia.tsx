import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Target,
  TrendingUp,
  ArrowRight,
  Crosshair,
  Compass,
  BarChart3,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  Settings2,
  ShieldCheck,
  Zap,
  Calculator,
  PieChart,
  FileText,
  Sparkles,
  BrainCircuit,
  Activity,
  LineChart as LineChartIcon,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { AppShell } from "@/components/talents/AppShell";
import { StatCard } from "@/components/talents/StatCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { MENUS } from "@/components/shell/TopNav";
import { useState, useMemo } from "react";
import { StrategySettings } from "@/components/settings/StrategySettings";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { usePerspective } from "@/hooks/usePerspective";
import { PeriodComparator, ComparisonLegend, buildComparisonData, type ComparisonPeriod } from "@/components/shared/PeriodComparator";

export const Route = createFileRoute("/estrategia")({
  component: StrategyDashboard,
  head: () => ({
    meta: [
      { title: "Estratégia · Talent OS" },
      {
        name: "description",
        content: "Gestão estratégica, OKRs e Metas.",
      },
    ],
  }),
});

const okrProgressData = [
  { month: "Jan", progress: 10, ai_prediction: 12 },
  { month: "Fev", progress: 25, ai_prediction: 28 },
  { month: "Mar", progress: 38, ai_prediction: 45 },
  { month: "Abr", progress: 48, ai_prediction: 62 },
];

function StrategyDashboard() {
  const { perspective } = usePerspective();
  const search = useSearch({ from: "/estrategia" }) as any;
  const navigate = useNavigate();
  const [localView, setLocalView] = useState<"dashboard" | "settings">("dashboard");
  const [compPeriod, setCompPeriod] = useState<ComparisonPeriod>("none");

  const okrDataWithComparison = useMemo(() =>
    compPeriod !== "none" ? buildComparisonData(okrProgressData, "progress", compPeriod) : okrProgressData,
    [compPeriod]
  );

  const activeTab = useMemo(() => {
    if (search.tab === "financeiro") return "financeiro";
    return localView;
  }, [search.tab, localView]);

  const setView = (v: "dashboard" | "settings" | "financeiro") => {
    if (v === "financeiro") {
      navigate({ to: "/estrategia", search: { tab: "financeiro" } });
    } else {
      setLocalView(v as any);
      navigate({ to: "/estrategia", search: { tab: undefined } });
    }
  };

  const renderAdminView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-foreground">Gestão de OKRs</h1>
            <p className="text-sm text-muted-foreground">Controle operacional de ciclos e check-ins.</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-primary/90 transition-all">
             <Plus className="h-4 w-4" /> Novo Ciclo
          </button>
       </header>

       <div className="grid gap-6 md:grid-cols-4">
          <StatCard label="Ciclos Ativos" value="2" icon={Clock} tone="default" />
          <StatCard label="Check-ins Pendentes" value="142" icon={AlertCircle} tone="warning" />
          <StatCard label="Adesão ao Ciclo" value="92%" icon={CheckCircle2} tone="success" />
          <StatCard label="Média de Resultados" value="64%" icon={Target} tone="default" />
       </div>

       <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
             <h3 className="text-sm font-bold text-foreground">Monitoramento de Times</h3>
             <div className="flex items-center gap-2">
                <div className="relative"><Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input type="text" placeholder="Filtrar time..." className="rounded-lg border border-border bg-background py-1.5 pl-8 pr-3 text-[11px] focus:outline-none w-40" /></div>
             </div>
          </div>
          <table className="w-full text-left text-xs">
             <thead className="bg-muted/30 border-b border-border">
                <tr>
                   <th className="px-6 py-3 font-bold text-muted-foreground uppercase tracking-widest text-[9px]">Time</th>
                   <th className="px-6 py-3 font-bold text-muted-foreground uppercase tracking-widest text-[9px]">Líder</th>
                   <th className="px-6 py-3 font-bold text-muted-foreground uppercase tracking-widest text-[9px]">OKRs</th>
                   <th className="px-6 py-3 font-bold text-muted-foreground uppercase tracking-widest text-[9px]">Último Check-in</th>
                   <th className="px-6 py-3 font-bold text-muted-foreground uppercase tracking-widest text-[9px]">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border">
                {[
                  { team: "Produto", lead: "Marcus Dias", okrs: 8, last: "Hoje", status: "Em dia" },
                  { team: "Engenharia", lead: "Bruno Costa", okrs: 12, last: "há 3 dias", status: "Em dia" },
                  { team: "Vendas", lead: "Carla Souza", okrs: 5, last: "há 12 dias", status: "Atrasado" },
                  { team: "CS", lead: "Ana Silva", okrs: 6, last: "Ontem", status: "Em dia" },
                ].map(row => (
                  <tr key={row.team} className="hover:bg-muted/20 cursor-pointer transition-colors group">
                     <td className="px-6 py-4 font-bold text-foreground">{row.team}</td>
                     <td className="px-6 py-4 text-muted-foreground">{row.lead}</td>
                     <td className="px-6 py-4 text-foreground">{row.okrs}</td>
                     <td className="px-6 py-4 text-muted-foreground">{row.last}</td>
                     <td className="px-6 py-4">
                        <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase", row.status === "Em dia" ? "bg-success/10 text-success" : "bg-red-500/10 text-red-500")}>{row.status}</span>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );

  const renderCEOView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Inteligência Estratégica</h1>
            <p className="text-sm text-muted-foreground">Visão holística de impacto e alinhamento organizacional.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner"><BrainCircuit className="h-6 w-6" /></div>
             <div className="text-right">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">IA Mereo Insight</p>
                <p className="text-xs font-bold text-foreground italic">"Probabilidade de 82% de bater a meta LATAM"</p>
             </div>
          </div>
       </header>

       <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div><h3 className="text-lg font-bold text-foreground">Previsão de Desempenho do Ciclo</h3><p className="text-xs text-muted-foreground">Realidade vs. Projeção de IA para o Q2.</p></div>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /><span className="text-[10px] font-bold text-muted-foreground uppercase">Real</span></div>
                   <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary/30" /><span className="text-[10px] font-bold text-muted-foreground uppercase">Projeção IA</span></div>
                   <ComparisonLegend period={compPeriod} />
                   <PeriodComparator value={compPeriod} onChange={setCompPeriod} />
                </div>
             </div>
             <div className="h-[300px] w-full">
                <ChartContainer config={{ progress: { label: "Progresso", color: "#3b82f6" }, ai_prediction: { label: "Projeção IA", color: "#94a3b8" }, progress_prev: { label: "Comparação", color: "#f59e0b" } }} className="h-full w-full">
                   <LineChart data={okrDataWithComparison}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <YAxis hide domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={4} dot={{ r: 5, fill: "#3b82f6", strokeWidth: 0 }} />
                      <Line type="monotone" dataKey="ai_prediction" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      {compPeriod !== "none" && <Line type="monotone" dataKey="progress_prev" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3, fill: "#f59e0b", strokeWidth: 0 }} />}
                   </LineChart>
                </ChartContainer>
             </div>
          </div>
          <div className="space-y-6">
             <div className="rounded-3xl bg-[#0F172A] p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all" />
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4"><Sparkles className="h-3 w-3" /> Radar de Alinhamento</div>
                <div className="space-y-5 relative">
                   <div><div className="flex items-center justify-between text-[11px] font-bold mb-1.5"><span>Vendas vs. Produto</span><span className="text-success">Forte (92%)</span></div><div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-success transition-all duration-1000" style={{ width: "92%" }} /></div></div>
                   <div><div className="flex items-center justify-between text-[11px] font-bold mb-1.5"><span>Marketing vs. Vendas</span><span className="text-warning">Desvio (45%)</span></div><div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-warning transition-all duration-1000" style={{ width: "45%" }} /></div></div>
                   <p className="text-[10px] text-white/50 leading-relaxed pt-2">A falta de alinhamento entre Marketing e Vendas pode custar 12% da meta de novos logos este trimestre.</p>
                </div>
             </div>
             <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-4">ROI Estratégico</h3>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30">
                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><DollarSign className="h-5 w-5" /></div>
                   <div><p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Orçamento Alinhado</p><p className="text-xl font-black text-foreground">R$ 1.2M</p></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                   <div className="p-3 rounded-xl border border-border bg-secondary/20"><p className="text-[9px] text-muted-foreground font-bold uppercase">ROI Estimado</p><p className="text-sm font-black text-success">3.2x</p></div>
                   <div className="p-3 rounded-xl border border-border bg-secondary/20"><p className="text-[9px] text-muted-foreground font-bold uppercase">Eficiência</p><p className="text-sm font-black text-primary">84%</p></div>
                </div>
             </div>
          </div>
       </div>

       <div className="grid gap-6 md:grid-cols-2">
          <OKRStrategicCard title="Expandir presença no mercado LATAM" status="Em Risco" impact="Crítico" progress={72} ai_insight="Foco no México: 85% dos leads concentrados lá." />
          <OKRStrategicCard title="Consolidar eficiência operacional" status="Saudável" impact="Médio" progress={35} ai_insight="Ganhos de escala superam a inflação de custos." />
       </div>
    </div>
  );

  return (
    <AppShell activeNav="estrategia-resultados">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {perspective === "admin" ? renderAdminView() : renderCEOView()}
      </main>
    </AppShell>
  );
}

function OKRStrategicCard({ title, status, impact, progress, ai_insight }: { title: string, status: string, impact: string, progress: number, ai_insight: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all group">
       <div className="flex items-start justify-between mb-6">
          <div className="space-y-1">
             <h4 className="text-base font-bold text-foreground leading-tight">{title}</h4>
             <div className="flex items-center gap-2">
                <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase", status === "Saudável" ? "bg-success/10 text-success" : "bg-red-500/10 text-red-500")}>{status}</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">• Impacto {impact}</span>
             </div>
          </div>
          <div className="text-right"><p className="text-2xl font-black text-primary">{progress}%</p></div>
       </div>
       <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-6">
          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }} />
       </div>
       <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-foreground/80 italic leading-relaxed">{ai_insight}</p>
       </div>
    </div>
  );
}

function Plus(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
  );
}
