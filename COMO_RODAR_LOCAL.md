# Como Rodar o Projeto Localmente (Sem Admin/NPM)

Este projeto está configurado para rodar usando uma versão **portátil** do Node.js, contornando a falta de acesso administrador ou `npm` pré-instalado na máquina.

## O Fluxo

Para que o Windows reconheça os comandos `node` e `npm`, precisamos "avisar" o terminal onde o Node está escondido. Fazemos isso adicionando a pasta do Node à variável de ambiente `PATH` temporariamente durante a execução.

### Opção 1: Atalho Rápido (Recomendado)
Criei o arquivo **`iniciar_local.bat`** na raiz do projeto. 
Basta clicar duas vezes nele para iniciar o servidor.

### Opção 2: Comando no Terminal (PowerShell)
Se preferir rodar manualmente no PowerShell, copie e cole o comando abaixo:

```powershell
$env:PATH = "C:\Users\marcus.dias\node-v22\node-v22.13.1-win-x64;" + $env:PATH; npm run dev
```

## Onde o Node está instalado?
A versão portátil (v22.13.1) que baixamos está em:
`C:\Users\marcus.dias\node-v22\node-v22.13.1-win-x64`

> [!TIP]
> Se o projeto não carregar no `localhost:8080`, verifique o terminal para ver se ele mudou para a porta `8081` ou similar (isso acontece se a porta anterior ainda estiver ocupada).
