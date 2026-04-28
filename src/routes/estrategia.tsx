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
import {
  Zap,
  Calculator,
  PieChart,
  FileText,
} from "lucide-react";

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
  { month: "Jan", progress: 10 },
  { month: "Fev", progress: 25 },
  { month: "Mar", progress: 38 },
  { month: "Abr", progress: 48 },
];

const financeData = [
  { month: "Jan", budget: 120, actual: 110, roi: 12 },
  { month: "Fev", budget: 130, actual: 125, roi: 15 },
  { month: "Mar", budget: 125, actual: 140, roi: 18 },
  { month: "Abr", budget: 150, actual: 145, roi: 22 },
  { month: "Mai", budget: 140, actual: 160, roi: 25 },
  { month: "Jun", budget: 160, actual: 155, roi: 28 },
];

const areaRoiData = [
  { name: "Vendas", value: 32, color: "#3b82f6" },
  { name: "Produto", value: 24, color: "#10b981" },
  { name: "Marketing", value: 18, color: "#f59e0b" },
  { name: "CS", value: 15, color: "#ef4444" },
  { name: "RH", value: 11, color: "#8b5cf6" },
];

function StrategyDashboard() {
  const search = useSearch({ from: "/estrategia" }) as any;
  const navigate = useNavigate();
  const [localView, setLocalView] = useState<"dashboard" | "settings">("dashboard");

  // Sync search param with local state or use param directly
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

  return (
    <AppShell activeNav="estrategia">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Módulo de Estratégia · {
                activeTab === "dashboard" ? "Dashboard" : 
                activeTab === "financeiro" ? "Análise Financeira" : "Configurações"
              }
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              {
                activeTab === "dashboard" ? "Direcionamento & Performance" : 
                activeTab === "financeiro" ? "Saúde Financeira & ROI" : "Configurações Estratégicas"
              }
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {
                activeTab === "dashboard" ? "Acompanhe os objetivos estratégicos e resultados-chave." : 
                activeTab === "financeiro" ? "Exemplo de como o ROI dos OKRs e KPIs financeiros seriam exibidos." : 
                "Defina os ciclos de OKR, metas e regras de remuneração."
              }
            </p>
          </div>
        </div>

        {/* Sub-navigation Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {MENUS.find(m => m.key === "estrategia")?.groups?.[0]?.items.map((item) => {
             const isFinanceLink = item.label === "Análise financeira";
             const isActive = isFinanceLink ? activeTab === "financeiro" : (activeTab === "dashboard" && !isFinanceLink);
             
             return (
               <button
                 key={item.label}
                 onClick={() => setView(isFinanceLink ? "financeiro" : "dashboard")}
                 className={cn(
                   "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                   isActive
                     ? "border-accent bg-accent text-accent-foreground shadow-sm"
                     : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:bg-secondary hover:text-foreground"
                 )}
               >
                 <item.icon className="h-3.5 w-3.5" />
                 {item.label}
               </button>
             );
          })}
          <button
            onClick={() => setView(activeTab === "settings" ? "dashboard" : "settings")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition-all shadow-sm",
              activeTab === "settings"
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-accent hover:border-accent/40 hover:bg-accent/5"
            )}
          >
            <Settings2 className="h-3.5 w-3.5" />
            {activeTab === "settings" ? "Voltar ao Dashboard" : "Configurações"}
          </button>
        </div>

        {activeTab === "dashboard" && (
          <>
            <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="OKRs em andamento"
            value="24"
            icon={Target}
            tone="default"
            trend={{ value: "12 times ativos", positive: true }}
          />
          <StatCard
            label="Progresso Geral"
            value="48%"
            icon={TrendingUp}
            tone="success"
            trend={{ value: "+5% esta semana", positive: true }}
          />
          <StatCard
            label="Metas Batidas"
            value="156"
            icon={CheckCircle2}
            tone="success"
          />
          <StatCard
            label="Riscos Detectados"
            value="3"
            icon={AlertCircle}
            tone="warning"
          />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Evolução do Ciclo</h3>
                  <p className="text-xs text-muted-foreground">Progresso médio dos OKRs corporativos</p>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-secondary/50 p-1">
                  {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                    <button
                      key={q}
                      className={cn(
                        "rounded px-3 py-1 text-[10px] font-medium transition-colors",
                        q === "Q2" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-[240px] w-full">
                <ChartContainer
                  config={{
                    progress: { label: "Progresso OKR", color: "#3b82f6" },
                  }}
                  className="h-full w-full"
                >
                  <LineChart data={okrProgressData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    />
                    <YAxis
                      hide
                      domain={[0, 100]}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 0, fill: "#3b82f6" }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">OKRs Corporativos</h3>
              <button className="text-sm font-medium text-accent hover:underline">Ver mapa completo</button>
            </div>
            <div className="space-y-4">
              <OKRCard
                title="Expandir presença no mercado LATAM"
                progress={72}
                krs={[
                  "Alcançar 100 novos clientes no México",
                  "Estabelecer parceria com 3 distribuidores locais",
                ]}
              />
              <OKRCard
                title="Consolidar eficiência operacional"
                progress={35}
                krs={[
                  "Reduzir custo de aquisição (CAC) em 15%",
                  "Aumentar NPS para 85+",
                ]}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Visão por Área</h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span>Produto</span>
                  <div className="h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-success" style={{ width: "85%" }} />
                  </div>
                  <span>85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Vendas</span>
                  <div className="h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-warning" style={{ width: "42%" }} />
                  </div>
                  <span>42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>CS</span>
                  <div className="h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-info" style={{ width: "60%" }} />
                  </div>
                  <span>60%</span>
                </div>
              </div>
            </div>
          </div>
            </section>
          </>
        )}

        {activeTab === "financeiro" && (
          <div className="mt-8">
            <FinancialAnalysisView />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="mt-8">
            <StrategySettings />
          </div>
        )}
      </main>
    </AppShell>
  );
}

function FinancialAnalysisView() {
  return (
    <div className="space-y-24 py-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent ring-1 ring-accent/20">
          <Zap className="h-3.5 w-3.5" /> Módulo Business Intelligence
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
          A Ponte entre sua <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">Estratégia</span> e o <span className="italic">Caixa.</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Pare de olhar apenas para o progresso das tarefas. Comece a enxergar o 
          <strong> ROI real</strong> de cada KR e a saúde financeira da sua organização em tempo real.
        </p>
        <div className="pt-4">
           <button className="h-14 px-10 rounded-full bg-accent text-accent-foreground font-bold text-base shadow-[var(--shadow-xl)] hover:scale-105 transition-all">
             Agendar Demonstração Gratuita
           </button>
        </div>
      </section>

      {/* Abstract Visualization Teaser */}
      <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-[var(--shadow-2xl)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-blue-500/5" />
        <div className="relative aspect-[21/9] w-full flex items-center justify-center p-8 overflow-hidden group">
           {/* Mock Blurred UI */}
           <div className="w-full h-full opacity-25 blur-xl select-none pointer-events-none scale-110 flex items-center justify-center gap-12">
              <BarChart3 className="h-48 w-48 text-accent" strokeWidth={0.5} />
              <TrendingUp className="h-64 w-64 text-accent" strokeWidth={0.5} />
              <PieChart className="h-48 w-48 text-accent" strokeWidth={0.5} />
           </div>
           
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-card/60 border border-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center max-w-md transform transition-transform group-hover:scale-105">
                 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/20">
                    <ShieldCheck className="h-7 w-7" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Visibilidade Total & Segura</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   Integre seus dados de faturamento, EBITDA e Budget diretamente aos OKRs corporativos.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Benefit Grid */}
      <section className="grid gap-12 md:grid-cols-3 text-center">
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary">
            <TrendingUp className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">ROI em Tempo Real</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            Saiba exatamente quanto cada objetivo estratégico está gerando de valor financeiro para a companhia.
          </p>
        </div>
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Calculator className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">Previsibilidade (Forecast)</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            Algoritmos inteligentes que projetam o fechamento do trimestre baseado no progresso real da operação.
          </p>
        </div>
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Zap className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">Integração ERP Nativa</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            Conecte SAP, Totvs, Oracle ou Excel em poucos cliques e centralize sua inteligência de gestão.
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="rounded-3xl bg-secondary/50 p-12 text-center border border-border/50">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Confiança das Maiores Gestoras do Brasil
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
           <span className="text-2xl font-black italic tracking-tighter">FINANCE.CO</span>
           <span className="text-2xl font-black italic tracking-tighter">GLOBAL.CORP</span>
           <span className="text-2xl font-black italic tracking-tighter">TRIPLE.AAA</span>
           <span className="text-2xl font-black italic tracking-tighter">ELITE.BANK</span>
        </div>
      </section>

      {/* Social Proof / Call to Action Footer */}
      <section className="text-center space-y-10 pb-12">
        <div className="max-w-2xl mx-auto italic text-lg text-foreground font-medium border-l-4 border-accent pl-8 py-4 bg-secondary/30 rounded-r-2xl">
          "A integração financeira da Mereo mudou a forma como nossos diretores discutem estratégia. Agora, cada decisão é baseada em retorno real, não apenas em entrega de prazos."
          <span className="block mt-4 text-xs not-italic font-bold text-muted-foreground uppercase tracking-widest">— CFO, Multinacional Logística</span>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Pronto para elevar sua gestão?</h2>
          <p className="text-muted-foreground">Experimente a potência dos OKRs financeiros hoje mesmo.</p>
          <div className="flex justify-center gap-4 pt-4">
            <button className="h-14 px-12 rounded-full bg-foreground text-background font-bold hover:bg-foreground/90 transition-all">
              Agendar Demo
            </button>
            <button className="h-14 px-8 rounded-full border border-border bg-card font-bold hover:bg-secondary transition-all">
              Falar com Consultor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function OKRCard({ title, progress, krs }: { title: string; progress: number; krs: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground text-sm">{title}</h4>
        <span className="text-sm font-bold text-accent">{progress}%</span>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <ul className="mt-4 space-y-2">
        {krs.map((kr, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3 w-3 text-success" />
            {kr}
          </li>
        ))}
      </ul>
    </div>
  );
}
