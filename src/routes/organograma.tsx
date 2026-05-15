import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/talents/AppShell";
import { Search, ZoomIn, ZoomOut, Edit3, Shield, Users, X, Star, AlertTriangle, TrendingUp, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organograma")({
  component: OrgChartPage,
  head: () => ({ meta: [{ title: "Organograma · Talent OS" }] }),
});

type SuccessionStatus = "ready" | "developing" | "none";
type PerfLevel = "A" | "M" | "B";

interface Successor { name: string; role: string; readiness: "1-2 anos" | "Gap alto" | "Pronto"; }
interface NextStep { title: string; readiness: "1-2 anos" | "Gap alto"; }

interface OrgNode {
  id: string; name: string; role: string; department: string;
  perf: PerfLevel; potential: PerfLevel;
  nineBox: string; riskLevel: "Alto" | "Médio" | "Baixo";
  successionStatus: SuccessionStatus;
  isAtRisk?: boolean; isEmpty?: boolean;
  successors?: Successor[]; nextSteps?: NextStep[];
  children?: OrgNode[];
}

const DEPT_COLORS: Record<string, string> = {
  "Exec": "bg-purple-500", "Comercial": "bg-blue-500",
  "Ops": "bg-amber-500", "RH": "bg-emerald-500",
};

const SUCCESSION_DOT: Record<SuccessionStatus, string> = {
  ready: "bg-emerald-500", developing: "bg-amber-400", none: "bg-red-500",
};

const PERF_LABEL: Record<PerfLevel, string> = { A: "Alta", M: "Média", B: "Baixa" };

const ORG: OrgNode = {
  id: "1", name: "Rafael Montenegro", role: "Diretor Executivo", department: "Exec",
  perf: "A", potential: "A", nineBox: "Estrela", riskLevel: "Baixo",
  successionStatus: "developing",
  successors: [{ name: "Carla Menezes", role: "Gerente Comercial", readiness: "1-2 anos" }, { name: "Bruno Ferrari", role: "Gerente de Operações", readiness: "Gap alto" }],
  nextSteps: [{ title: "Conselho Consultivo", readiness: "1-2 anos" }],
  children: [
    {
      id: "2", name: "Carla Menezes", role: "Gerente Comercial", department: "Comercial",
      perf: "A", potential: "A", nineBox: "Estrela", riskLevel: "Baixo",
      successionStatus: "ready",
      successors: [{ name: "Lucas Andrade", role: "Coordenador Comercial", readiness: "1-2 anos" }],
      nextSteps: [{ title: "Diretor Comercial", readiness: "1-2 anos" }],
      children: [
        { id: "5", name: "Lucas Andrade", role: "Coordenador Comercial", department: "Comercial", perf: "M", potential: "A", nineBox: "Alto Potencial", riskLevel: "Baixo", successionStatus: "developing", successors: [], nextSteps: [{ title: "Gerente Comercial", readiness: "1-2 anos" }] },
        { id: "6", isEmpty: true, name: "", role: "Coord. Pré-vendas", department: "Comercial", perf: "M", potential: "M", nineBox: "—", riskLevel: "Alto", successionStatus: "none" },
      ],
    },
    {
      id: "3", name: "Bruno Ferrari", role: "Gerente de Operações", department: "Ops",
      perf: "A", potential: "M", nineBox: "Efetivo", riskLevel: "Médio",
      successionStatus: "developing", isAtRisk: true,
      successors: [{ name: "Mariana Costa", role: "Coord. Operações", readiness: "Gap alto" }],
      nextSteps: [{ title: "Diretor de Operações", readiness: "Gap alto" }],
      children: [
        { id: "7", name: "Mariana Costa", role: "Coord. de Operações", department: "Ops", perf: "A", potential: "M", nineBox: "Efetivo", riskLevel: "Baixo", successionStatus: "developing", successors: [], nextSteps: [] },
        { id: "8", isEmpty: true, name: "", role: "Coord. de Logística", department: "Ops", perf: "M", potential: "M", nineBox: "—", riskLevel: "Alto", successionStatus: "none" },
      ],
    },
    {
      id: "4", name: "Ana Paula Lima", role: "Gerente de Gente", department: "RH",
      perf: "M", potential: "A", nineBox: "Alto Potencial", riskLevel: "Alto",
      successionStatus: "none", isAtRisk: true,
      successors: [], nextSteps: [{ title: "Diretora de RH", readiness: "Gap alto" }],
      children: [
        { id: "9", name: "Felipe Rocha", role: "Coord. de RH", department: "RH", perf: "M", potential: "M", nineBox: "Core", riskLevel: "Alto", successionStatus: "none", isAtRisk: true, successors: [], nextSteps: [] },
      ],
    },
  ],
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

function OrgCard({ node, onSelect, selectedId, layers }: { node: OrgNode; onSelect: (n: OrgNode) => void; selectedId: string | null; layers: Record<string, boolean> }) {
  const isSelected = selectedId === node.id;
  const deptColor = DEPT_COLORS[node.department] ?? "bg-primary";

  return (
    <button
      onClick={() => !node.isEmpty && onSelect(node)}
      className={cn(
        "relative flex flex-col items-start w-44 rounded-2xl border-2 p-3 transition-all text-left group",
        node.isEmpty ? "border-dashed border-border bg-muted/20 opacity-60 cursor-default" :
          node.isAtRisk && layers.riskLoss ? "border-destructive/40 bg-destructive/[0.04]" :
          isSelected ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-border bg-card hover:border-primary/40 hover:shadow-md cursor-pointer"
      )}
    >
      {/* Succession dot */}
      {!node.isEmpty && layers.succession && (
        <span className={cn("absolute -top-2 -right-2 h-4 w-4 rounded-full border-2 border-card shadow", SUCCESSION_DOT[node.successionStatus])} title={node.successionStatus === "ready" ? "Sucessor pronto" : node.successionStatus === "developing" ? "Em desenvolvimento" : "Sem sucessor"} />
      )}

      {/* Risk dot for medium/high */}
      {!node.isEmpty && layers.riskLoss && node.riskLevel !== "Baixo" && (
        <span className="absolute -top-2 -left-2 h-4 w-4 rounded-full border-2 border-card bg-amber-400 shadow" title={`Risco ${node.riskLevel}`} />
      )}

      <div className="flex items-center gap-2 w-full">
        <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center font-bold text-white text-[10px] shrink-0 shadow-sm", node.isEmpty ? "bg-muted border-2 border-dashed border-border" : deptColor)}>
          {node.isEmpty ? <Users className="h-3.5 w-3.5 text-muted-foreground" /> : initials(node.name)}
        </div>
        <div className="min-w-0">
          <p className={cn("text-[11px] font-bold leading-tight truncate", node.isEmpty ? "text-muted-foreground italic" : "text-foreground")}>
            {node.isEmpty ? "Posição vaga" : node.name}
          </p>
          <p className="text-[9px] text-muted-foreground truncate">{node.role}</p>
        </div>
      </div>

      {/* Layer indicators */}
      {!node.isEmpty && (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {layers.performance && (
            <span className={cn("text-[8px] font-black", node.perf === "A" ? "text-emerald-600" : node.perf === "M" ? "text-amber-600" : "text-red-500")}>P:{node.perf}</span>
          )}
          {layers.potential && (
            <span className={cn("text-[8px] font-black", node.potential === "A" ? "text-blue-600" : node.potential === "M" ? "text-purple-600" : "text-muted-foreground")}>Pot:{node.potential}</span>
          )}
          {node.isAtRisk && layers.riskLoss && (
            <span className="flex items-center gap-0.5 text-[8px] font-black text-red-500"><AlertTriangle className="h-2.5 w-2.5" /> Risco</span>
          )}
        </div>
      )}
    </button>
  );
}

function OrgLevel({ nodes, depth, onSelect, selectedId, layers }: { nodes: OrgNode[]; depth: number; onSelect: (n: OrgNode) => void; selectedId: string | null; layers: Record<string, boolean> }) {
  const [collapsed, setCollapsed] = useState(false);
  const labels = ["Nível 1 · Diretoria", "Nível 2 · Gerências", "Nível 3 · Coordenações", "Nível 4 · Especialistas"];
  const allChildren = nodes.flatMap(n => n.children ?? []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3 mb-4 self-start">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">{labels[depth] ?? `Nível ${depth + 1}`}</span>
        <div className="h-px bg-border/50 w-16" />
        {allChildren.length > 0 && (
          <button onClick={() => setCollapsed(!collapsed)} className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card hover:bg-secondary transition-all">
            {collapsed ? <ChevronRight className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {nodes.map(node => <OrgCard key={node.id} node={node} onSelect={onSelect} selectedId={selectedId} layers={layers} />)}
      </div>
      {!collapsed && allChildren.length > 0 && (
        <>
          <div className="h-6 w-px bg-border/50 mt-4" />
          <OrgLevel nodes={allChildren} depth={depth + 1} onSelect={onSelect} selectedId={selectedId} layers={layers} />
        </>
      )}
    </div>
  );
}

function SuccessionPanel({ node, onClose }: { node: OrgNode; onClose: () => void }) {
  const deptColor = DEPT_COLORS[node.department] ?? "bg-primary";

  return (
    <div className="w-72 shrink-0 border-l border-border bg-background overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header — dark like AI cards in the platform */}
      <div className="flex items-center justify-between p-5 bg-[#0F172A] text-white">
        <div className="flex items-center gap-3">
          <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center font-black text-white text-sm shadow-lg", deptColor)}>{initials(node.name)}</div>
          <div>
            <p className="font-black text-sm text-white leading-tight">{node.name}</p>
            <p className="text-[10px] text-white/60">{node.role}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"><X className="h-4 w-4 text-white/70" /></button>
      </div>

      <div className="p-4 space-y-5">
        {/* 4-box metrics */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "PERFORMANCE", value: PERF_LABEL[node.perf] },
            { label: "POTENCIAL", value: PERF_LABEL[node.potential] },
            { label: "9-BOX", value: node.nineBox },
            { label: "RISCO DE PERDA", value: node.riskLevel },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 rounded-2xl bg-card border border-border shadow-sm">
              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
              <p className="text-sm font-black text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Successors */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black text-foreground flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-muted-foreground" /> Sucessores</p>
            <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full", node.successionStatus === "ready" ? "bg-emerald-500/10 text-emerald-600" : node.successionStatus === "developing" ? "bg-amber-400/15 text-amber-600" : "bg-red-500/10 text-red-500")}>
              {node.successionStatus === "ready" ? "Pronto" : node.successionStatus === "developing" ? "Em desenvolvimento" : "Sem sucessor"}
            </span>
          </div>
          {node.successors && node.successors.length > 0 ? (
            <div className="space-y-2">
              {node.successors.map(s => (
                <div key={s.name} className="flex items-center justify-between p-3 rounded-2xl border border-border bg-card hover:bg-secondary/40 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-[9px]">{initials(s.name)}</div>
                    <div><p className="text-[10px] font-bold text-foreground">{s.name}</p><p className="text-[9px] text-muted-foreground">{s.role}</p></div>
                  </div>
                  <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full", s.readiness === "Pronto" ? "bg-success text-white" : s.readiness === "1-2 anos" ? "bg-primary text-white" : "bg-destructive/80 text-white")}>
                    {s.readiness}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-border text-center">
              <p className="text-xs text-muted-foreground italic">Nenhum sucessor indicado.</p>
              <button className="mt-2 text-[10px] font-black text-primary hover:underline">+ Indicar Sucessor</button>
            </div>
          )}
        </div>

        {/* Next steps */}
        {node.nextSteps && node.nextSteps.length > 0 && (
          <div>
            <p className="text-xs font-black text-foreground flex items-center gap-1.5 mb-3"><Star className="h-3.5 w-3.5 text-muted-foreground" /> Próximos passos</p>
            <div className="space-y-2">
              {node.nextSteps.map(ns => (
                <div key={ns.title} className="flex items-center justify-between p-3 rounded-2xl border border-border bg-card">
                  <p className="text-[11px] font-bold text-foreground">{ns.title}</p>
                  <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full", ns.readiness === "1-2 anos" ? "bg-primary text-white" : "bg-destructive/80 text-white")}>{ns.readiness}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-border text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
          <ExternalLink className="h-3.5 w-3.5" /> Ver perfil completo
        </button>
      </div>
    </div>
  );
}

function OrgChartPage() {
  const [selected, setSelected] = useState<OrgNode | null>(null);
  const [zoom, setZoom] = useState(90);
  const [search, setSearch] = useState("");
  const [layers, setLayers] = useState({ performance: true, potential: false, riskLoss: true, succession: true });

  const toggleLayer = (k: keyof typeof layers) => setLayers(prev => ({ ...prev, [k]: !prev[k] }));

  // KPI counts
  const countNodes = (node: OrgNode): OrgNode[] => [node, ...(node.children?.flatMap(countNodes) ?? [])];
  const all = countNodes(ORG).filter(n => !n.isEmpty);
  const kpis = [
    { label: "Posições sem sucessor", value: all.filter(n => n.successionStatus === "none").length, valueColor: "text-red-500", dot: "bg-red-500", icon: "🔴" },
    { label: "Alto risco de perda", value: all.filter(n => n.riskLevel === "Alto").length, valueColor: "text-amber-500", dot: "bg-amber-400", icon: "🟡" },
    { label: "Prontos para promoção", value: all.filter(n => n.successionStatus === "ready").length, valueColor: "text-success", dot: "bg-success", icon: "🌟" },
  ];

  return (
    <AppShell activeNav="pessoas-talentos">
      <main className="flex flex-col h-[calc(100vh-56px)]">
        {/* Top bar */}
        <div className="border-b border-border bg-card px-6 py-3 flex items-center gap-4 flex-wrap">
          <div>
            <h1 className="text-sm font-black text-foreground">Organograma de Sucessão</h1>
            <p className="text-[10px] text-muted-foreground">Estrutura hierárquica com prontidão e risco de talentos</p>
          </div>
          <div className="relative ml-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar colaborador..." className="h-8 w-52 rounded-lg border border-border bg-background pl-9 pr-4 text-xs focus:outline-none focus:border-primary/40 transition-all" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-all"><ZoomOut className="h-3.5 w-3.5 text-muted-foreground" /></button>
            <span className="text-[10px] font-black text-muted-foreground w-8 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-all"><ZoomIn className="h-3.5 w-3.5 text-muted-foreground" /></button>
            <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-1.5 text-[10px] font-black text-white hover:bg-primary/90 transition-all shadow-sm ml-2">
              <Edit3 className="h-3 w-3" /> Editar
            </button>
          </div>
        </div>

        {/* KPIs + Layers */}
        <div className="border-b border-border bg-card/60 px-6 py-3 space-y-3">
          <div className="flex gap-3 flex-wrap">
            {kpis.map(k => (
              <div key={k.label} className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all">
                <span className={cn("h-3 w-3 rounded-full shrink-0", k.dot)} />
                <span className={cn("text-2xl font-black", k.valueColor)}>{k.value}</span>
                <span className="text-xs font-bold text-muted-foreground">{k.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Camadas de visualização</span>
            {[
              { key: "performance" as const, label: "Performance" },
              { key: "potential" as const, label: "Potencial" },
              { key: "riskLoss" as const, label: "Risco de perda" },
              { key: "succession" as const, label: "Prontidão de sucessão" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => toggleLayer(key)} className="flex items-center gap-2 group">
                <div className={cn("h-5 w-9 rounded-full transition-all relative border", layers[key] ? "bg-primary border-primary" : "bg-muted border-border")}>
                  <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all", layers[key] ? "left-4" : "left-0.5")} />
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto bg-muted/20 p-8">
            <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center", transition: "transform 0.3s" }}>
              <div className="flex flex-col items-center">
                {/* Root node */}
                <button
                  onClick={() => setSelected(ORG)}
                  className={cn("relative flex items-center gap-3 w-52 rounded-2xl border-2 p-4 transition-all shadow-lg cursor-pointer",
                    selected?.id === ORG.id ? "border-primary bg-primary/5 shadow-primary/10" : "border-primary/30 bg-card hover:border-primary hover:shadow-xl"
                  )}
                >
                  {layers.succession && <span className={cn("absolute -top-2 -right-2 h-4 w-4 rounded-full border-2 border-card shadow", SUCCESSION_DOT[ORG.successionStatus])} />}
                  <div className="h-10 w-10 rounded-xl bg-purple-500 flex items-center justify-center font-black text-white text-sm shadow">RM</div>
                  <div className="text-left">
                    <p className="font-black text-sm text-foreground leading-tight">{ORG.name}</p>
                    <p className="text-[9px] text-muted-foreground">{ORG.role}</p>
                    {layers.performance && <span className="text-[8px] font-black text-emerald-600">P:{ORG.perf}</span>}
                  </div>
                </button>
                <div className="h-6 w-px bg-border/50 mt-0" />
                {ORG.children && <OrgLevel nodes={ORG.children} depth={0} onSelect={setSelected} selectedId={selected?.id ?? null} layers={layers} />}
              </div>
            </div>
          </div>
          {selected && <SuccessionPanel node={selected} onClose={() => setSelected(null)} />}
        </div>

        {/* Legend */}
        <div className="border-t border-border bg-card px-6 py-2.5 flex items-center gap-6">
          {[{ color: "bg-emerald-500", label: "Sucessor pronto" }, { color: "bg-amber-400", label: "Em desenvolvimento" }, { color: "bg-red-500", label: "Sem sucessor" }].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
              <span className={cn("h-2.5 w-2.5 rounded-full", color)} /> {label}
            </span>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
