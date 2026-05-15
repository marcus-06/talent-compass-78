# Changelog — Talent Compass OS

## [v0.5.0] — 2026-05-12

### 🚀 Arquitetura de Perspectiva Dupla (Admin / CEO)

Implementação completa do ecossistema de visão dupla na plataforma. Cada módulo agora renderiza conteúdo diferente dependendo do perfil ativo, controlado por um contexto global (`PerspectiveProvider` + `usePerspective`).

#### Novo: Seletor Global de Perspectiva
- Adicionado botão de alternância **Operação ↔ Estratégia** no `TopNav`
- A troca afeta todos os módulos simultaneamente — sem toggles locais
- Estado persistido via React Context com `PerspectiveProvider` no `__root.tsx`

---

### 📊 Módulos Refatorados com Perspectiva Dupla

#### `src/routes/index.tsx` — Dashboard Inicial
- **Admin:** Painel operacional com ciclo ativo, pendências de gestão e atalhos administrativos
- **CEO:** Dashboard executivo com cards de módulos, gráfico de tendência de performance e alertas de risco estratégico (OKRs sem check-in, gaps de sucessão)

#### `src/routes/estrategia.tsx` — Estratégia e Resultados
- **Admin:** Tabela de monitoramento de times com status de OKRs por área, filtros e ações rápidas
- **CEO:** Gráfico de Projeção de IA (Real vs. Previsão), ROI estratégico consolidado e radar de alinhamento entre departamentos
- IA Copilot: Alerta automático sobre desalinhamento entre Marketing e Vendas com impacto quantificado em % de meta

#### `src/routes/talentos.tsx` — Inteligência de Talentos & Sucessão
- **Admin:** Ciclo de calibragem em andamento, tabela de colaboradores com status de avaliação e filtros operacionais
- **CEO:** Cards de Prontidão de Sucessores, Altos Potenciais, Risco de Saída e Diversidade em Liderança; Pipeline de liderança com gráfico de bench por nível; lista de talentos críticos com indicador de risco
- IA Copilot: "Prontidão do Time" com alerta de gap na Gerência Executiva e recomendação de programa acelerado

#### `src/routes/engajamento-cultura.tsx` — Alinhamento Cultural & Sentimento
- **Admin:** Painel de Pulse Survey com histórico de participação, lista de pesquisas ativas e alertas de queda de engajamento
- **CEO:** Mapa de Calor de Engajamento por pilar (Liderança, Ambiente, Carreira, Remuneração); gráfico de tendência com correlação de queda → turnover; Análise de Sentimento via IA PLN com índice de favorabilidade; pontos fortes e atrito detectados automaticamente
- IA Copilot: "Consultor de Sentimento" com detecção de silêncio organizacional na área de Tecnologia

#### `src/routes/recompensa-reconhecimento.tsx` — Remuneração & Equidade *(novo módulo)*
- **Admin:** Ciclos de mérito ativos, status de elegibilidade e uso de orçamento
- **CEO:** Razão de Comparação (Compa-Ratio) vs. mercado; Mapa de Calor de Meritocracia por nível; Índice de Equidade Salarial (96/100); ROI do Bônus de Vendas (4.8x) e impacto na retenção (82%); ações estratégicas recomendadas pela IA
- IA Copilot: "Consultor de Remuneração" com alerta sobre posicionamento de mercado

---

### 🗂️ Módulo Organograma: Inteligência de Sucessão
**Arquivo:** `src/routes/organograma.tsx`

Refatoração completa para foco em **Succession Planning**:
- **Indicadores de Prontidão:** Adição de pontos coloridos (🟢🟡🔴) nos cards para visualização imediata de sucessores prontos, em desenvolvimento ou ausência de sucessor.
- **Camadas de Visualização (Toggles):** Implementação de filtros dinâmicos para sobrepor camadas de Performance (P:A, P:M, P:B), Potencial, Risco de Perda e Prontidão de Sucessão no gráfico.
- **Painel de Sucessão Detalhado:** Novo painel lateral (estilo Drawer) com:
  - 4 métricas críticas: Performance, Potencial, 9-Box e Risco de Perda.
  - Lista de Sucessores com tempo de prontidão (ex: 1-2 anos, Gap alto).
  - Próximos passos de carreira mapeados.
- **Harmonização Visual:** Atualização para o design system da plataforma (`rounded-2xl`, sombras suaves, header dark `#0F172A` para o painel de perfil).
- **KPIs Executivos:** Cards de contagem em tempo real de posições sem sucessor, talentos em alto risco e prontos para promoção.

---

### 📊 Motor de Comparação de Períodos
**Componente:** `src/components/shared/PeriodComparator.tsx`

Implementação de um motor genérico para análise histórica em gráficos:
- **Componente `PeriodComparator`:** Seletor premium com opções de comparação (Período anterior, Ano anterior, 3m, 6m, 12m).
- **Legendas Dinâmicas:** Adição de `ComparisonLegend` para identificar a série temporal comparativa.
- **Integração Multi-módulo:**
  - `estrategia.tsx`: Comparação de progresso de OKRs.
  - `engajamento-cultura.tsx`: Comparação de tendência de engajamento vs. turnover.
  - `index.tsx`: Comparação de tendência de performance global.
  - `recompensa-reconhecimento.tsx`: Comparação de eficiência de meritocracia (barras).
- **Visual:** Séries comparativas exibidas com linhas pontilhadas ou barras translúcidas na cor âmbar/cinza para contraste semântico.

---

### 🌐 Traduções PT-BR (Visão Estratégia)

Eliminação de anglicismos nas telas executivas, mantendo siglas reconhecidas no mercado:

| Antes | Depois |
|-------|--------|
| `IA Forecast` | `Projeção IA` |
| `Flight Risk Predictor` | `Risco de Saída` |
| `High Potentials (HiPo)` | `Altos Potenciais` |
| `Bench Strength` | `Prontidão do Time` |
| `Heatmap` | `Mapa de Calor` |
| `Sentiment Analysis (AI NLP)` | `Análise de Sentimento (IA PLN)` |
| `Cultural Alignment & Sentiment` | `Alinhamento Cultural & Sentimento` |
| `Pay Equity Index` | `Índice de Equidade Salarial` |
| `Investment Insights` | `Análise de Investimento` |
| `Reward Advisor` | `Consultor de Remuneração` |
| `Meritocracia Heatmap` | `Mapa de Calor de Meritocracia` |
| `Reward Strategy & Pay Equity` | `Remuneração & Equidade` |
| `Work-life balance` | `Equilíbrio Vida-Trabalho` |
| `Budget Utilizado` | `Orçamento Utilizado` |
| `Pulse Survey` | `Pesquisa Pulse` |
| `Budget Alinhado` | `Orçamento Alinhado` |
| `Talent Intelligence & Pipeline` | `Inteligência de Talentos & Sucessão` |

---

### 🔧 Correções e Melhorias

#### `src/components/shell/TopNav.tsx`
- Removido componente de busca global (⌘K) que não fazia sentido no contexto atual
- Corrigido `shrink-0` e `object-contain` no logo da Mereo para evitar distorção
- Adicionado `GitBranch` aos imports de Lucide para o item Organograma

#### `src/components/settings/CollaboratorSettings.tsx`
- Sincronizado com `usePerspective` — removido toggle local de visão que conflitava com o estado global

#### `src/routes/recompensa-reconhecimento.tsx`
- Corrigido erro crítico de importação: componentes do Recharts (`PieChart`, `Pie`, `Cell`, `BarChart`, `Bar`, etc.) estavam misturados no bloco de imports do Lucide, causando crash na navegação

#### `src/routes/talentos.tsx`
- Adicionado `Filter` aos imports de Lucide (estava sendo usado mas não importado)
- Traduzidos valores de risk (`"High"/"Low"` → `"Alto"/"Baixo"`) incluindo lógica condicional de cor

---

### 👤 Central de Colaboradores — Usuários, Permissões e Perfil

**Arquivo:** `src/components/settings/CollaboratorSettings.tsx`  
**Rota:** `/configuracoes?tab=colaboradores`  
**Tamanho:** 615 linhas · módulo mais completo da plataforma

Este módulo é uma experiência de gestão de pessoas de ponta-a-ponta, com **visão dupla por perspectiva**:

#### Visão Admin — Gestão Operacional de Colaboradores

**Lista de Colaboradores:**
- Tabela com busca por nome, e-mail ou cargo
- Filtros avançados por departamento, status e nível de acesso
- Colunas: Colaborador (avatar + nome + e-mail), Departamento/Cargo, Nível de Acesso (badge), Status (Ativo/Pendente)
- Clique em qualquer linha abre o perfil completo em modo de edição

**Perfil Completo com 6 Abas:**

| Aba | Conteúdo |
|-----|----------|
| **Informações** | Login, Nome, CPF, Matrícula, E-mail corporativo, Sexo, Status, Foto com upload, Contato (Celular, Slack, LinkedIn), Responsabilidades de Gestão por área |
| **Pessoais** | Data de nascimento, Estado civil, Endereço residencial, Localidade/cidade |
| **Educação** | Formação acadêmica com nível, curso, instituição e ano; botão para adicionar e excluir formações |
| **Experiência** | Histórico profissional com cargo, empresa e período; edição e exclusão inline |
| **Integrações** | Sincronização de currículo com LinkedIn (conectado), Gupy e Catho; indicador de último sync |
| **Permissões** | Sistema granular de controle de acesso por módulo (detalhado abaixo) |

**Responsabilidades de Gestão (aba Informações):**
- Campo de busca para vincular áreas organizacionais
- Cards de áreas com: nome, ID, número de membros
- Definição de área primária (destacada com ícone de check)
- Remoção de vínculo com X inline (hover-reveal)
- Estado vazio com CTA para vincular primeira área

#### Sistema de Permissões por Módulo (aba Permissões)

**Nível de Acesso Global** (painel esquerdo):
- Seletor de perfil global com 3 níveis:
  - 🛡️ **Administrador** — acesso total à plataforma
  - 👥 **Gestor** — visão de liderança de equipes
  - 👤 **Colaborador** — acesso básico ao próprio perfil

**Controle Granular por Módulo** (painel direito):
- 3 categorias de módulos com permissões independentes:

  | Categoria | Módulos |
  |-----------|---------|
  | Plataforma e Dados | Core, Dashboards |
  | Estratégia e Execução | Estratégia, OKR, Reunião+, Análise Financeira |
  | Pessoas e Talentos | Performance, Gestão de Talentos, Gerenciar Treinamentos |

- Para cada módulo, seletor de 4 níveis de acesso:
  - 🚫 **Sem Acesso** — não visualiza o módulo
  - 👁️ **Visualizador** — leitura apenas
  - ⚙️ **Usuário** — uso das funcionalidades
  - 🛡️ **Admin** — configuração e administração completa

- Botão "Aplicar Permissões" com ação de salvar

#### Visão CEO — Dashboard Estratégico de Capital Humano

Quando a perspectiva é "Estratégia", o módulo se transforma em um painel executivo:

- **4 KPIs de Capital Humano:**
  - Densidade de Talentos (72%, +5%)
  - Risco de Turnover (8.4%, -2%)
  - Engajamento Médio (84/100, +12)
  - Budget vs. Performance (1.05x)

- **Matriz 9-Box (Performance vs. Potencial):**
  - Grid 3×3 com quadrantes nomeados: Risco, Efetivo, Estrela Incipiente, Dilema, Core Player, High Potential, Questionável, Enigma, Star Player
  - Colaboradores posicionados visualmente com avatares em cada quadrante
  - Eixos de Performance (X) e Potencial (Y) identificados

- **IA Insights:**
  - Alerta sobre risco de turnover 15% acima da média em Engenharia
  - Recomendação de mapeamento de sucessão para Milena Vieira (Star Player)

- **Talentos em Risco Crítico:**
  - Lista filtrada automaticamente por `risk === "High"` ou `engagement < 50`
  - Link para relatório completo de riscos

#### Dados dos Colaboradores Cadastrados

| # | Nome | Cargo | Departamento | Nível de Acesso | Status |
|---|------|-------|--------------|-----------------|--------|
| 1 | Milena Frasson Vieira | Product Owner | M1.2.1.6.4 - Product Owners | Administrador | Ativo |
| 2 | Marcus Dias | Product Manager | Produto | Gestor | Ativo |
| 3 | Ana Silva | UX Designer | Produto | Colaborador | Ativo |
| 4 | Bruno Costa | Tech Lead | Engenharia | Colaborador | Pendente |
| 5 | Carla Souza | Head of People | RH | Gestor | Ativo |

---

### 📁 Arquivos Criados
- `src/routes/recompensa-reconhecimento.tsx` — módulo completo de Recompensa (novo)
- `src/routes/organograma.tsx` — módulo de Organograma interativo (novo)
- `CHANGELOG.md` — este arquivo

### 📁 Arquivos Modificados
- `src/routes/index.tsx`
- `src/routes/estrategia.tsx`
- `src/routes/talentos.tsx`
- `src/routes/engajamento-cultura.tsx`
- `src/routes/__root.tsx`
- `src/components/shell/TopNav.tsx`
- `src/components/settings/CollaboratorSettings.tsx`
- `src/routeTree.gen.ts`
- `src/hooks/usePerspective.tsx` *(criado anteriormente, utilizado hoje)*

