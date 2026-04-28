import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/talents/AppShell";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSearch } from "@tanstack/react-router";
import {
  Building2,
  ShieldCheck,
  Bell,
  Target,
  BarChart3,
  DollarSign,
  Award,
  Briefcase,
  MessageSquare,
  GraduationCap,
  Video,
} from "lucide-react";

// Import settings components
import { TalentSettings } from "@/components/settings/TalentSettings";
import { StrategySettings } from "@/components/settings/StrategySettings";
import { OperationSettings } from "@/components/settings/OperationSettings";
import { PlatformSettings } from "@/components/settings/PlatformSettings";

export const Route = createFileRoute("/configuracoes")({
  component: ConfigHub,
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
    id: "plataforma",
    label: "Plataforma",
    items: [
      { id: "estrutura", label: "Estrutura Organizacional", icon: Building2 },
      { id: "permissoes", label: "Permissões & Acessos", icon: ShieldCheck },
      { id: "notificacoes", label: "Notificações", icon: Bell },
    ]
  },
  {
    id: "estrategia",
    label: "Estratégia",
    items: [
      { id: "okr", label: "Ciclos de OKR", icon: Target },
      { id: "financeiro", label: "Metas Financeiras", icon: BarChart3 },
      { id: "remuneracao", label: "Remuneração Variável", icon: DollarSign },
    ]
  },
  {
    id: "talentos",
    label: "Talentos",
    items: [
      { id: "competencias", label: "Ciclos de Competências", icon: Award },
      { id: "sucessao", label: "Matriz de Sucessão", icon: Briefcase },
      { id: "feedback", label: "Feedback & PDI", icon: MessageSquare },
    ]
  },
  {
    id: "operacao",
    label: "Operação",
    items: [
      { id: "treinamento", label: "Trilhas de Treinamento", icon: GraduationCap },
      { id: "reuniao", label: "Configuração Reunião+", icon: Video },
    ]
  }
];

function ConfigHub() {
  const search = useSearch({ from: "/configuracoes" }) as any;
  const [activeTab, setActiveTab] = useState(search.tab || "competencias");

  // Determine which component to show
  const renderContent = () => {
    // Platform
    if (["estrutura", "permissoes", "notificacoes"].includes(activeTab)) return <PlatformSettings />;
    // Strategy
    if (["okr", "financeiro", "remuneracao"].includes(activeTab)) return <StrategySettings />;
    // Talent
    if (["competencias", "sucessao", "feedback"].includes(activeTab)) return <TalentSettings />;
    // Operation
    if (["treinamento", "reuniao"].includes(activeTab)) return <OperationSettings />;
    
    return <TalentSettings />; // Default
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
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                          activeTab === item.id
                            ? "bg-primary/5 text-primary shadow-sm ring-1 ring-primary/10"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <item.icon className={cn("h-4 w-4", activeTab === item.id ? "text-primary" : "text-muted-foreground")} />
                        {item.label}
                      </button>
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
