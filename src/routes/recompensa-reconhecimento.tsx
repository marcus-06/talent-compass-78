import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DollarSign,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Search,
  Settings2,
  Clock,
  PieChart as PieChartIcon,
  BarChart3,
  Calendar,
  ArrowUpRight,
  Zap,
  BrainCircuit,
  Scale,
  Plus,
  ChevronRight
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
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
import { usePerspective } from "@/hooks/usePerspective";
import { useState, useMemo } from "react";
import { PeriodComparator, ComparisonLegend, buildComparisonData, type ComparisonPeriod } from "@/components/shared/PeriodComparator";

export const Route = createFileRoute("/recompensa-reconhecimento")({
  component: RewardsDashboard,
  head: () => ({
    meta: [
      { title: "Remuneração · Talent OS" },
      {
        name: "description",
        content: "Gerencie incentivos, bônus e ciclos de mérito para reconhecer o desempenho excepcional.",
      },
    ],
  }),
});

const budgetData = [
  { category: "Diretoria", budget: 100, actual: 92 },
  { category: "Gerência", budget: 100, actual: 98 },
  { category: "Operacional", budget: 100, actual: 85 },
];

const distributionData = [
  { name: "Promoção", value: 45, color: "#3b82f6" },
  { name: "Mérito", value: 35, color: "#10b981" },
  { name: "Enquadramento", value: 20, color: "#f59e0b" },
];

function RewardsDashboard() {
  const { perspective } = usePerspective();
  const [view, setView] = useState<"dashboard" | "settings">("dashboard");
  const [compPeriod, setCompPeriod] = useState<ComparisonPeriod>("none");

  const meritDataWithComparison = useMemo(() => 
    compPeriod !== "none" ? buildComparisonData(budgetData, "actual", compPeriod) : budgetData,
    [compPeriod]
  );

  const renderAdminView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-foreground">Gestão de Mérito & Incentivos</h1>
            <p className="text-sm text-muted-foreground">Operacionalização de tabelas, elegibilidade e fluxos de aprovação.</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-primary/90 transition-all">
             <Plus className="h-4 w-4" /> Novo Ciclo de Mérito
          </button>
       </header>

       <div className="grid gap-6 md:grid-cols-4">
          <StatCard label="Provisionamento (RV)" value="R$ 1.2M" icon={DollarSign} tone="default" />
          <StatCard label="Elegibilidade" value="92%" icon={Users} tone="success" />
          <StatCard label="Promovidos (Ano)" value="45" icon={Sparkles} tone="success" />
          <StatCard label="Uso do Orçamento" value="84%" icon={BarChart3} tone="default" />
       </div>

       <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
             <h3 className="text-sm font-bold text-foreground">Ciclos de Recompensa Ativos</h3>
             <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Configurar Regras</button>
          </div>
          <div className="p-6 space-y-4">
             {[
               { name: "Mérito Q2 - 2024", budget: "R$ 450k", spent: "R$ 412k", status: "Calibragem" },
               { name: "Bônus Anual (PPR)", budget: "R$ 800k", spent: "R$ 0", status: "Planejamento" },
             ].map(cycle => (
               <div key={cycle.name} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-secondary/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground"><DollarSign className="h-5 w-5" /></div>
                     <div><p className="text-sm font-bold text-foreground">{cycle.name}</p><p className="text-[10px] text-muted-foreground font-bold">{cycle.spent} / {cycle.budget}</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase", cycle.status === "Calibragem" ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground")}>{cycle.status}</span>
                     <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );

  const renderCEOView = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Remuneração & Equidade</h1>
            <p className="text-sm text-muted-foreground">Posicionamento de mercado, ROI de incentivos e justiça salarial.</p>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0F172A] text-white shadow-xl">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg"><Scale className="h-5 w-5" /></div>
             <div>
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">IA Consultor de Recompensa</p>
                <p className="text-xs font-bold italic">"Compa-ratio global está 4% acima da mediana"</p>
             </div>
          </div>
       </header>

       <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
             <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-6">Razão de Comparação (Compa-Ratio)</h3>
             <div className="relative inline-flex items-center justify-center mb-6">
                <span className="text-5xl font-black text-foreground">1.04</span>
                <div className="absolute -top-2 -right-4 flex h-6 w-6 items-center justify-center rounded-full bg-success text-white"><TrendingUp className="h-3 w-3" /></div>
             </div>
             <p className="text-xs text-muted-foreground leading-relaxed">Sua organização está <span className="text-success font-bold">competitiva</span> em relação ao mercado de tecnologia.</p>
          </div>

          <div className="md:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div><h3 className="text-lg font-bold text-foreground">Mapa de Calor de Meritocracia</h3><p className="text-xs text-muted-foreground">Alinhamento entre Recompensa vs. Performance.</p></div>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase">
                   <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /><span>Mérito</span></div>
                   <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-secondary" /><span>Performance</span></div>
                   <ComparisonLegend period={compPeriod} />
                   <PeriodComparator value={compPeriod} onChange={setCompPeriod} />
                </div>
             </div>
             <div className="h-[200px] w-full">
                <ChartContainer config={{ actual: { label: "Mérito", color: "#3b82f6" }, budget: { label: "Performance", color: "#e2e8f0" }, actual_prev: { label: "Comparação", color: "#f59e0b" } }} className="h-full w-full">
                   <BarChart data={meritDataWithComparison}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                      <YAxis hide domain={[0, 120]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                      <Bar dataKey="budget" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                      {compPeriod !== "none" && (
                        <Bar dataKey="actual_prev" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} opacity={0.6} />
                      )}
                   </BarChart>
                </ChartContainer>
             </div>
          </div>
       </div>

       <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
             <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-widest text-center">Índice de Equidade Salarial</h3>
             <div className="aspect-square relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                   <span className="text-3xl font-black text-foreground">96/100</span>
                   <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-tight mt-1">Equidade de Gênero</span>
                </div>
                <div className="h-full w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie data={distributionData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value">
                            {distributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                         </Pie>
                      </PieChart>
                   </ResponsiveContainer>
                </div>
             </div>
             <p className="text-[10px] text-muted-foreground text-center leading-relaxed italic">"Diferença residual de 4% identificada na área de Engenharia. <span className="text-primary font-bold">Plano de ajuste automático disponível.</span>"</p>
          </div>

          <div className="lg:col-span-8 space-y-6">
             <div className="rounded-3xl bg-[#0F172A] p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10"><BrainCircuit className="h-24 w-24 text-primary" /></div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6"><Sparkles className="h-4 w-4" /> IA Análise de Investimento</div>
                <div className="grid gap-8 md:grid-cols-2 relative">
                   <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs font-bold text-white mb-2">ROI do Bônus de Vendas</p>
                      <p className="text-2xl font-black text-success">4.8x</p>
                      <p className="text-[10px] text-white/50 leading-relaxed mt-2">Para cada R$ 1 investido em bônus, houve um incremento de R$ 4.80 em margem bruta.</p>
                   </div>
                   <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs font-bold text-white mb-2">Impacto na Retenção</p>
                      <p className="text-2xl font-black text-primary">82%</p>
                      <p className="text-[10px] text-white/50 leading-relaxed mt-2">Colaboradores no Top-quartil de recompensa apresentam 82% menos chance de saída.</p>
                   </div>
                </div>
             </div>

             <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest">Ações Estratégicas Recomendadas</h3>
                <div className="grid gap-4 md:grid-cols-2">
                   <div className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-secondary/30 transition-all cursor-pointer">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><TrendingUp className="h-5 w-5" /></div>
                      <div><p className="text-xs font-bold text-foreground">Aceleração Altos Potenciais</p><p className="text-[10px] text-muted-foreground italic">Reajustar 12 talentos críticos.</p></div>
                   </div>
                   <div className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-secondary/30 transition-all cursor-pointer">
                      <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center"><Scale className="h-5 w-5" /></div>
                      <div><p className="text-xs font-bold text-foreground">Equidade Salarial</p><p className="text-[10px] text-muted-foreground italic">Ajustar gaps na Engenharia.</p></div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <AppShell activeNav="recompensa-reconhecimento">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {perspective === "admin" ? renderAdminView() : renderCEOView()}
      </main>
    </AppShell>
  );
}
