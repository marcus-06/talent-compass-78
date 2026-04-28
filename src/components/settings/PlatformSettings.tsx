import { Link } from "@tanstack/react-router";
import {
  Building2,
  ShieldCheck,
  Bell,
  Settings2,
} from "lucide-react";
import { StructureCard } from "./shared/StructureCard";

export function PlatformSettings() {
  return (
    <div className="space-y-10">
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Configurações de Plataforma</h2>
          <p className="text-sm text-muted-foreground text-balance">
            Área administrativa para gestão de estrutura, acessos e comunicação.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <StructureCard
            icon={Building2}
            title="Estrutura Organizacional"
            description="Áreas, centros de custo, cargos e níveis hierárquicos."
            count="124 Unidades"
            status="ok"
          />
          <StructureCard
            icon={ShieldCheck}
            title="Permissões & Acessos"
            description="Perfis de acesso, regras de visibilidade e logs de auditoria."
            count="6 Perfis"
            status="ok"
          />
          <StructureCard
            icon={Bell}
            title="Notificações"
            description="Canais (email, push, teams), periodicidade e templates."
            count="Geral Ativo"
            status="atencao"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/60 text-secondary-foreground">
          <Settings2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-lg font-semibold text-foreground">
          Segurança e Identidade
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Configure as regras de autenticação (SSO), visual identity e ajustes globais do sistema.
        </p>
        <button className="mt-8 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Configurar SSO
        </button>
      </section>
    </div>
  );
}
