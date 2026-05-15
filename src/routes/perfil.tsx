import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/talents/AppShell";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Camera, 
  Bell,
  Volume2,
  Save,
  Users,
  Search,
  ChevronRight,
  Briefcase,
  ChevronDown,
  Globe,
  Lock,
  GraduationCap,
  History,
  Settings as SettingsIcon,
  ChevronUp,
  CreditCard,
  Calendar,
  Heart,
  Plus,
  Trash2,
  Fingerprint,
  Eye,
  KeyRound,
  Linkedin,
  Share2,
  ExternalLink,
  RefreshCw,
  Link as LinkIcon,
  Shield,
  Zap,
  Target,
  Award,
  MessageSquare,
  DollarSign,
  BarChart3,
  Video,
  LayoutDashboard,
  Settings2,
  LockKeyhole,
  Pencil,
  CircleSlash,
  UserCog,
  Slack,
  Venus,
  Mars,
  CheckCircle2,
  Info,
  X,
  ShieldAlert,
  Smartphone
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/perfil")({
  component: ProfilePage,
});

const MOCK_CURRENT_USER = { 
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
  areasResponsabilidade: [
    { id: "a1", name: "M1.2.1.6.4 - Product Owners", isPrimary: true, members: 12 },
    { id: "a2", name: "Desenvolvimento de Produto", isPrimary: false, members: 45 },
    { id: "a3", name: "UX & Design System", isPrimary: false, members: 8 }
  ],
  nascimento: "15/05/1995",
  endereco: "Av. Raja Gabaglia, 3000, Belo Horizonte - MG",
  estadoCivil: "Solteira",
  educacao: [
    { id: 1, nivel: "Pós-Graduação", curso: "Gestão de Produtos", instituicao: "PUC Minas", ano: "2022" },
    { id: 2, nivel: "Graduação", curso: "Administração", instituicao: "UFMG", ano: "2018" }
  ],
  experiencia: [
    { id: 1, cargo: "Product Owner", empresa: "Mereo", periodo: "Jan 2023 - Presente" },
    { id: 2, cargo: "Analista de Produto", empresa: "Tech Inova", periodo: "Mar 2020 - Dez 2022" }
  ]
};

function ProfilePage() {
  const [activeMainTab, setActiveMainTab] = useState("usuario");
  const [searchArea, setSearchArea] = useState("");
  const user = MOCK_CURRENT_USER;

  const profileTabs = [
    { id: "usuario", label: "Informações", icon: User },
    { id: "pessoais", label: "Pessoais", icon: Mail },
    { id: "educacao", label: "Educação", icon: GraduationCap },
    { id: "experiencia", label: "Experiência", icon: History },
    { id: "integracao", label: "Integrações", icon: LinkIcon },
    { id: "seguranca", label: "Segurança", icon: Lock },
    { id: "notificacoes", label: "Notificações", icon: Bell },
  ];

  const renderUserInfoForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-3 bg-muted/20">
          <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><h3 className="text-sm font-semibold text-foreground/80">Informações Básicas</h3></div>
        </div>
        <div className="p-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-2 flex flex-col items-center gap-3">
             <span className="text-[11px] font-medium text-muted-foreground">Foto de perfil</span>
             <div className="relative group">
                <div className="h-24 w-24 rounded-full border-2 border-border bg-accent overflow-hidden shadow-sm">{user.avatar.startsWith("/") ? <img src={user.avatar} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-accent-foreground">{user.avatar}</div>}</div>
                <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-2 ring-card hover:bg-primary/90"><Camera className="h-3.5 w-3.5" /></button>
             </div>
          </div>
          <div className="md:col-span-5 space-y-4">
             <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Login</label><input type="text" defaultValue={user.login} className="w-full rounded border border-border bg-muted/30 px-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div>
             <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Nome completo</label><input type="text" defaultValue={user.name} className="w-full rounded border border-border bg-muted/30 px-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div>
             <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">CPF</label><div className="relative"><CreditCard className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.cpf} className="w-full rounded border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div></div>
          </div>
          <div className="md:col-span-5 space-y-4">
             <div className="space-y-1.5"><label className="text-xs text-muted-foreground italic font-medium">Matrícula</label><input type="text" defaultValue={user.matricula} className="w-full rounded border border-border bg-muted/30 px-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div>
             <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Sexo</label><button className="flex w-full items-center justify-between rounded border border-border bg-muted/30 px-3 py-2 text-sm text-foreground/70"><div className="flex items-center gap-2">{user.sexo === "Feminino" ? <Venus className="h-3.5 w-3.5 text-pink-500" /> : <Mars className="h-3.5 w-3.5 text-blue-500" />}{user.sexo || "Não informado"}</div><ChevronDown className="h-3.5 w-3.5" /></button></div>
             <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">E-mail</label><div className="relative"><Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="email" defaultValue={user.email} className="w-full rounded border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div></div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6">
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4"><Share2 className="h-3 w-3" /> Contato e Social</div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Celular</label><div className="relative"><Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.celular} className="w-full rounded border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div></div>
          <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Slack</label><div className="relative"><Slack className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.slack} className="w-full rounded border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div></div>
          <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">LinkedIn</label><div className="relative"><Linkedin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" placeholder="linkedin.com/in/..." className="w-full rounded border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div></div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div>
            <div><h3 className="text-sm font-bold text-foreground/80">Áreas sob sua Responsabilidade</h3><p className="text-[10px] text-muted-foreground">Seu escopo de gestão visual e de dados.</p></div>
          </div>
        </div>
        <div className="p-6">
          {user.areasResponsabilidade && user.areasResponsabilidade.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
               {user.areasResponsabilidade.map((area: any) => (<div key={area.id} className={cn("group relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 hover:shadow-md", area.isPrimary ? "border-primary/30 bg-primary/[0.02] ring-1 ring-primary/10" : "border-border bg-card")}><div className="flex items-start justify-between mb-3"><div className="space-y-1"><div className="flex items-center gap-2"><p className="text-xs font-bold text-foreground leading-tight">{area.name}</p>{area.isPrimary && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}</div><p className="text-[10px] text-muted-foreground">ID: {area.id}</p></div></div><div className="flex items-center justify-between pt-3 border-t border-border/50"><div className="flex items-center gap-1.5"><Users className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] font-bold text-foreground/70">{area.members} Membros</span></div></div></div>))}
            </div>
          ) : <div className="text-center py-6 text-xs text-muted-foreground italic">Nenhuma área de responsabilidade vinculada.</div>}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-border/50 mt-4"><button className="flex items-center gap-2 px-6 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 shadow-lg"><Save className="h-4 w-4" /> Salvar Alterações</button></div>
    </div>
  );

  const renderPersonalInfoForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="rounded-xl border border-border bg-card shadow-sm p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Data de Nascimento</label><div className="relative"><Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.nascimento} className="w-full rounded border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div></div>
            <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Estado Civil</label><button className="flex w-full items-center justify-between rounded border border-border bg-muted/30 px-3 py-2 text-sm text-foreground/70"><span>{user.estadoCivil || "Solteiro(a)"}</span><ChevronDown className="h-3.5 w-3.5" /></button></div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Endereço Residencial</label><div className="relative"><MapPin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.endereco} className="w-full rounded border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div></div>
            <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Localidade Atual</label><div className="relative"><Globe className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" /><input type="text" defaultValue={user.localidade} className="w-full rounded border border-border bg-muted/30 pl-9 pr-3 py-2 text-sm text-foreground/70 focus:outline-none" /></div></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3"><button className="flex items-center gap-2 px-6 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 shadow-lg"><Save className="h-4 w-4" /> Salvar Informações</button></div>
    </div>
  );

  const renderEducationForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-foreground">Trajetória Acadêmica</h3><button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20"><Plus className="h-4 w-4" /> Adicionar Formação</button></div>
      <div className="grid gap-4">
        {user.educacao && user.educacao.length > 0 ? user.educacao.map((edu: any) => (
          <div key={edu.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><GraduationCap className="h-6 w-6" /></div>
              <div><p className="font-bold text-foreground">{edu.curso}</p><p className="text-xs text-muted-foreground">{edu.instituicao} • {edu.nivel} • Concluído em {edu.ano}</p></div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all"><button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"><Pencil className="h-4 w-4" /></button><button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button></div>
          </div>
        )) : <div className="text-center py-10 border-2 border-dashed border-border rounded-xl"><p className="text-sm text-muted-foreground">Nenhuma formação cadastrada.</p></div>}
      </div>
    </div>
  );

  const renderExperienceForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-foreground">Histórico Profissional</h3><button className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20"><Plus className="h-4 w-4" /> Adicionar Experiência</button></div>
      <div className="grid gap-4">
        {user.experiencia && user.experiencia.length > 0 ? user.experiencia.map((exp: any) => (
          <div key={exp.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground"><Briefcase className="h-6 w-6" /></div>
              <div><p className="font-bold text-foreground">{exp.cargo}</p><p className="text-xs text-muted-foreground">{exp.empresa} • {exp.periodo}</p></div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all"><button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"><Pencil className="h-4 w-4" /></button><button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button></div>
          </div>
        )) : <div className="text-center py-10 border-2 border-dashed border-border rounded-xl"><p className="text-sm text-muted-foreground">Nenhuma experiência cadastrada.</p></div>}
      </div>
    </div>
  );

  const renderIntegrationsForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-2"><h3 className="text-lg font-semibold text-foreground">Sincronização de Perfil</h3><p className="text-sm text-muted-foreground">Sincronize seus dados com plataformas externas.</p></header>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "LinkedIn", icon: Linkedin, color: "#0077b5", connected: true },
          { name: "Gupy", icon: Share2, color: "#10b981", connected: false },
          { name: "Catho", icon: ExternalLink, color: "#ef4444", connected: false },
        ].map((item) => (
          <div key={item.name} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50" style={{ color: item.color }}><item.icon className="h-5 w-5" /></div>{item.connected && <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />}</div>
            <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
            <div className="mt-4 flex items-center justify-between"><span className={cn("text-[10px] font-bold uppercase", item.connected ? "text-success" : "text-muted-foreground")}>{item.connected ? "Conectado" : "Desconectado"}</span>{item.connected && <button className="text-[10px] font-bold text-primary hover:underline">Sincronizar</button>}</div>
            <button className={cn("mt-4 w-full rounded-lg py-2 text-xs font-semibold", item.connected ? "bg-secondary" : "bg-primary text-white")}>{item.connected ? "Gerenciar" : "Conectar"}</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurityForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6"><div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><KeyRound className="h-5 w-5" /></div><h4 className="font-bold text-foreground">Alterar Senha</h4></div>
          <div className="space-y-4">
             <div className="space-y-1.5"><label className="text-xs text-muted-foreground font-medium">Nova Senha</label><input type="password" placeholder="••••••••" className="w-full rounded border border-border bg-muted/30 px-3 py-2 text-sm focus:outline-none" /></div>
             <button className="w-full rounded-lg bg-primary py-2 text-xs font-bold text-white hover:bg-primary/90 transition-all shadow-md">Atualizar Senha</button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div><div className="flex items-center gap-3 mb-6"><div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success"><Smartphone className="h-5 w-5" /></div><h4 className="font-bold text-foreground">Autenticação em 2 Etapas</h4></div><p className="text-xs text-muted-foreground leading-relaxed">Adicione uma camada extra de segurança.</p></div>
          <div className="mt-6 p-4 rounded-lg bg-success/5 border border-success/20 flex items-center justify-between"><div className="flex items-center gap-2 text-success font-bold text-xs"><ShieldCheck className="h-4 w-4" /> Ativado</div><button className="text-xs font-bold text-muted-foreground underline">Desativar</button></div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-2">
        <h3 className="text-lg font-semibold text-foreground">Preferências de Notificação</h3>
        <p className="text-sm text-muted-foreground">Personalize como e quando você deseja ser alertado sobre cada módulo.</p>
      </header>

      <div className="space-y-4">
        {[
          { id: "estrategia", label: "Estratégia e OKRs", desc: "Check-ins, metas em risco e projeções de IA.", icon: Target },
          { id: "talentos", label: "Talentos e Sucessão", desc: "Ciclos de avaliação, prontidão e feedbacks.", icon: Award },
          { id: "engajamento", label: "Engajamento e Cultura", desc: "Novas pesquisas pulse e insights de sentimento.", icon: MessageSquare },
          { id: "recompensas", label: "Recompensa e Mérito", desc: "Elegibilidade, bônus e ciclos de mérito.", icon: DollarSign },
        ].map((category) => (
          <div key={category.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm group hover:border-primary/20 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                  <category.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{category.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{category.desc}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 border-l border-border pl-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Canais</span>
                  <div className="flex gap-3">
                    {["Push", "Email", "App"].map(channel => (
                      <label key={channel} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary/20" />
                        <span className="text-[10px] font-bold text-foreground/70 uppercase">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Frequência</span>
                  <select className="bg-transparent text-[10px] font-bold text-primary uppercase focus:outline-none cursor-pointer">
                    <option>Imediato</option>
                    <option>Resumo Diário</option>
                    <option>Semanal</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border/50 mt-4">
        <button className="flex items-center gap-2 px-6 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 shadow-lg">
          <Save className="h-4 w-4" /> Salvar Preferências
        </button>
      </div>
    </div>
  );

  return (
    <AppShell activeNav="config">
      <main className="mx-auto max-w-[1400px] px-6 py-8 animate-in fade-in duration-500">
        <div className="mb-4 flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
          <span>Configurações</span><ChevronRight className="h-2.5 w-2.5" /><span>Perfil do Usuário</span><ChevronRight className="h-2.5 w-2.5" /><span className="text-foreground font-medium">{user.name}</span>
        </div>

        <header className="mb-8 border-b border-border pb-6 flex items-center gap-6">
           <div className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground overflow-hidden shadow-inner border border-border/50">
              {user.avatar.startsWith("/") ? <img src={user.avatar} className="h-full w-full object-cover" /> : <span className="text-2xl font-black">{user.avatar}</span>}
           </div>
           <div>
              <h1 className="text-3xl font-black tracking-tight text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1 font-medium">
                 {user.role} • {user.dept}
              </p>
           </div>
        </header>

        <div className="flex flex-col gap-8">
          <div className="flex border-b border-border overflow-x-auto no-scrollbar scroll-smooth">
            {profileTabs.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveMainTab(tab.id)} 
                className={cn(
                  "px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap uppercase tracking-widest flex items-center gap-2", 
                  activeMainTab === tab.id ? "border-primary text-primary bg-primary/[0.02]" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                )}
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-5xl">
            {activeMainTab === "usuario" && renderUserInfoForm()}
            {activeMainTab === "pessoais" && renderPersonalInfoForm()}
            {activeMainTab === "educacao" && renderEducationForm()}
            {activeMainTab === "experiencia" && renderExperienceForm()}
            {activeMainTab === "integracao" && renderIntegrationsForm()}
            {activeMainTab === "seguranca" && renderSecurityForm()}
            {activeMainTab === "notificacoes" && renderNotificationsForm()}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
