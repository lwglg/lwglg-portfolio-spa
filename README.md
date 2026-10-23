# lwglg-portfolio-spa

Página pessoal estática de Guilherme Gonçalves — Next.js (App Router), TypeScript, Zustand (arquitectura Flux), Neobrutalism UI, i18n (pt-BR / en-GB) e Yup.

## Requisitos

- Node.js **24 LTS** (ou superior)
- **pnpm** 9+

## Instalação

```bash
pnpm install
```

## Desenvolvimento

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando          | Descrição                                 |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Servidor de desenvolvimento               |
| `pnpm build`     | Build estático (`out/`) para GitHub Pages |
| `pnpm test`      | Testes unitários com cobertura ≥ 80 %     |
| `pnpm lint`      | ESLint (`eslint.config.mjs`)              |
| `pnpm format`    | Prettier (`.prettierrc.cjs`)              |
| `pnpm typecheck` | Verificação TypeScript                    |

## Deploy (GitHub Pages)

1. Crie o repositório `lwglg-portfolio-spa` sob a conta [lwglg](https://github.com/lwglg).
2. Localmente: `pnpm install` (gera `pnpm-lock.yaml` — **commite o lockfile**) e valide:
   ```bash
   pnpm typecheck && pnpm lint && pnpm test && pnpm build
   ```
3. Se o nome do repositório for diferente, ajuste `basePath` / `APP_BASE_PATH` em `next.config.ts` e `src/constants/index.ts`.
4. Faça push para a branch `main`. O workflow `.github/workflows/deploy.yml` publica em GitHub Pages.
5. Em **Settings → Pages**, fonte **GitHub Actions**.

URL esperada: `https://lwglg.github.io/lwglg-portfolio-spa/`

### Checklist pré-deploy

| Item                                          | Estado |
| --------------------------------------------- | ------ |
| `output: 'export'` + `trailingSlash: true`    | Sim    |
| `basePath` `/lwglg-portfolio-spa` em produção | Sim    |
| `images.unoptimized: true`                    | Sim    |
| `public/.nojekyll` + touch no CI              | Sim    |
| Assets com `assetPath()` (logos, foto)        | Sim    |
| Favicon `gg-ltda.svg`                         | Sim    |
| Workflow Pages (build → upload → deploy)      | Sim    |

## Arquitectura

- **Flux + Zustand**: stores em `src/stores/` (locale, theme, contact); actions em `src/actions/`.
- **Componentes reutilizáveis**: `src/components/ui/` (Button, Card, Input, …) e `src/components/layout/`.
- **Páginas**: `src/app/*/page.tsx` apenas orquestram e consomem os componentes.
- **i18n**: dicionários JSON em `src/i18n/locales/`; idioma padrão `pt-BR`.
- **Validação**: schemas Yup em `src/schemas/`.
- **Temas**: claro / escuro / sistema via `next-themes` + store Zustand.
- **Estilo**: Neobrutalism (bordas grossas, sombras offset, cantos arredondados (`rounded-base`), fontes Archivo Black + Space Grotesk).

## Conteúdo

O conteúdo da home e das experiências foi derivado do perfil público do GitHub (`lwglg`) e do artigo Medium referenciado. Se tiver os ficheiros `info_sumario.txt` e os PDFs dos currículos, substitua os textos nos JSON de i18n.

## Licença

Uso pessoal.
