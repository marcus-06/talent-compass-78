import { TopNav } from "@/components/shell/TopNav";
import { MereoCopilotChat } from "@/components/shell/MereoCopilotChat";

interface AppShellProps {
  children: React.ReactNode;
  /** Item ativo do menu superior */
  activeNav?: "inicio" | "estrategia-resultados" | "pessoas-talentos" | "engajamento-cultura" | "recompensa-reconhecimento" | "config";
  /** Compatibilidade legada com a alternância Gestão/Configurações */
  mode?: "gestao" | "config";
}

export function AppShell({ children, activeNav, mode }: AppShellProps) {
  // Map legado: "config" → menu Configurações, "gestao" → Pessoas e Talentos
  const fallback = mode === "config" ? "config" : "pessoas-talentos";
  const active = activeNav ?? fallback;

  return (
    <div className="min-h-screen bg-surface-sunken">
      <TopNav active={active} />
      {children}
      <MereoCopilotChat />
    </div>
  );
}
