import { TopNav } from "@/components/shell/TopNav";

interface AppShellProps {
  children: React.ReactNode;
  /** Item ativo do menu superior */
  activeNav?: "inicio" | "estrategia" | "talentos" | "operacao" | "config";
  /** Compatibilidade legada com a alternância Gestão/Configurações */
  mode?: "gestao" | "config";
}

export function AppShell({ children, activeNav, mode }: AppShellProps) {
  // Map legado: "config" → menu Configurações, "gestao" → Talentos
  const fallback = mode === "config" ? "config" : "talentos";
  const active = activeNav ?? fallback;

  return (
    <div className="min-h-screen bg-surface-sunken">
      <TopNav active={active} />
      {children}
    </div>
  );
}
