import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageSquare,
  ListChecks,
  BookOpen,
  TrendingUp,
  Activity,
  Users,
  Search,
  Settings2,
  Clock,
  Heart,
  Smile,
  BarChart3,
  Sparkles,
  Zap,
  BrainCircuit,
  PieChart as PieChartIcon,
  ChevronRight,
  Filter,
  Plus,
  AlertTriangle
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
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
import { useState, useMemo } from "react";
import { usePerspective } from "@/hooks/usePerspective";
import { PeriodComparator, ComparisonLegend, buildComparisonData, type ComparisonPeriod } from "@/components/shared/PeriodComparator";

export const Route = createFileRoute("/engajamento-cultura")({
  component: EngagementDashboard,
  head: () => ({
    meta: [
      { title: "Engajamento e Cultura · Talent OS" },
      {
        name: "description",
        content: "Acompanhe a percepção dos colaboradores e navegue pelos módulos de escuta, feedback e registro contínuo da experiência.",
      },
    ],
  }),
});

const engagementData = [
  { month: "Jan", score: 72 },
  { month: "Mar", score: 78 },
  { month: "Jun", score: 85 },
];

const sentimentData = [
  { name: "Positivo", value: 65, color: "#10b981" },
  { name: "Neutro", value: 25, color: "#3b82f6" },
  { name: "Negativo", value: 10, color: "#ef4444" },
];

function EngagementDashboard() {
  const { perspective } = usePerspective();
  const [view, setView] = useState<"dashboard" | "settings">("dashboard");
  const [compPeriod, setCompPeriod] = useState<ComparisonPeriod>("none");

  const engagementDataWithComparison = useMemo(() => 
    compPeriod !== "none" ? buildComparisonData(engagementData, "score", compPeriod) : engagementData,
    [compPeriod]
  );

  const renderAdminView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-foreground">Escuta & Experiência</h1>
            <p className="text-sm text-muted-foreground">Gestão operacional de pesquisas, pulses e canais de feedback.</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-primary/90 transition-all">
             <Plus className="h-4 w-4" /> Nova Pesquisa
          </button>
       </header>

       <div className="grid gap-6 md:grid-cols-4">
          <StatCard label="Pesquisas Ativas" value="3" icon={ListChecks} tone="default" />
          <StatCard label="Taxa de Resposta" value="88%" icon={Activity} tone="success" />
          <StatCard label="Feedbacks do Mês" value="452" icon={MessageSquare} tone="default" />
          <StatCard label="eNPS Atual" value="74" icon={Smile} tone="success" />
       </div>

       <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
             <h3 className="text-sm font-bold text-foreground">Status das Pulses</h3>
             <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Ver Histórico</button>
          </div>
          <div className="p-6 space-y-4">
             {[
               { name: "Satisfação Semanal", responses: 142, total: 150, status: "Fechando" },
               { name: "Clima Organizacional", responses: 890, total: 1200, status: "Ativa" },
               { name: "Onboarding Experience", responses: 24, total: 24, status: "Finalizada" },
             ].map(pulse => (
               <div key={pulse.name} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-secondary/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground"><Activity className="h-5 w-5" /></div>
                     <div><p className="text-sm font-bold text-foreground">{pulse.name}</p><p className="text-[10px] text-muted-foreground font-bold">{pulse.responses}/{pulse.total} Respostas</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase", pulse.status === "Ativa" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>{pulse.status}</span>
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
            <h1 className="text-3xl font-black text-foreground tracking-tight">Alinhamento Cultural & Sentimento</h1>
            <p className="text-sm text-muted-foreground">Análise profunda da saúde emocional e engajamento da organização.</p>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0F172A] text-white shadow-xl">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg"><Heart className="h-5 w-5" /></div>
             <div>
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">IA Consultor de Sentimento</p>
                <p className="text-xs font-bold italic">"Otimismo em alta após anúncio de PPR"</p>
             </div>
          </div>
       </header>

       <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-8">
             <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <div><h3 className="text-lg font-bold text-foreground">Mapa de Calor de Engajamento</h3><p className="text-xs text-muted-foreground">Níveis de satisfação por pilar cultural.</p></div>
                   <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-success" /><span className="text-[10px] font-bold text-muted-foreground uppercase">Meta Global (8.5)</span></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                   {[
                     { label: "Liderança", score: 8.9, trend: "+0.2", status: "success" },
                     { label: "Ambiente", score: 8.2, trend: "-0.1", status: "ok" },
                     { label: "Carreira", score: 6.4, trend: "-0.5", status: "risk" },
                     { label: "Remuneração", score: 7.8, trend: "+0.8", status: "ok" },
                   ].map(driver => (
                     <div key={driver.label} className="flex flex-col items-center p-6 rounded-3xl border border-border bg-muted/20 text-center hover:scale-[1.02] transition-all">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">{driver.label}</span>
                        <span className={cn("text-3xl font-black mb-2", driver.status === "success" ? "text-success" : driver.status === "risk" ? "text-red-500" : "text-primary")}>{driver.score}</span>
                        <span className={cn("text-[10px] font-bold", driver.trend.startsWith("+") ? "text-success" : "text-red-500")}>{driver.trend}</span>
                     </div>
                   ))}
                </div>
             </div>

              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground">Correlação: Engajamento vs. Turnover</h3>
                    <div className="flex items-center gap-4">
                       <ComparisonLegend period={compPeriod} />
                       <PeriodComparator value={compPeriod} onChange={setCompPeriod} />
                    </div>
                 </div>
                 <div className="h-[250px] w-full">
                    <ChartContainer config={{ score: { label: "Engajamento", color: "#3b82f6" }, score_prev: { label: "Comparação", color: "#94a3b8" } }} className="h-full w-full">
                       <LineChart data={engagementDataWithComparison}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                          <YAxis hide domain={[0, 100]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: "#3b82f6", strokeWidth: 0 }} />
                          {compPeriod !== "none" && (
                             <Line type="monotone" dataKey="score_prev" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 4, fill: "#94a3b8", strokeWidth: 0 }} />
                          )}
                       </LineChart>
                    </ChartContainer>
                 </div>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed italic">"Historicamente, quedas de 5% no engajamento precedem picos de turnover em 45 dias. <span className="text-red-500 font-bold">Ação recomendada imediata.</span>"</p>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-widest text-center">Análise de Sentimento (IA PLN)</h3>
                <div className="aspect-square relative flex items-center justify-center mb-8">
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-4xl font-black text-foreground">82%</span>
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Favorabilidade</span>
                   </div>
                   <div className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value">
                               {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-success/5 border border-success/10 flex items-start gap-3">
                      <Smile className="h-4 w-4 text-success mt-0.5" />
                      <div><p className="text-xs font-bold text-foreground">Pontos Fortes</p><p className="text-[10px] text-muted-foreground">Autonomia, Cultura Colaborativa, Propósito.</p></div>
                   </div>
                   <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div><p className="text-xs font-bold text-foreground">Pontos de Atrito</p><p className="text-[10px] text-muted-foreground">Falta de Clareza em Promoções, Equilíbrio Vida-Trabalho.</p></div>
                   </div>
                </div>
             </div>

             <div className="rounded-3xl bg-[#0F172A] p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10"><BrainCircuit className="h-20 w-20 text-primary" /></div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4"><Sparkles className="h-3 w-3" /> IA Insights Executivos</div>
                <div className="space-y-4 relative">
                   <p className="text-xs font-bold text-white/80 leading-relaxed italic">"Detectamos um padrão de 'silêncio organizacional' na área de Tecnologia. Apesar do eNPS alto, a taxa de feedback espontâneo caiu 40%."</p>
                   <button className="w-full py-2.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">Solicitar Análise Profunda da IA</button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <AppShell activeNav="engajamento-cultura">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {perspective === "admin" ? renderAdminView() : renderCEOView()}
      </main>
    </AppShell>
  );
}
