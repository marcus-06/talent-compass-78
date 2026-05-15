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
  User,
  LogOut,
  TrendingUp,
  UserCog,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePerspective } from "@/hooks/usePerspective";


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
  key: "inicio" | "estrategia-resultados" | "pessoas-talentos" | "engajamento-cultura" | "recompensa-reconhecimento" | "config";
  label: string;
  href?: string;
  groups?: MenuGroup[];
}

export const MENUS: MenuDef[] = [
  { key: "inicio", label: "Início", href: "/" },
  {
    key: "estrategia-resultados",
    label: "Estratégia e Resultados",
    href: "/estrategia",
    groups: [
      {
        title: "Estratégia e Resultados",
        items: [
          { label: "Estratégia", description: "Gestão de diretrizes e mapas", icon: Compass, href: "/estrategia", badge: "Ativo" },
          { label: "OKR", description: "Objetivos e resultados-chave", icon: Target, href: "/estrategia", badge: "Ativo" },
          { label: "Metas", description: "Acompanhamento e apuração", icon: Crosshair, href: "/estrategia", badge: "Ativo" },
          { label: "Reunião+", description: "Ritos e governança da execução", icon: Video, href: "/operacao", badge: "Ativo" },
          { label: "Análise financeira", description: "Indicadores e saúde financeira", icon: BarChart3, href: "/estrategia?tab=financeiro", badge: "Contrate" },
        ],
      },
    ],
  },
  {
    key: "pessoas-talentos",
    label: "Pessoas e Talentos",
    href: "/talentos",
    groups: [
      {
        title: "Pessoas e Talentos",
        items: [
          { label: "Competências", description: "Avaliações e calibragem", icon: Award, href: "/talentos", badge: "Ativo" },
          { label: "Sucessão", description: "Mapas e prontidão", icon: Briefcase, href: "/talentos", badge: "Ativo" },
          { label: "Gestão de Treinamentos", description: "Capacitação e trilhas", icon: GraduationCap, href: "/treinamentos", badge: "Ativo" },
          { label: "Organograma", description: "Estrutura hierárquica e sucessão", icon: GitBranch, href: "/organograma", badge: "Ativo" },
        ],
      },
    ],
  },
  {
    key: "engajamento-cultura",
    label: "Engajamento e Cultura",
    href: "/engajamento-cultura",
    groups: [
      {
        title: "Engajamento e Cultura",
        items: [
          { label: "Pesquisas", description: "Escuta ativa e diagnósticos", icon: ListChecks, href: "/engajamento-cultura", badge: "Ativo" },
          { label: "Feedback Contínuo", description: "Troca real-time entre pares", icon: MessageSquare, href: "/engajamento-cultura", badge: "Ativo" },
          { label: "Diário de Bordo", description: "Acompanhamento da experiência", icon: BookOpen, href: "/engajamento-cultura", badge: "Ativo" },
        ],
      },
    ],
  },
  {
    key: "recompensa-reconhecimento",
    label: "Remuneração",
    href: "/recompensa-reconhecimento",
    groups: [
      {
        title: "Remuneração",
        items: [
          { label: "Remuneração Variável", description: "Incentivos e bônus", icon: DollarSign, href: "/recompensa-reconhecimento", badge: "Ativo" },
          { label: "Mérito e Promoção", description: "Reconhecimento e movimentação", icon: Sparkles, href: "/recompensa-reconhecimento", badge: "Em breve" },
        ],
      },
    ],
  },
  {
    key: "config",
    label: "Configurações",
    href: "/configuracoes",
    groups: [
      {
        title: "Plataforma e Dados",
        items: [
          { label: "Colaboradores", description: "Gestão cadastral e currículo", icon: Users, href: "/configuracoes?tab=colaboradores", badge: "Ativo" },
          { label: "Estrutura Organizacional", description: "Áreas, cargos e reportes", icon: Building2, href: "/configuracoes?tab=estrutura", badge: "Ativo" },
          { label: "Permissões e Acessos", description: "Papéis e regras de acesso", icon: ShieldCheck, href: "/configuracoes?tab=permissoes", badge: "Ativo" },
        ],
      },
      {
        title: "Jornadas e Módulos",
        items: [
          { label: "Estratégia e Metas", description: "OKRs e diretrizes", icon: Compass, href: "/configuracoes?tab=estrategia", badge: "Ativo" },
          { label: "Talentos e Performance", description: "Ciclos e sucessão", icon: Award, href: "/configuracoes?tab=competencias", badge: "Ativo" },
          { label: "Engajamento e Escuta", description: "Pesquisas e feedback", icon: ListChecks, href: "/configuracoes?tab=pesquisas", badge: "Ativo" },
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
  const { perspective, setPerspective } = usePerspective();
  const [open, setOpen] = useState<MenuDef["key"] | null>(null);

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="https://mereo.com/wp-content/uploads/2025/01/mereohorizontal-transparente.png"
            alt="Mereo"
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Main nav */}
        <nav className="ml-4 hidden items-center gap-0.5 text-sm md:flex">
          {MENUS.map((m) => {
            const isActive = active === m.key;
            const hasMenu = !!m.groups;
            const isOpen = open === m.key;

            const triggerClass = cn(
              "inline-flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors whitespace-nowrap",
              isActive
                ? "bg-secondary font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
            );

            if (!hasMenu) {
              const [path, searchStr] = (m.href ?? "/").split("?");
              const searchParams = searchStr ? Object.fromEntries(new URLSearchParams(searchStr)) : undefined;
              
              return (
                <Link
                  key={m.key}
                  to={path}
                  search={searchParams}
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
                  to={m.href?.split("?")[0] ?? "/"}
                  search={m.href?.includes("?") ? Object.fromEntries(new URLSearchParams(m.href.split("?")[1])) : undefined}
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
        <div className="ml-auto flex items-center gap-4">
          <div className="flex bg-secondary/50 p-0.5 rounded-lg border border-border/40 shadow-sm">
             <button 
               onClick={() => setPerspective("admin")} 
               className={cn(
                 "flex items-center gap-1.5 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all", 
                 perspective === "admin" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
               )}
               title="Visão Operacional"
             >
               <UserCog className="h-3 w-3" /> Operação
             </button>
             <button 
               onClick={() => setPerspective("ceo")} 
               className={cn(
                 "flex items-center gap-1.5 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all", 
                 perspective === "ceo" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
               )}
               title="Visão Estratégica"
             >
               <TrendingUp className="h-3 w-3" /> Estratégia
             </button>
          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary">
            <Bell className="h-4 w-4" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-80 focus:outline-none overflow-hidden">
                <img src="/milena.png" alt="User" className="h-full w-full object-cover" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/perfil" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                                  <span className={cn(
                                    "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                                    item.badge === "Ativo" && "bg-success/15 text-success",
                                    item.badge === "Em breve" && "bg-secondary text-muted-foreground",
                                    item.badge === "Contrate" && "bg-warning/15 text-warning",
                                  )}>
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
                              <Link
                                to={item.href.split("?")[0]}
                                search={item.href.includes("?") ? Object.fromEntries(new URLSearchParams(item.href.split("?")[1])) : undefined}
                                onClick={() => setOpen(null)}
                              >
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
