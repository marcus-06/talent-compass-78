import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as ConfiguracoesRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/talents/AppShell";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Video,
  Users,
  SlidersHorizontal,
  Compass,
  BookOpen,
  ListChecks,
  Sparkles,
  Bell,
  ShieldCheck,
  Building2,
  Target,
  BarChart3,
  Award,
  Briefcase,
  GraduationCap,
  MessageSquare,
  DollarSign,
} from "lucide-react";

// Import settings components
import { TalentSettings } from "@/components/settings/TalentSettings";
import { StrategySettings } from "@/components/settings/StrategySettings";
import { OperationSettings } from "@/components/settings/OperationSettings";
import { PlatformSettings } from "@/components/settings/PlatformSettings";
import { CollaboratorSettings } from "@/components/settings/CollaboratorSettings";

export const Route = createFileRoute("/configuracoes")({
  component: ConfigHub,
  validateSearch: (search: Record<string, unknown>) => ({
    tab: typeof search.tab === "string" ? search.tab : "competencias",
  }),
  head: () => ({
    meta: [
      { title: "Central de Configurações · Mereo" },
      {
        name: "description",
        content: "Gerencie todas as features e jornadas da plataforma em um único lugar.",
      },
    ],
  }),
});

const CONFIG_CATEGORIES = [
  {
    id: "config-gerais",
    label: "Configurações Gerais",
    items: [
      { id: "config-plataforma", label: "Configurações da Plataforma", icon: SlidersHorizontal },
      { id: "notificacoes", label: "Notificações", icon: Bell },
    ]
  },
  {
    id: "dados-mestres",
    label: "Dados Mestres",
    items: [
      { id: "colaboradores", label: "Colaboradores", icon: Users },
      { id: "estrutura", label: "Estrutura Organizacional", icon: Building2 },
    ]
  },
  {
    id: "seguranca",
    label: "Segurança e Acessos",
    items: [
      { id: "permissoes", label: "Permissões & Acessos", icon: ShieldCheck },
    ]
  },
  {
    id: "estrategia-resultados",
    label: "Estratégia e Resultados",
    items: [
      { id: "estrategia", label: "Configurações de Estratégia", icon: Compass },
      { id: "okr", label: "Ciclos de OKR", icon: Target },
      { id: "financeiro", label: "Metas Financeiras", icon: BarChart3 },
      { id: "reuniao", label: "Configuração Reunião+", icon: Video },
    ]
  },
  {
    id: "pessoas-talentos",
    label: "Pessoas e Talentos",
    items: [
      { id: "competencias", label: "Ciclos de Competências", icon: Award },
      { id: "sucessao", label: "Matriz de Sucessão", icon: Briefcase },
      { id: "treinamento", label: "Treinamentos", icon: GraduationCap },
    ]
  },
  {
    id: "engajamento-cultura",
    label: "Engajamento e Cultura",
    items: [
      { id: "pesquisas", label: "Configurações de Pesquisas", icon: ListChecks },
      { id: "feedback", label: "Feedback Contínuo", icon: MessageSquare },
      { id: "diario", label: "Diário de Bordo", icon: BookOpen },
    ]
  },
  {
    id: "recompensa-reconhecimento",
    label: "Recompensa e Reconhecimento",
    items: [
      { id: "remuneracao", label: "Remuneração Variável", icon: DollarSign },
      { id: "merito", label: "Mérito/Promoção", icon: Sparkles },
    ]
  }
];

function ConfigHub() {
  // Read the validated search param — safe because validateSearch is declared above
  const { tab: tabParam } = Route.useSearch();
  const [activeTab, setActiveTab] = useState(tabParam ?? "competencias");

  // Sync if the URL search param changes (e.g. navigating from TopNav)
  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  // Determine which component to show
  const renderContent = () => {
    if (activeTab === "colaboradores") return <CollaboratorSettings />;
    if (["config-plataforma", "notificacoes", "estrutura", "permissoes"].includes(activeTab))
      return <PlatformSettings />;
    if (["estrategia", "okr", "financeiro", "reuniao"].includes(activeTab))
      return <StrategySettings />;
    if (["competencias", "sucessao", "treinamento", "pesquisas", "feedback", "diario"].includes(activeTab))
      return <TalentSettings />;
    if (["remuneracao", "merito"].includes(activeTab))
      return <OperationSettings />;
    return <TalentSettings />;
  };

  return (
    <AppShell activeNav="config">
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Configurações Gerais
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            Central de Configuração
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie todas as features e jornadas da plataforma em um único lugar.
          </p>
        </header>

        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="w-64 shrink-0">
            <nav className="space-y-8">
              {CONFIG_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                    {cat.label}
                  </p>
                  <div className="space-y-1">
                    {cat.items.map((item) => (
                      <Link
                        key={item.id}
                        to="/configuracoes"
                        search={{ tab: item.id }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                          activeTab === item.id
                            ? "bg-primary/5 text-primary shadow-sm ring-1 ring-primary/10"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <item.icon className={cn("h-4 w-4", activeTab === item.id ? "text-primary" : "text-muted-foreground")} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
