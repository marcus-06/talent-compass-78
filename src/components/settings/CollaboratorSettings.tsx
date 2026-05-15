import { 
  Building2,
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone,
  Calendar,
  MapPin,
  Shield, 
  CheckCircle2, 
  Clock,
  ArrowUpDown,
  UserCog,
  ShieldCheck,
  Save,
  ChevronRight,
  Globe,
  Lock,
  GraduationCap,
  History,
  Settings2,
  LayoutDashboard,
  Target,
  Video,
  BarChart3,
  Award,
  DollarSign,
  Zap,
  Briefcase,
  Plus,
  Trash2,
  Camera,
  CreditCard,
  Venus,
  Mars,
  Slack,
  Linkedin,
  Share2,
  ExternalLink,
  RefreshCw,
  Eye,
  KeyRound,
  Smartphone,
  ShieldAlert,
  Info,
  X,
  CircleSlash,
  ChevronDown,
  ArrowLeft,
  Pencil,
  TrendingUp,
  AlertTriangle,
  Activity,
  LineChart,
  PieChart,
  UserCheck,
  BrainCircuit,
  Lightbulb,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MOCK_USERS = [
  { 
    id: 1, 
    name: "Milena Frasson Vieira", 
    login: "milena.vieira",
    email: "milena.vieira@mereo.com", 
    role: "Product Owner", 
    dept: "M1.2.1.6.4 - Product Owners", 
    status: "active", 
    avatar: "/milena.png",
    matricula: "MER-2024-089",
    idioma: "Português",
    permissoes: "Single User",
    nivelAcesso: "Administrador",
    localidade: "Belo Horizonte, MG",
    cpf: "123.456.789-00",
    celular: "(31) 98765-4321",
    slack: "@milena.vieira",
    sexo: "Feminino",
    performance: 92,
    potential: 85,
    risk: "Low",
    engagement: 95,
    salaryMarket: 1.1,
    areasResponsabilidade: [
      { id: "a1", name: "M1.2.1.6.4 - Product Owners", isPrimary: true, members: 12 },
      { id: "a2", name: "Desenvolvimento de Produto", isPrimary: false, members: 45 },
    ],
    educacao: [{ id: 1, nivel: "Pós-Graduação", curso: "Gestão de Produtos", instituicao: "PUC Minas", ano: "2022" }],
    experiencia: [{ id: 1, cargo: "Product Owner", empresa: "Mereo", periodo: "Jan 2023 - Presente" }]
  },
  { id: 2, name: "Marcus Dias", email: "marcus.dias@mereo.com", role: "Product Manager", dept: "Produto", status: "active", avatar: "MD", nivelAcesso: "Gestor", performance: 88, potential: 90, risk: "Low", engagement: 82, salaryMarket: 1.0, areasResponsabilidade: [{ id: "p1", name: "Produto", isPrimary: true, members: 30 }] },
  { id: 3, name: "Ana Silva", email: "ana.silva@mereo.com", role: "UX Designer", dept: "Produto", status: "active", avatar: "AS", nivelAcesso: "Colaborador", performance: 95, potential: 70, risk: "Medium", engagement: 65, salaryMarket: 0.9, areasResponsabilidade: [] },
  { id: 4, name: "Bruno Costa", email: "bruno.costa@mereo.com", role: "Tech Lead", dept: "Engenharia", status: "pending", avatar: "BC", nivelAcesso: "Colaborador", performance: 75, potential: 95, risk: "High", engagement: 40, salaryMarket: 1.2, areasResponsabilidade: [] },
  { id: 5, name: "Carla Souza", email: "carla.souza@mereo.com", role: "Head of People", dept: "RH", status: "active", avatar: "CS", nivelAcesso: "Gestor", performance: 91, potential: 88, risk: "Low", engagement: 98, salaryMarket: 1.05, areasResponsabilidade: [] },
];

const PERMISSION_CATEGORIES = [
  {
    title: "Plataforma e Dados",
    permissions: [
      { id: "core", label: "Core", desc: "Permite acesso às configurações básicas da plataforma e dados mestres.", icon: Settings2 },
      { id: "dashboards", label: "Dashboards", desc: "Permite visualizar e criar painéis de indicadores personalizados.", icon: LayoutDashboard },
    ]
  },
  {
    title: "Estratégia e Execução",
    permissions: [
      { id: "estrategia", label: "Estratégia", desc: "Acesso à gestão de diretrizes, mapas estratégicos e visão de longo prazo.", icon: Globe },
      { id: "okr", label: "OKR", desc: "Permite gerenciar objetivos e resultados-chave da organização.", icon: Target },
      { id: "reuniao", label: "Reunião+", desc: "Acesso aos ritos de governança, pautas e acompanhamento de reuniões.", icon: Video },
      { id: "financeira", label: "Análise Financeira", desc: "Permite visualizar indicadores financeiros e saúde econômica.", icon: BarChart3 },
    ]
  },
  {
    title: "Pessoas e Talentos",
    permissions: [
      { id: "performance", label: "Performance", desc: "Acesso aos ciclos de avaliação de desempenho e competências.", icon: Zap },
      { id: "gestao-talentos", label: "Gestão de Talentos", desc: "Permite gerenciar mapas de sucessão, PDI e prontidão.", icon: Award },
      { id: "treinamentos", label: "Gerenciar treinamentos", desc: "Acesso à gestão de trilhas, capacitação e desenvolvimento.", icon: GraduationCap },
    ]
  }
];

import { usePerspective } from "@/hooks/usePerspective";

export function CollaboratorSettings() {
  const { perspective } = usePerspective();
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeProfileTab, setActiveProfileTab] = useState("usuario");
  const [searchArea, setSearchArea] = useState("");
  const [modulePermissions, setModulePermissions] = useState<Record<string, "none" | "view" | "user" | "admin">>({});


  const profileTabs = [
    { id: "usuario", label: "Informações", icon: UserCog },
    { id: "pessoais", label: "Pessoais", icon: Mail },
    { id: "educacao", label: "Educação", icon: GraduationCap },
    { id: "experiencia", label: "Experiência", icon: History },
    { id: "integracao", label: "Integrações", icon: RefreshCw },
    { id: "permissoes", label: "Permissões", icon: ShieldCheck },
  ];

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setView("detail");
    setActiveProfileTab("usuario");
  };

  const handlePermissionChange = (moduleId: string, level: "none" | "view" | "user" | "admin") => {
    setModulePermissions(prev => ({ ...prev, [moduleId]: level }));
  };

  const handleAddArea = () => {
    if (!searchArea.trim()) return;
    const newArea = {
      id: "a" + Math.random().toString(36).substr(2, 4),
      name: searchArea,
      isPrimary: selectedUser.areasResponsabilidade?.length === 0,
      members: Math.floor(Math.random() * 50) + 1
    };
    setSelectedUser({ ...selectedUser, areasResponsabilidade: [...(selectedUser.areasResponsabilidade || []), newArea] });
    setSearchArea("");
  };

  const handleRemoveArea = (id: string) => {
    setSelectedUser({ ...selectedUser, areasResponsabilidade: selectedUser.areasResponsabilidade.filter((a: any) => a.id !== id) });
  };

  const handleSetPrimary = (id: string) => {
    setSelectedUser({ ...selectedUser, areasResponsabilidade: selectedUser.areasResponsabilidade.map((a: any) => ({ ...a, isPrimary: a.id === id })) });
  };

  const renderAdminListView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Cadastro de Colaboradores</h2>
          <p className="text-sm text-muted-foreground">Gerencie o ciclo de vida e informações da sua organização.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 shadow-md">
          <UserPlus className="h-4 w-4" /> Novo Colaborador
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          <input type="text" placeholder="Buscar por nome, e-mail ou cargo..." className="w-full rounded-xl border border-border bg-card py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none shadow-sm" />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary"><Filter className="h-4 w-4" /> Filtros</button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Colaborador</th>
              <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Departamento / Cargo</th>
              <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Acesso</th>
              <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Status</th>
              <th className="px-6 py-4 text-right font-bold text-muted-foreground uppercase tracking-wider text-[10px]">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} onClick={() => handleSelectUser(user)} className="group cursor-pointer hover:bg-primary/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-accent flex items-center justify-center font-bold text-xs overflow-hidden shadow-sm">
                       {user.avatar.startsWith("/") ? <img src={user.avatar} className="h-full w-full object-cover" /> : user.avatar}
                    </div>
                    <div><p className="font-bold text-foreground">{user.name}</p><p className="text-[11px] text-muted-foreground">{user.email}</p></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-foreground/80">{user.dept}</p><p className="text-[11px] text-muted-foreground">{user.role}</p>
                </td>
                <td className="px-6 py-4">
                   <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight text-foreground/70">
                      <Shield className="h-3 w-3" /> {user.nivelAcesso || "Colaborador"}
                   </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase", user.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning")}>
                    <div className={cn("h-1.5 w-1.5 rounded-full", user.status === "active" ? "bg-success" : "bg-warning")} /> {user.status === "active" ? "Ativo" : "Pendente"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <button className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"><ChevronRight className="h-5 w-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCEOView = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
       <div className="grid gap-6 md:grid-cols-4">
          {[
            { label: "Densidade de Talentos", value: "72%", trend: "+5%", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Risco de Turnover", value: "8.4%", trend: "-2%", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "Engajamento Médio", value: "84/100", trend: "+12", icon: Activity, color: "text-success", bg: "bg-success/10" },
            { label: "Budget vs. Performance", value: "1.05x", trend: "Estável", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all group">
               <div className="flex items-center justify-between mb-4">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", stat.bg, stat.color)}><stat.icon className="h-5 w-5" /></div>
                  <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full", stat.trend.startsWith("+") ? "bg-success/10 text-success" : stat.trend.startsWith("-") ? "bg-red-500/10 text-red-500" : "bg-muted text-muted-foreground")}>{stat.trend}</span>
               </div>
               <p className="text-2xl font-black text-foreground">{stat.value}</p>
               <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
       </div>

       <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
             <div className="rounded-3xl border border-border bg-card p-8 shadow-sm h-full">
                <div className="flex items-center justify-between mb-8">
                   <div>
                      <h3 className="text-lg font-bold text-foreground">Matriz de Talentos (9-Box)</h3>
                      <p className="text-xs text-muted-foreground">Distribuição estratégica baseada em Performance vs. Potencial.</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /><span className="text-[10px] font-bold text-muted-foreground uppercase">População Atual</span></div>
                   </div>
                </div>
                
                <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-square max-w-[500px] mx-auto relative">
                   <div className="absolute -left-12 top-1/2 -rotate-90 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Potencial</div>
                   <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Performance</div>
                   
                   {[
                     "Risco", "Efetivo", "Estrela Incipiente",
                     "Dilema", "Core Player", "High Potential",
                     "Questionável", "Enigma", "Star Player"
                   ].map((quad, i) => (
                     <div key={quad} className={cn(
                       "flex flex-col items-center justify-center rounded-xl border border-border/40 p-4 text-center transition-all hover:scale-[1.02] cursor-default",
                       i === 8 ? "bg-primary/5 border-primary/20" : i === 0 ? "bg-red-500/[0.02]" : "bg-muted/10"
                     )}>
                        <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-tighter mb-2">{quad}</span>
                        <div className="flex -space-x-2">
                           {MOCK_USERS.slice(0, (i % 3) + 1).map(u => (
                              <div key={u.id} className="h-6 w-6 rounded-full border-2 border-card bg-secondary overflow-hidden shadow-sm" title={u.name}>
                                 {u.avatar.startsWith("/") ? <img src={u.avatar} className="h-full w-full object-cover" /> : <span className="text-[8px] flex items-center justify-center h-full w-full font-bold">{u.avatar}</span>}
                              </div>
                           ))}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="rounded-3xl border border-border bg-card p-6 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><BrainCircuit className="h-20 w-20 text-primary" /></div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4"><Sparkles className="h-3 w-3" /> Insights da IA</div>
                <div className="space-y-4 relative">
                   <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                      <p className="text-xs font-bold text-foreground leading-relaxed">"O departamento de <span className="text-primary">Engenharia</span> apresenta um risco de turnover 15% acima da média. Recomenda-se revisão dos ciclos de feedback."</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                      <p className="text-xs font-bold text-foreground leading-relaxed">"Milena Vieira atingiu o quadrante <span className="text-amber-600">Star Player</span>. Considere o mapeamento para sucessão em cargos de diretoria."</p>
                   </div>
                </div>
             </div>

             <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500" /> Talentos em Risco Crítico</h3>
                <div className="space-y-3">
                   {MOCK_USERS.filter(u => u.risk === "High" || u.engagement < 50).map(u => (
                     <div key={u.id} className="flex items-center justify-between p-3 rounded-2xl border border-border hover:bg-secondary/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                           <div className="h-9 w-9 rounded-full bg-secondary overflow-hidden">{u.avatar.startsWith("/") ? <img src={u.avatar} className="h-full w-full object-cover" /> : <span className="text-[10px] font-bold flex items-center justify-center h-full w-full">{u.avatar}</span>}</div>
                           <div><p className="text-xs font-bold text-foreground">{u.name}</p><p className="text-[10px] text-muted-foreground">{u.role}</p></div>
                        </div>
                        <div className="text-right"><span className="text-[9px] font-black text-red-500 uppercase">Risco Crítico</span></div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-4 py-2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Ver Relatório de Riscos</button>
             </div>
          </div>
       </div>
    </div>
  );

  const renderUserInfoForm = (user: any) => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-3 bg-muted/20">
          <div className="flex items-center gap-2"><UserCog className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold text-foreground/80">Informações Básicas</h3></div>
        </div>
        <div className="p-6 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-2 flex flex-col items-center gap-3 border-r border-border/50 pr-6">
             <div className="relative group">
                <div className="h-20 w-20 rounded-2xl border-2 border-border bg-accent overflow-hidden shadow-sm">
                  {user.avatar.startsWith("/") ? <img src={user.avatar} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-xl font-bold text-accent-foreground">{user.avatar}</div>}
                </div>
                <button className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-card hover:bg-primary/90 transition-all scale-90"><Camera className="h-3.5 w-3.5" /></button>
             </div>
             <span className="text-[10px] font-bold text-muted-foreground uppercase text-center leading-tight">Foto do Perfil</span>
          </div>
          <div className="md:col-span-5 space-y-4">
             <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Login</label><input type="text" defaultValue={user.login || user.email.split('@')[0]} className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></div>
             <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Nome Completo</label><input type="text" defaultValue={user.name} className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></div>
             <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">CPF</label><div className="relative"><CreditCard className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.cpf} className="w-full rounded-lg border border-border bg-muted/20 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></div></div>
          </div>
          <div className="md:col-span-5 space-y-4">
             <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Matrícula</label><input type="text" defaultValue={user.matricula} className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></div>
             <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">E-mail Corporativo</label><div className="relative"><Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="email" defaultValue={user.email} className="w-full rounded-lg border border-border bg-muted/20 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></div></div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Sexo</label><button className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-left">{user.sexo || "Não informado"}<ChevronDown className="h-3.5 w-3.5 opacity-50" /></button></div>
                <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Status</label><button className="flex w-full items-center justify-between rounded-lg border border-border bg-success/5 px-3 py-2 text-sm text-success font-bold uppercase tracking-tighter">{user.status === "active" ? "Ativo" : "Inativo"}<ChevronDown className="h-3.5 w-3.5 opacity-50" /></button></div>
             </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6">
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4"><Share2 className="h-3 w-3" /> Contato e Social</div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Celular</label><div className="relative"><Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.celular} className="w-full rounded-lg border border-border bg-muted/20 pl-9 pr-3 py-2 text-sm focus:outline-none" /></div></div>
          <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Slack</label><div className="relative"><Slack className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.slack} className="w-full rounded-lg border border-border bg-muted/20 pl-9 pr-3 py-2 text-sm focus:outline-none" /></div></div>
          <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">LinkedIn</label><div className="relative"><Linkedin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" placeholder="linkedin.com/in/..." className="w-full rounded-lg border border-border bg-muted/20 pl-9 pr-3 py-2 text-sm focus:outline-none" /></div></div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 px-6 py-4 bg-muted/20 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div>
            <div><h3 className="text-sm font-bold text-foreground/80">Responsabilidades de Gestão</h3><p className="text-[10px] text-muted-foreground">Áreas onde o usuário possui visão de liderança.</p></div>
          </div>
          <div className="flex items-center gap-2">
             <div className="relative"><Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input type="text" placeholder="Vincular área..." value={searchArea} onChange={(e) => setSearchArea(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddArea()} className="rounded-lg border border-border bg-background py-1.5 pl-8 pr-3 text-[11px] focus:outline-none w-48 transition-all focus:w-64" /></div>
             <button onClick={handleAddArea} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-[11px] font-bold text-white hover:bg-primary/90 shadow-sm transition-all"><Plus className="h-3.5 w-3.5" /> Vincular</button>
          </div>
        </div>
        <div className="p-6">
          {user.areasResponsabilidade && user.areasResponsabilidade.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
               {user.areasResponsabilidade.map((area: any) => (<div key={area.id} className={cn("group relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 hover:shadow-md animate-in zoom-in-95", area.isPrimary ? "border-primary/30 bg-primary/[0.02] ring-1 ring-primary/10" : "border-border bg-card hover:border-primary/20")}><div className="flex items-start justify-between mb-3"><div className="space-y-1"><div className="flex items-center gap-2"><p className="text-xs font-bold text-foreground leading-tight">{area.name}</p>{area.isPrimary && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}</div><p className="text-[10px] text-muted-foreground">ID: {area.id}</p></div><button onClick={() => handleRemoveArea(area.id)} className="p-1 rounded-md text-muted-foreground/30 hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-all"><X className="h-3.5 w-3.5" /></button></div><div className="flex items-center justify-between pt-3 border-t border-border/50"><div className="flex items-center gap-1.5"><Users className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] font-bold text-foreground/70">{area.members} Membros</span></div>{!area.isPrimary && (<button onClick={() => handleSetPrimary(area.id)} className="text-[9px] font-bold text-primary hover:underline uppercase tracking-tight">Tornar Primária</button>)}</div></div>))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border/50 rounded-2xl bg-muted/5"><div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-4"><Building2 className="h-5 w-5" /></div><h4 className="text-sm font-bold text-foreground">Sem responsabilidades</h4><button onClick={() => { setSearchArea("Área Corporativa"); handleAddArea(); }} className="mt-4 flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all"><Plus className="h-4 w-4" /> Vincular Primeira Área</button></div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t border-border/50"><button onClick={() => setView("list")} className="px-6 py-2 rounded-lg border border-border bg-background text-sm font-bold text-muted-foreground hover:bg-secondary">Cancelar</button><button className="flex items-center gap-2 px-8 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 shadow-lg"><Save className="h-4 w-4" /> Salvar Colaborador</button></div>
    </div>
  );

  const renderPersonalInfoForm = (user: any) => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="rounded-xl border border-border bg-card shadow-sm p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Data de Nascimento</label><div className="relative"><Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.nascimento || "Não informado"} className="w-full rounded-lg border border-border bg-muted/20 pl-9 pr-3 py-2 text-sm focus:outline-none" /></div></div>
            <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Estado Civil</label><button className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm">{user.estadoCivil || "Solteiro(a)"}<ChevronDown className="h-3.5 w-3.5 opacity-50" /></button></div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Endereço Residencial</label><div className="relative"><MapPin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.endereco || "Não informado"} className="w-full rounded-lg border border-border bg-muted/20 pl-9 pr-3 py-2 text-sm focus:outline-none" /></div></div>
            <div className="space-y-1.5"><label className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Localidade / Cidade</label><div className="relative"><Globe className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.localidade || "Belo Horizonte, MG"} className="w-full rounded-lg border border-border bg-muted/20 pl-9 pr-3 py-2 text-sm focus:outline-none" /></div></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3"><button className="flex items-center gap-2 px-8 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 shadow-lg"><Save className="h-4 w-4" /> Salvar Informações</button></div>
    </div>
  );

  const renderEducationForm = (user: any) => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-foreground">Formação Acadêmica</h3><button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all"><Plus className="h-4 w-4" /> Adicionar Formação</button></div>
      <div className="grid gap-4">
        {user.educacao && user.educacao.length > 0 ? user.educacao.map((edu: any) => (
          <div key={edu.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner"><GraduationCap className="h-6 w-6" /></div>
              <div><p className="font-bold text-foreground">{edu.curso}</p><p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{edu.instituicao} • {edu.nivel} • Concluído em {edu.ano}</p></div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all"><button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"><Pencil className="h-4 w-4" /></button><button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button></div>
          </div>
        )) : <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl bg-muted/5"><p className="text-sm text-muted-foreground">Nenhuma formação cadastrada para este colaborador.</p></div>}
      </div>
    </div>
  );

  const renderExperienceForm = (user: any) => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-foreground">Histórico Profissional</h3><button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all"><Plus className="h-4 w-4" /> Adicionar Experiência</button></div>
      <div className="grid gap-4">
        {user.experiencia && user.experiencia.length > 0 ? user.experiencia.map((exp: any) => (
          <div key={exp.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground shadow-inner"><Briefcase className="h-6 w-6" /></div>
              <div><p className="font-bold text-foreground">{exp.cargo}</p><p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{exp.empresa} • {exp.periodo}</p></div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all"><button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"><Pencil className="h-4 w-4" /></button><button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button></div>
          </div>
        )) : <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl bg-muted/5"><p className="text-sm text-muted-foreground">Nenhum registro de experiência profissional anterior.</p></div>}
      </div>
    </div>
  );

  const renderIntegrationsForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-2"><h3 className="text-lg font-bold text-foreground">Sincronização de Perfil</h3><p className="text-sm text-muted-foreground">Conecte o currículo deste colaborador com fontes externas de dados profissionais.</p></header>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { name: "LinkedIn", icon: Linkedin, color: "#0077b5", connected: true, lastSync: "há 2 dias" },
          { name: "Gupy", icon: Share2, color: "#10b981", connected: false },
          { name: "Catho", icon: ExternalLink, color: "#ef4444", connected: false },
        ].map((item) => (
          <div key={item.name} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
            <div className="flex items-center justify-between mb-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50 shadow-inner" style={{ color: item.color }}><item.icon className="h-6 w-6" /></div>{item.connected && <div className="flex h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_10px_rgba(var(--success-rgb),0.5)] animate-pulse" />}</div>
            <h4 className="font-bold text-foreground">{item.name}</h4>
            <div className="mt-4 flex flex-col gap-2">
               <div className="flex items-center justify-between"><span className={cn("text-[10px] font-bold uppercase tracking-widest", item.connected ? "text-success" : "text-muted-foreground")}>{item.connected ? "Conectado" : "Desconectado"}</span>{item.connected && <span className="text-[9px] text-muted-foreground italic">{item.lastSync}</span>}</div>
            </div>
            <button className={cn("mt-6 w-full rounded-xl py-2.5 text-xs font-bold transition-all shadow-sm", item.connected ? "bg-secondary text-foreground hover:bg-secondary/80" : "bg-primary text-white hover:bg-primary/90")}>{item.connected ? "Gerenciar Sincronização" : "Conectar Conta"}</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><ShieldCheck className="h-8 w-8" /></div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Configuração de Acessos</h2>
              <p className="text-sm text-muted-foreground">Defina os privilégios de <span className="font-semibold text-primary">{selectedUser.name}</span> em cada módulo.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 shadow-lg"><Save className="h-4 w-4" /> Aplicar Permissões</button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Nível de Acesso Global</h3>
            <div className="space-y-2">
              {["Administrador", "Gestor", "Colaborador"].map((nivel) => (
                <button key={nivel} onClick={() => setSelectedUser({...selectedUser, nivelAcesso: nivel} as any)} className={cn("flex w-full items-center justify-between rounded-xl border p-4 text-sm transition-all", selectedUser.nivelAcesso === nivel ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20" : "border-border hover:border-primary/20 hover:bg-secondary")}>
                  <div className="flex items-center gap-3">
                    {nivel === "Administrador" && <Shield className="h-4 w-4" />}
                    {nivel === "Gestor" && <Users className="h-4 w-4" />}
                    {nivel === "Colaborador" && <Users className="h-4 w-4 opacity-50" />}
                    <span className="font-semibold">{nivel}</span>
                  </div>
                  {selectedUser.nivelAcesso === nivel && <div className="h-2 w-2 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-8 py-8 space-y-12">
              {PERMISSION_CATEGORIES.map((cat) => (
                <div key={cat.title} className="space-y-6">
                  <h4 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] pb-2 border-b border-border/50">{cat.title}</h4>
                  <div className="space-y-10">
                    {cat.permissions.map((perm) => (
                      <div key={perm.id} className="group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all"><perm.icon className="h-5 w-5" /></div>
                            <div className="space-y-1"><p className="text-sm font-bold text-foreground">{perm.label}</p><p className="text-xs text-muted-foreground leading-relaxed max-w-lg">{perm.desc}</p></div>
                          </div>
                        </div>
                        <div className="ml-14 grid grid-cols-4 gap-1 p-1 bg-secondary/50 rounded-lg border border-border/50">
                          {[
                            { id: "none", label: "Sem Acesso", icon: CircleSlash },
                            { id: "view", label: "Visualizador", icon: Eye },
                            { id: "user", label: "Usuário", icon: UserCog },
                            { id: "admin", label: "Admin", icon: ShieldCheck },
                          ].map((level) => {
                            const isSelected = (modulePermissions[perm.id] || "none") === level.id;
                            return (
                              <button key={level.id} onClick={() => handlePermissionChange(perm.id, level.id as any)} className={cn("flex items-center justify-center gap-2 py-2 rounded-md text-[10px] font-bold uppercase transition-all", isSelected ? "bg-white text-primary shadow-sm ring-1 ring-border/50" : "text-muted-foreground hover:bg-white/40")}>
                                <level.icon className={cn("h-3 w-3", isSelected ? "text-primary" : "opacity-40")} />{level.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-8">
        <div className="flex items-center gap-6">
           <button onClick={() => setView("list")} className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card hover:bg-secondary transition-all">
              <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
           </button>
           <div className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground shadow-inner overflow-hidden border border-border/50">
             {selectedUser.avatar.startsWith("/") ? <img src={selectedUser.avatar} className="h-full w-full object-cover" /> : <span className="text-3xl font-black">{selectedUser.avatar}</span>}
           </div>
           <div>
             <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black tracking-tight text-foreground">{selectedUser.name}</h2>
                <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest", selectedUser.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning")}>
                   {selectedUser.status === "active" ? "Ativo" : "Pendente"}
                </span>
             </div>
             <div className="flex items-center gap-3 mt-1.5">
               <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest"><Briefcase className="h-3 w-3" /> {selectedUser.role}</span>
               <span className="h-1 w-1 rounded-full bg-border" />
               <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest"><Building2 className="h-3 w-3" /> {selectedUser.dept}</span>
             </div>
           </div>
        </div>
      </header>

      <div className="space-y-8">
         <div className="flex gap-2 border-b border-border/50 pb-px overflow-x-auto no-scrollbar scroll-smooth">
            {profileTabs.map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveProfileTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap",
                  activeProfileTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                )}
              >
                <tab.icon className="h-3.5 w-3.5" /> {tab.label}
              </button>
            ))}
         </div>
         <div className="max-w-5xl">
            {activeProfileTab === "usuario" && renderUserInfoForm(selectedUser)}
            {activeProfileTab === "pessoais" && renderPersonalInfoForm(selectedUser)}
            {activeProfileTab === "educacao" && renderEducationForm(selectedUser)}
            {activeProfileTab === "experiencia" && renderExperienceForm(selectedUser)}
            {activeProfileTab === "integracao" && renderIntegrationsForm()}
            {activeProfileTab === "permissoes" && renderPermissionsTab()}
         </div>
      </div>
    </div>
  );

  return perspective === "admin" ? (view === "list" ? renderAdminListView() : renderDetailView()) : renderCEOView();
}
