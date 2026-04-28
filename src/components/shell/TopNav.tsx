import { Link } from "@tanstack/react-router";
import {
  Bell,
  Search,
  Sparkles,
  Target,
  Crosshair,
  Compass,
  Users,
  GraduationCap,
  Briefcase,
  Award,
  ListChecks,
  Building2,
  Workflow,
  FileText,
  Settings,
  SlidersHorizontal,
  ShieldCheck,
  Plug,
  ChevronDown,
  BarChart3,
  DollarSign,
  MessageSquare,
  BookOpen,
  Video,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

interface MenuDef {
  key: "inicio" | "estrategia" | "talentos" | "operacao" | "config";
  label: string;
  href?: string;
  groups?: MenuGroup[];
}

export const MENUS: MenuDef[] = [
  { key: "inicio", label: "Início", href: "/" },
  {
    key: "estrategia",
    label: "Estratégia",
    href: "/estrategia",
    groups: [
      {
        title: "Estratégia & Performance",
        items: [
          { label: "Metas e OKR", description: "Objetivos e resultados-chave", icon: Target, href: "/estrategia" },
          { label: "Estratégia", description: "Paineis e direcionadores", icon: Compass, href: "/estrategia" },
          { label: "Análise financeira", description: "Indicadores e saúde financeira", icon: BarChart3, href: "/estrategia?tab=financeiro" },
          { label: "Remuneração variável", description: "Incentivos e bônus", icon: DollarSign },
        ],
      },
    ],
  },
  {
    key: "talentos",
    label: "Talentos",
    href: "/talentos",
    groups: [
      {
        title: "Desenvolvimento",
        items: [
          { label: "Competências", description: "Avaliações e calibragem", icon: Award, href: "/talentos", badge: "Ativo" },
          { label: "Sucessão", description: "Mapas e prontidão", icon: Briefcase },
          { label: "Feedback contínuo", description: "Cultura de feedback real-time", icon: MessageSquare },
          { label: "Diário de bordo", description: "Registros e anotações", icon: BookOpen },
        ],
      },
    ],
  },
  {
    key: "operacao",
    label: "Operação",
    href: "/operacao",
    groups: [
      {
        title: "Gestão Operacional",
        items: [
          { label: "Gestão de Treinamento", description: "Capacitação e trilhas", icon: GraduationCap, href: "/operacao" },
          { label: "Reunião+", description: "Ritos e reuniões", icon: Video },
        ],
      },
    ],
  },
  {
    key: "config",
    label: "Configurações",
    groups: [
      {
        title: "Administração",
        items: [
          { label: "Estrutura organizacional", description: "Áreas, cargos e reportes", icon: Building2, href: "/configuracoes" },
          { label: "Permissões", description: "Papéis e acessos", icon: ShieldCheck },
          { label: "Configuração da plataforma", description: "Identidade e ajustes gerais", icon: SlidersHorizontal },
          { label: "Notificações (configuração)", description: "Regras e alertas", icon: Bell },
        ],
      },
    ],
  },
];

interface TopNavProps {
  /** Item ativo no menu */
  active?: MenuDef["key"];
}

export function TopNav({ active = "inicio" }: TopNavProps) {
  const [open, setOpen] = useState<MenuDef["key"] | null>(null);

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center">
          <img
            src="https://mereo.com/wp-content/uploads/2025/01/mereohorizontal-transparente.png"
            alt="Mereo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Main nav */}
        <nav className="ml-4 hidden items-center gap-0.5 text-sm md:flex">
          {MENUS.map((m) => {
            const isActive = active === m.key;
            const hasMenu = !!m.groups;
            const isOpen = open === m.key;

            const triggerClass = cn(
              "inline-flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors",
              isActive
                ? "bg-secondary font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
            );

            if (!hasMenu) {
              return (
                <Link
                  key={m.key}
                  to={m.href ?? "/"}
                  className={triggerClass}
                  onMouseEnter={() => setOpen(null)}
                >
                  {m.label}
                </Link>
              );
            }

            return (
              <div
                key={m.key}
                className="relative"
                onMouseEnter={() => setOpen(m.key)}
              >
                <Link
                  to={m.href ?? "/"}
                  className={triggerClass}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(null)}
                >
                  {m.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <button className="hidden h-8 items-center gap-2 rounded-md border border-border bg-secondary/60 px-2.5 text-xs text-muted-foreground hover:text-foreground md:inline-flex">
            <Search className="h-3.5 w-3.5" />
            Buscar pessoas, ciclos…
            <kbd className="ml-2 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary">
            <Bell className="h-4 w-4" />
          </button>
          <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            MR
          </div>
        </div>
      </div>

      {/* Mega menu panel */}
      {open && (() => {
        const menu = MENUS.find((m) => m.key === open);
        if (!menu?.groups) return null;
        return (
          <div className="absolute inset-x-0 top-full border-b border-border bg-card shadow-[var(--shadow-lg)]">
            <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-6 md:grid-cols-3">
              <div className="md:col-span-2 grid gap-8 md:grid-cols-2">
                {menu.groups.map((group) => (
                  <div key={group.title}>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.title}
                    </p>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        const Inner = (
                          <div className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/5 text-primary">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-foreground">{item.label}</p>
                                {item.badge && (
                                  <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold text-success">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        );
                        return (
                          <li key={item.label}>
                            {item.href ? (
                              <Link to={item.href} onClick={() => setOpen(null)}>
                                {Inner}
                              </Link>
                            ) : (
                              <button type="button" className="w-full text-left">
                                {Inner}
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </header>
  );
}
