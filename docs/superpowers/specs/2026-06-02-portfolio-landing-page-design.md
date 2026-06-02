# Portfólio — Landing page (GitHub Pages) — Design

> **Data:** 2026-06-02
> **Autor:** André Morkertt (com assistência)
> **Status:** Aprovado (aguardando revisão do spec)

## 1. Visão geral

Criar uma landing page de portfólio, hospedada em **GitHub Pages**, que reúne os
projetos feitos no bootcamp da Trybe (atualmente apenas como PRs em repositórios
privados da organização `tryber`, já clonados localmente em
`Teste/trybe-projetos/`). A página torna o trabalho **acessível a recrutadores**
via cards com botões de **Demo ao vivo** e/ou **Código**.

Abordagem escolhida: **híbrido curado** — lista todos os 43 projetos como cards,
mas só um subconjunto forte (~12) recebe demo/código publicados.

## 2. Objetivos e não-objetivos

**Objetivos**
- Página pública em `https://morkertt.github.io`, visual alinhado ao CV (paleta
  azul-marinho `#16243f`).
- Mostrar volume (43 projetos) + profundidade (12 curados com demo/código).
- Gerador em Node reexecutável (muda metadados → regenera a página).
- Demos ao vivo para projetos front-end que buildam de forma confiável.

**Não-objetivos**
- NÃO publicar os 43 repositórios-solução individualmente.
- NÃO hospedar back-end (APIs + banco) — sem demo, só código.
- NÃO usar framework de front (React/Vite) para a própria landing — HTML/CSS puro.

## 3. Ressalva (código de conduta da Trybe)

Publicar soluções de projetos da Trybe em repositórios públicos pode violar o
código de conduta do bootcamp (projetos reaplicados a novas turmas → risco de
plágio) e expõe templates/specs de propriedade da Trybe. O usuário foi avisado e
optou conscientemente por incluir código dos projetos curados. Mitigação: publicar
apenas o subconjunto curado, não os 43.

## 4. Arquitetura

### 4.1 Repositório e hospedagem
- Repo público novo: **`morkertt.github.io`** (user/profile Pages → serve na raiz).
- Pasta local de trabalho: `Teste/morkertt.github.io/` (isolada do finapp).
- Estrutura do repo:
  ```
  morkertt.github.io/
  ├── index.html            (gerado)
  ├── assets/               css, imagens, foto
  ├── projetos/
  │   └── <nome>/           código (e build de demo) de cada projeto curado
  ├── projetos.json         metadados (fonte de verdade dos cards)
  ├── gerar.js              gerador Node → index.html
  └── docs/superpowers/...  este spec
  ```
- Link **Código** → `github.com/morkertt/morkertt.github.io/tree/main/projetos/<nome>/`.
- Link **Demo** (front-end) → `https://morkertt.github.io/projetos/<nome>/`.

### 4.2 Gerador Node (`gerar.js`)
- Lê `projetos.json` (array de objetos, schema abaixo) e emite `index.html`.
- Sem dependências externas (Node puro + template string). Reexecutável.
- Agrupa cards por `categoria`, na ordem definida.

**Schema de `projetos.json` (por projeto):**
```json
{
  "nome": "Trybewallet",
  "slug": "trybewallet",
  "descricao": "Carteira de controle de despesas com cotação de moedas.",
  "categoria": "React",
  "stack": ["React", "Redux", "Context API"],
  "demo": true,
  "codigo": true,
  "origem": "tryber/sd-017-project-trybewallet"
}
```
- `demo`/`codigo` controlam quais botões aparecem. `slug` define a subpasta/URL.

### 4.3 Página (`index.html`)
- Header: nome, título ("Desenvolvedor Full-Stack"), links (GitHub, CV, e
  LinkedIn *se houver*), foto (a mesma do CV).
- Seções por categoria: **Fundamentos JS · React · Back-end Node/TS · Python**.
- Card: título, descrição, tags de stack, botões Demo/Código condicionais.
- Responsivo (grid que colapsa em 1 coluna no mobile). CSS puro.

## 5. Projetos curados (12)

| Projeto | Categoria | Stack | Entrega |
|---|---|---|---|
| Trybewallet | React | React, Redux | Demo + Código |
| Trybetunes | React | React, API | Demo + Código |
| Star Wars Planets Search | React | React, Hooks/Context | Demo + Código |
| Pixels Art | Fundamentos JS | JS, DOM | Demo + Código |
| Trybewarts | Fundamentos JS | JS, forms | Demo + Código |
| Shopping Cart | Fundamentos JS | JS async, localStorage | Demo + Código |
| Blogs API | Back-end Node/TS | Node, Express, Sequelize, JWT | Código |
| Store Manager | Back-end Node/TS | Node, MSC, MySQL, testes | Código |
| Trybesmith | Back-end Node/TS | TypeScript, MySQL | Código |
| Car Shop | Back-end Node/TS | TypeScript, POO, MongoDB | Código |
| Trybe Futebol Clube | Back-end Node/TS | TS, JWT, Docker | Código |
| Job Insights (`sd-021-b-project-job-insights`) | Python | Python, testes | Código |

Os demais 31 projetos aparecem como cards informativos (nome + stack), sem botões.

## 6. Fluxo de deploy

1. `gh repo create morkertt/morkertt.github.io --public`.
2. Para cada projeto curado: copiar conteúdo de `Teste/trybe-projetos/<repo>/` para
   `projetos/<slug>/`, **excluindo `.git/` e `node_modules/`**.
3. Builds front-end:
   - Vanilla (Pixels Art, Trybewarts, Shopping Cart): sem build, serve direto.
   - React (Trybewallet, Trybetunes, Star Wars): tentar `npm ci && npm run build`;
     publicar o `build/`. **Se falhar** por dependência antiga → rebaixar para
     `demo: false` (só Código) e registrar no relatório final.
4. Preencher `projetos.json`, rodar `node gerar.js`.
5. Commit + push; ativar GitHub Pages (branch `main`, raiz).
6. Mostrar preview renderizado (screenshot via Edge headless) antes/depois.

## 7. Tratamento de erros / riscos

- **Build React quebrado:** plano B = só Código (sem travar o pipeline). Relatório
  final lista o que caiu para "só Código".
- **Tamanho do repo:** excluir `node_modules`; demos React publicam só o `build/`.
- **Caminhos relativos nas demos:** apps em subpasta precisam de base path relativo
  (CRA `homepage` ou `<base href>`); validar no preview antes de publicar.

## 8. Critérios de sucesso

- `https://morkertt.github.io` no ar, listando os 43 projetos.
- Pelo menos os 3 demos vanilla funcionando ao vivo.
- Links de Código dos 12 curados abrindo o código real (branch do usuário).
- Visual coerente com o CV; responsivo no mobile.
- `node gerar.js` regenera a página a partir do `projetos.json`.

## 9. Trabalho futuro (fora de escopo)

- Demos de back-end (exigiria hospedagem paga: Render/Railway/Fly).
- Domínio próprio.
- Internacionalização (EN) da página.
