# Restyle das demos + colapsar a home — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dar a cada uma das 6 demos um visual próprio e adequado, e colapsar a landing page para 3 cards por categoria com botão "Ver mais".

**Architecture:** CSS puro reescrito por projeto, preservando os ganchos (IDs/classes) que o JS usa — ler o JS antes de estilizar. React: editar `src/*.css` e rebuildar. Home: o `gerar.js` marca cards extras como `.extra` e emite um botão + ~8 linhas de JS inline para expandir/recolher.

**Tech Stack:** HTML/CSS/JS vanilla, React (CRA), Node, Edge headless + `scripts/serve.js` para preview.

**Regra de ouro:** nunca quebrar seletor que o JS dependa. Fluxo por projeto:
mapear ganchos → estilizar → (React) build → servir em HTTP + screenshot → commit.

**Paths:** projeto em `C:\Users\andre\dev\Cloude\Teste\morkertt.github.io`. Preview:
`node scripts/serve.js "<dir-do-build-ou-pasta>" <porta>` e screenshot do Edge com
`--user-data-dir` único + `taskkill //F //IM msedge.exe` antes (evita lock).

---

## Padrão de verificação (usado em todas as tarefas de demo)

```bash
# servir e capturar (ajustar DIR e PORTA por tarefa)
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io"
taskkill //F //IM node.exe >/dev/null 2>&1
node scripts/serve.js "<DIR>" <PORTA> >/tmp/s.log 2>&1 &
sleep 1 2>/dev/null
taskkill //F //IM msedge.exe >/dev/null 2>&1
for i in 1 2 3 4; do D="C:\Users\andre\AppData\Local\Temp\e_$(date +%s%N)"; \
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu \
  --no-sandbox --user-data-dir="$D" --virtual-time-budget=6000 \
  --screenshot="C:\Users\andre\dev\Cloude\Teste\morkertt.github.io\check.png" \
  --window-size=1200,900 "http://localhost:<PORTA>/" >/dev/null 2>&1; \
  [ -f check.png ] && { echo "shot OK"; break; }; done
```
Depois: Read em `check.png`; confirmar que **renderiza e os elementos esperados existem**
(o app não pode ter quebrado). `check.png` é ignorado pelo git (`*.png` já no .gitignore? não —
adicionar `check.png` ao `.gitignore` na Task 0).

---

## Task 0: Preparação

**Files:** Modify `.gitignore`

- [ ] **Step 1: Ignorar artefato de verificação**

Adicionar linha ao `.gitignore`:
```
check.png
```

- [ ] **Step 2: Commit**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io"
git add .gitignore && git commit -m "chore: ignora check.png (previews do restyle)"
```

---

## Task 1: Pixels Art — retrô/8-bit limpo

**Files:** Modify `projetos/pixels-art/style.css` (e `index.html` só se faltar gancho)

**Tokens:** fundo `#1b1b29`; superfície `#252539`; acento `#ffd166`; texto `#e8e8f0`;
fonte display "Press Start 2P" (Google Fonts) só em títulos, corpo em `system-ui`;
pixels com `border-radius:3px`, `box-shadow` sutil; paleta e grid centralizados num card.

- [ ] **Step 1: Mapear ganchos do JS**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/pixels-art"
grep -rEn "getElementById|querySelector|classList|className|getElementsByClassName" *.js
```
Anotar todos os IDs/classes usados (ex.: `#pixel-board`, `.pixel`, `#clear-board`,
`#color-palette`, `.color`, `.selected`) — **não renomear nenhum**.

- [ ] **Step 2: Reescrever `style.css`**
Estilizar usando os ganchos do Step 1. Importar a fonte no topo do `index.html`
(`<link>` Google Fonts) ou via `@import` no CSS. Centralizar `.color-palette` e o board,
arredondar `.pixel`, destacar `.selected` com `outline` do acento, header com a fonte pixel.
Garantir que `.pixel` mantém tamanho fixo (grid quadrado) e que `#clear-board` vira botão estilizado.

- [ ] **Step 3: Preview** — padrão de verificação com `DIR=projetos/pixels-art PORTA=8101`.
Read `check.png`: deve aparecer paleta, board pintável, botão Limpar — **estilizado**.

- [ ] **Step 4: Commit**
```bash
git add projetos/pixels-art && git commit -m "style: restyle retrô do Pixels Art"
```

---

## Task 2: Trybewarts — dark academia mágico

**Files:** Modify `projetos/trybewarts/style.css` (markup só se faltar gancho)

**Tokens:** fundo `#16130f` com leve textura/gradiente; superfície `#211b14`;
acento `#c9a24b` (dourado); texto `#ece3d0`; serifa display "Cinzel" (Google Fonts) em
títulos; corpo "Georgia"/serif; inputs com borda dourada fina; botão de enviar em dourado.

- [ ] **Step 1: Mapear ganchos**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/trybewarts"
grep -rEn "getElementById|querySelector|classList|name=|addEventListener" *.js
```
Anotar IDs de inputs, contadores de texto, botão submit, área de avaliação (estrelas).

- [ ] **Step 2: Reescrever `style.css`** com tema dark academia, preservando os ganchos.
Form centralizado em "card pergaminho", labels em serifa, foco dourado nos inputs,
contador de caracteres discreto, estrelas de avaliação em dourado.

- [ ] **Step 3: Preview** — `DIR=projetos/trybewarts PORTA=8102`. Read `check.png`:
formulário estilizado, campos e contador presentes.

- [ ] **Step 4: Commit**
```bash
git add projetos/trybewarts && git commit -m "style: tema dark academia do Trybewarts"
```

---

## Task 3: Shopping Cart — e-commerce moderno

**Files:** Modify `projetos/shopping-cart/style.css` (markup só se faltar gancho)

**Tokens:** fundo `#f6f7f9`; superfície branca; acento `#2f6df6`; texto `#1b2430`;
fonte "Inter"? **NÃO** — usar "Sora" (Google) p/ títulos + system-ui corpo (evitar cara de template);
cards de produto com sombra suave, carrinho como coluna lateral fixa, botões com acento.

- [ ] **Step 1: Mapear ganchos**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/shopping-cart"
grep -rEn "getElementById|querySelector|classList|className|createElement" *.js
```
Anotar classes dos itens (`.cart__items`, `.item`, `.cart__title` etc.) e o container de produtos.

- [ ] **Step 2: Reescrever `style.css`** em layout de loja: grid responsivo de produtos
(`display:grid`), cada produto um card com imagem/título/preço/botão; carrinho em coluna
lateral (`position:sticky`); botão "limpar carrinho" e total destacados. Preservar os ganchos.

- [ ] **Step 3: Preview** — `DIR=projetos/shopping-cart PORTA=8103`. Read `check.png`:
grid de produtos + carrinho lateral estilizados (a lista carrega via API async; ok se vazia no shot,
o layout deve estar estilizado).

- [ ] **Step 4: Commit**
```bash
git add projetos/shopping-cart && git commit -m "style: layout e-commerce do Shopping Cart"
```

---

## Task 4: Star Wars Search — sci-fi/HUD (React)

**Files:** Modify `projetos/starwars-search/src/App.css`, `src/index.css`
(componentes `.jsx/.js` só se faltar className)

**Tokens:** fundo `#080a12` com starfield (radial-gradients pontilhados); superfície
`#101524`; acento `#ffb627` (âmbar) + `#4aa3ff` (azul); texto `#d7e0f0`; mono "JetBrains Mono"
em números/tabela; tabela estilo console (linhas zebradas, header sticky).

- [ ] **Step 1: Mapear classNames**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/starwars-search/src"
grep -rEn "className=" . | head -40
```
Anotar classes de filtros, tabela, linhas. Estilizar por essas classes (e tags `table/th/td`).

- [ ] **Step 2: Reescrever `App.css` + `index.css`** com tema espacial, filtros como
"painel de controle", tabela estilo HUD. Sem renomear classes/JSX.

- [ ] **Step 3: Build**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/starwars-search"
NODE_OPTIONS=--openssl-legacy-provider CI=false npm run build 2>&1 | tail -3
```
Esperado: "build folder is ready".

- [ ] **Step 4: Preview** — `DIR=projetos/starwars-search/build PORTA=8104`. Read `check.png`:
título, filtros e tabela estilizados; dados podem carregar via API.

- [ ] **Step 5: Commit** (forçar build por causa do `.gitignore` aninhado)
```bash
git add projetos/starwars-search/src && git add -f projetos/starwars-search/build
git commit -m "style: tema sci-fi do Star Wars Search"
```

---

## Task 5: Trybetunes — player tipo Spotify (React)

**Files:** Modify `projetos/trybetunes/src/index.css` (+ criar `src/App.css` e importá-lo em
`App.js` se necessário para escopo de estilos; só adicionar import, sem mexer na lógica)

**Tokens:** fundo `#0e0e10`; superfície `#18181c`; acento `#1db954` (verde) ou `#e0457b`
(escolher um e manter); texto `#ececed`; "Sora" nos títulos; navbar superior escura;
cards de música/álbum com hover; inputs arredondados.

- [ ] **Step 1: Mapear classNames**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/trybetunes/src"
grep -rEn "className=" . | head -60
```

- [ ] **Step 2: Estilizar** via `index.css` (e `App.css` se criado e importado em `App.js`).
Tema player escuro, preservando classNames. Se criar `App.css`, adicionar só
`import './App.css';` no topo de `App.js`.

- [ ] **Step 3: Build**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/trybetunes"
NODE_OPTIONS=--openssl-legacy-provider CI=false npm run build 2>&1 | tail -3
```

- [ ] **Step 4: Preview** — `DIR=projetos/trybetunes/build PORTA=8105`. Read `check.png`:
tela de login do TrybeTunes estilizada (input Nome + Entrar).

- [ ] **Step 5: Commit**
```bash
git add projetos/trybetunes/src && git add -f projetos/trybetunes/build
git commit -m "style: tema player do Trybetunes"
```

---

## Task 6: Trybewallet — fintech claro (React)

**Files:** Modify `projetos/trybewallet/src/App.css`, `src/index.css`

**Tokens:** fundo `#f4f6fb`; superfície branca; acento `#2563eb` + verde `#16a34a`/vermelho
`#dc2626` p/ valores; texto `#0f172a`; "Sora" títulos; card de resumo (saldo) no topo;
tabela de despesas zebrada; inputs e botões arredondados.

- [ ] **Step 1: Mapear classNames**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/trybewallet/src"
grep -rEn "className=" . | head -60
```

- [ ] **Step 2: Reescrever `App.css` + `index.css`** com tema fintech claro, preservando classes.
Login centralizado em card; após login (não testável sem credencial), garantir que header,
form de despesa e tabela tenham estilos definidos por suas classes.

- [ ] **Step 3: Build**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos/trybewallet"
NODE_OPTIONS=--openssl-legacy-provider CI=false npm run build 2>&1 | tail -3
```

- [ ] **Step 4: Preview** — `DIR=projetos/trybewallet/build PORTA=8106`. Read `check.png`:
tela de login (Email/Senha/Entrar) estilizada em card.

- [ ] **Step 5: Commit**
```bash
git add projetos/trybewallet/src && git add -f projetos/trybewallet/build
git commit -m "style: tema fintech do Trybewallet"
```

---

## Task 7: Colapsar a home (gerar.js)

**Files:** Modify `gerar.js`, `assets/style.css`; regenera `index.html`

- [ ] **Step 1: `card()` aceita flag `extra`** — em `gerar.js`, alterar a assinatura e a
classe do card:
```js
function card(p, extra){
  const delay = (n++ * 0.045).toFixed(3);
  const tags = p.stack.map(t=>`<span class="tag">${esc(t)}</span>`).join('');
  let btns = '';
  if (p.demo){ const base = p.react ? `projetos/${p.slug}/build/` : `projetos/${p.slug}/`;
    btns += `<a class="btn btn-demo" href="${base}">${IC_DEMO} Demo</a>`; }
  if (p.codigo) btns += `<a class="btn btn-code" href="${GH}/${p.slug}/">${IC_CODE} Código</a>`;
  return `<article class="card ${p.codigo?'curado':''} ${extra?'extra':''}" style="animation-delay:${delay}s">
    <h3 class="c-nome">${esc(p.nome)}</h3>
    <p class="c-desc ${p.descricao?'':'plain'}">${esc(p.descricao || 'Projeto desenvolvido durante o bootcamp.')}</p>
    ${tags?`<div class="tags">${tags}</div>`:''}
    ${btns?`<div class="btns">${btns}</div>`:''}
  </article>`;
}
```

- [ ] **Step 2: Seção marca extras + botão** — substituir o `.map` das seções:
```js
const secoes = presentes.map((cat,i) => {
  const itens = projetos.filter(p=>p.categoria===cat);
  const cards = itens.map((p,idx)=>card(p, idx>=3)).join('');
  const extras = Math.max(0, itens.length-3);
  const btn = extras>0 ? `<button class="ver-mais" aria-expanded="false">Ver mais (${extras})</button>` : '';
  return `<section class="cat-sec"><div class="cat">
      <span class="idx">${String(i+1).padStart(2,'0')}</span>
      <h2>${esc(cat)}</h2>
      <span class="count">${itens.length} projeto${itens.length>1?'s':''}</span>
      <span class="rule"></span>
    </div>
    <div class="grid">${cards}</div>${btn}</section>`;
}).join('');
```

- [ ] **Step 3: JS inline** — antes de `</body>` no template do `html`, adicionar:
```js
<script>
document.querySelectorAll('.ver-mais').forEach(function(b){
  b.addEventListener('click',function(){
    var sec=b.closest('.cat-sec');
    var open=sec.classList.toggle('aberto');
    b.setAttribute('aria-expanded',open);
    var n=sec.querySelectorAll('.card.extra').length;
    b.textContent=open?'Ver menos':'Ver mais ('+n+')';
  });
});
</script>
```

- [ ] **Step 4: CSS** — adicionar ao fim de `assets/style.css`:
```css
.card.extra{display:none}
.cat-sec.aberto .card.extra{display:flex}
.ver-mais{margin-top:16px;font-family:"JetBrains Mono",monospace;font-size:12.5px;
  color:var(--gold);background:transparent;border:1px solid var(--line-strong);
  padding:9px 16px;border-radius:999px;cursor:pointer;transition:.2s}
.ver-mais:hover{border-color:var(--gold);background:var(--gold-soft)}
```

- [ ] **Step 5: Regenerar e verificar contagem visível**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io" && node gerar.js
node -e "const h=require('fs').readFileSync('index.html','utf8');console.log('extra:',(h.match(/card[^\"]*extra/g)||[]).length,'| ver-mais:',(h.match(/ver-mais/g)||[]).length)"
```
Esperado: `ver-mais` = **4** (as 4 categorias têm >3 projetos: Fundamentos JS=10, React=7,
Back-end=20, Python=6). `extra` = 43 − (4 categorias × 3 visíveis) = **31**.

- [ ] **Step 6: Preview** — `DIR=. PORTA=8100`. Read `check.png`: cada categoria mostra 3 cards
+ botão "Ver mais". (Opcional: clicar via preview MCP para confirmar expansão.)

- [ ] **Step 7: Commit**
```bash
git add gerar.js assets/style.css index.html
git commit -m "feat: home colapsada em 3 cards/categoria com Ver mais"
```

---

## Task 8: Deploy e verificação final

- [ ] **Step 1: Push**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io" && git push origin main
```

- [ ] **Step 2: Aguardar deploy e checar home**
```bash
curl -sf --retry 18 --retry-delay 10 --retry-all-errors -o /dev/null -w "%{http_code}\n" "https://morkertt.github.io/"
```
Esperado: `200`.

- [ ] **Step 3: Screenshots ao vivo** das 6 demos e da home (padrão de verificação com as
URLs `https://morkertt.github.io/projetos/<slug>/` ou `/build/`). Confirmar visual novo e
funcionamento.

- [ ] **Step 4: Relatório final** — listar o antes/depois de cada demo e a home colapsada.

---

## Notas
- **Não** renomear IDs/classes que o JS usa (Step 1 de cada tarefa existe pra isso).
- Fontes do Google Fonts: carregam no Pages (online) e no preview (Edge tem rede).
- React: sempre `add -f` no `build/` (o `.gitignore` aninhado do CRA ignora `/build`).
- `prefers-reduced-motion` já tratado no CSS base; cards `.extra` usam `display` (não opacity),
  então não conflitam com a animação.
