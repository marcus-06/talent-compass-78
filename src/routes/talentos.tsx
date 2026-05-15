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
  Sparkles,
  Zap,
  BrainCircuit,
  Search,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Filter
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
  BarChart,
  Bar,
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
import { usePerspective } from "@/hooks/usePerspective";

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
  { day: "15", completed: 70, performance: 65 },
  { day: "30", completed: 94, performance: 92 },
];

function TalentDashboard() {
  const { perspective } = usePerspective();
  const [view, setView] = useState<"dashboard" | "settings">("dashboard");

  const renderAdminView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-foreground">Gestão de Performance</h1>
            <p className="text-sm text-muted-foreground">Controle de ciclos, calibragem e desenvolvimento.</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-primary/90 transition-all">
             <Plus className="h-4 w-4" /> Iniciar Ciclo
          </button>
       </header>

       <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="px-8 pb-7 pt-8 bg-muted/10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-[10px] font-black uppercase text-success tracking-widest">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                  Ciclo vigente · 2024.1
                </div>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground">Calibragem de Talentos</h2>
                <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-tight">
                  <Calendar className="h-3.5 w-3.5" /> 03 mar · 30 jun 2024 • 1.248 participantes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold text-muted-foreground transition-colors hover:bg-secondary">Ver detalhes</button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2 text-xs font-bold text-background transition-colors hover:bg-foreground/90 shadow-md">Continuar <ArrowRight className="h-3.5 w-3.5" /></button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="p-4 rounded-2xl bg-card border border-border/50">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Progresso geral</p>
                <div className="mt-2 flex items-baseline gap-2"><span className="text-3xl font-black text-foreground">64%</span></div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-success transition-all duration-1000" style={{ width: "64%" }} /></div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/50">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Etapa atual</p>
                <p className="mt-2 text-lg font-black text-foreground uppercase tracking-tight">Calibragem</p>
                <p className="text-[10px] font-bold text-muted-foreground italic">Encerra em 8 dias</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/50">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Alertas Críticos</p>
                <p className="mt-2 inline-flex items-center gap-2 text-lg font-black text-amber-600 uppercase tracking-tight">
                   <AlertCircle className="h-4 w-4" /> 12 Atrasos
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 bg-card px-8 py-6"><CycleStepper steps={steps} /></div>
       </section>

       <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Adesão por Departamento</h3>
                <div className="flex items-center gap-2">
                   <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"><Filter className="h-4 w-4" /></button>
                </div>
             </div>
             <div className="space-y-4">
                {[
                  { name: "Produto", progress: 92, status: "ok" },
                  { name: "Vendas", progress: 45, status: "risk" },
                  { name: "Engenharia", progress: 78, status: "ok" },
                  { name: "RH", progress: 100, status: "done" },
                ].map(dept => (
                  <div key={dept.name} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-muted/20 transition-all cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground font-bold text-xs">{dept.name.charAt(0)}</div>
                        <div><p className="text-sm font-bold text-foreground">{dept.name}</p><p className="text-[10px] text-muted-foreground font-bold">128 Colaboradores</p></div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-right"><p className="text-sm font-black text-foreground">{dept.progress}%</p></div>
                        <div className="h-10 w-1 bg-border rounded-full"><div className={cn("w-full bg-success transition-all duration-1000", dept.status === "risk" ? "bg-amber-500" : "bg-success")} style={{ height: `${dept.progress}%` }} /></div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
             <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">Resumo da Força</h3>
             <div className="aspect-square relative flex items-center justify-center">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                   <span className="text-4xl font-black text-foreground">1.2k</span>
                   <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Staff</span>
                </div>
                <div className="h-full w-full rotate-[-90deg]">
                   <svg viewBox="0 0 100 100" className="h-full w-full">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--secondary)" strokeWidth="10" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--primary)" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="75.36" strokeLinecap="round" />
                   </svg>
                </div>
             </div>
             <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-primary" /><span className="text-xs font-bold text-muted-foreground uppercase">Ativos</span></div><span className="text-xs font-black">942</span></div>
                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-secondary" /><span className="text-xs font-bold text-muted-foreground uppercase">Afastados</span></div><span className="text-xs font-black">258</span></div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderCEOView = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Inteligência de Talentos & Sucessão</h1>
            <p className="text-sm text-muted-foreground">Mapeamento de sucessão, prontidão e risco de talentos críticos.</p>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0F172A] text-white shadow-xl">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg"><Zap className="h-5 w-5" /></div>
             <div>
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">IA Prontidão do Time</p>
                <p className="text-xs font-bold italic">"Prontidão de liderança subiu 12% este mês"</p>
             </div>
          </div>
       </header>

       <div className="grid gap-6 md:grid-cols-4">
          {[
            { label: "Prontidão de Sucessores", value: "68%", trend: "+12%", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Altos Potenciais", value: "142", trend: "+5", icon: Sparkles, color: "text-primary", bg: "bg-primary/10" },
            { label: "Risco de Saída", value: "8.2%", trend: "-2.1%", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "Diversidade em Liderança", value: "42%", trend: "+3%", icon: Users, color: "text-success", bg: "bg-success/10" },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all group">
               <div className="flex items-center justify-between mb-4">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", stat.bg, stat.color)}><stat.icon className="h-5 w-5" /></div>
                  <span className={cn("text-[9px] font-black px-2 py-1 rounded-full", stat.trend.startsWith("+") ? "bg-success/10 text-success" : "bg-red-500/10 text-red-500")}>{stat.trend}</span>
               </div>
               <p className="text-2xl font-black text-foreground">{stat.value}</p>
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
       </div>

       <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-3xl border border-border bg-card p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div><h3 className="text-lg font-bold text-foreground">Pipeline de Liderança</h3><p className="text-xs text-muted-foreground">Mapeamento de prontidão por níveis organizacionais.</p></div>
                <div className="flex items-center gap-2"><span className="text-[10px] font-black text-primary uppercase tracking-widest">Ver Mapa Completo</span></div>
             </div>
             <div className="space-y-10">
                {[
                  { level: "C-Level / Diretoria", ready: 85, bench: 4, health: "strong" },
                  { level: "Gerência Executiva", ready: 52, bench: 12, health: "at-risk" },
                  { level: "Coordenação / Supervisão", ready: 70, bench: 45, health: "moderate" },
                ].map(row => (
                  <div key={row.level} className="group relative">
                     <div className="flex items-center justify-between mb-3"><p className="text-sm font-bold text-foreground">{row.level}</p><p className="text-xs font-black text-muted-foreground uppercase">{row.bench} Sucessores Mapeados</p></div>
                     <div className="h-3 w-full bg-secondary rounded-full overflow-hidden relative shadow-inner">
                        <div className={cn("h-full transition-all duration-1000", row.health === "strong" ? "bg-success" : row.health === "at-risk" ? "bg-red-500" : "bg-primary")} style={{ width: `${row.ready}%` }} />
                     </div>
                     <div className="flex items-center justify-between mt-2 text-[10px] font-black uppercase tracking-widest">
                        <span className="text-muted-foreground">Prontidão Médio</span>
                        <span className={cn(row.health === "strong" ? "text-success" : row.health === "at-risk" ? "text-red-500" : "text-primary")}>{row.ready}% Prontos</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
             <div className="rounded-3xl border border-border bg-card p-6 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><BrainCircuit className="h-20 w-20 text-primary" /></div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4"><Sparkles className="h-3 w-3" /> Recomendação IA</div>
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                   <p className="text-xs font-bold text-foreground leading-relaxed">"O nível de <span className="text-primary">Gerência Executiva</span> apresenta um gap de sucessão crítico. Recomenda-se um programa acelerado de desenvolvimento para o time de Produto."</p>
                </div>
                <button className="w-full mt-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all">Aprovar Plano de Formação</button>
             </div>
             <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-4">Top 5 Talentos Críticos (Risco de Saída)</h3>
                <div className="space-y-3">
                   {[
                     { name: "Milena Vieira", risk: "Baixo", engagement: 95 },
                     { name: "Bruno Costa", risk: "Alto", engagement: 40 },
                   ].map(u => (
                     <div key={u.name} className="flex items-center justify-between p-3 rounded-2xl border border-border hover:bg-secondary/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                           <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold text-[10px]">{u.name.charAt(0)}</div>
                           <div><p className="text-[11px] font-bold text-foreground">{u.name}</p><p className="text-[9px] text-muted-foreground uppercase font-black">Risco {u.risk}</p></div>
                        </div>
                        <div className={cn("h-1.5 w-1.5 rounded-full", u.risk === "Alto" ? "bg-red-500 animate-pulse" : "bg-success")} />
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <AppShell activeNav="pessoas-talentos">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {perspective === "admin" ? renderAdminView() : renderCEOView()}
      </main>
    </AppShell>
  );
}
