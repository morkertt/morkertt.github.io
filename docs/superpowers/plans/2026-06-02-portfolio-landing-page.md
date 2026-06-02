# Portfólio — Landing page (GitHub Pages) — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar `https://morkertt.github.io` — uma landing page de portfólio gerada por Node que lista os 43 projetos da Trybe, com demo ao vivo e/ou código para 12 projetos curados.

**Architecture:** Gerador Node puro lê `projetos.json` (fonte de verdade) e emite `index.html` com cards agrupados por categoria. Os projetos curados têm o código copiado para `projetos/<slug>/` no mesmo repo; front-ends viram demos servidas pelo GitHub Pages na subpasta. Sem framework para a própria página (HTML/CSS puro).

**Tech Stack:** Node 24, HTML/CSS, GitHub Pages, `gh` CLI, Edge headless (preview).

**Paths base:**
- Projeto: `C:\Users\andre\dev\Cloude\Teste\morkertt.github.io`
- Fonte dos projetos clonados: `C:\Users\andre\dev\Cloude\Teste\trybe-projetos`
- Foto (mesma do CV): `C:\Users\andre\Downloads\Aleatorio\Generated Image April 01, 2025 - 2_55PM.jpeg`

---

## File Structure

```
morkertt.github.io/
├── index.html              (GERADO por gerar.js — não editar à mão)
├── projetos.json           metadados dos 43 cards (fonte de verdade)
├── gerar.js                gerador: projetos.json -> index.html
├── scripts/
│   ├── build-base-json.js  varre trybe-projetos -> base de projetos.json
│   ├── copiar-curados.js   copia código dos curados p/ projetos/<slug>/
│   └── build-demos.js      tenta buildar demos React; fallback p/ só código
├── assets/
│   ├── style.css
│   └── foto.jpg            cópia da foto do CV
├── projetos/<slug>/        código (e build/) de cada curado
└── docs/superpowers/...    spec + este plano
```

**Mapa de curados (slug ← repo de origem em trybe-projetos):**
```
trybewallet       <- sd-017-project-trybewallet         (React+Redux)   demo+codigo
trybetunes        <- sd-017-project-trybetunes          (React+API)     demo+codigo
starwars-search   <- sd-017-project-starwars-planets-search (React)     demo+codigo
pixels-art        <- sd-016-a-project-pixels-art         (JS)           demo+codigo
trybewarts        <- sd-016-a-project-trybewarts         (JS forms)     demo+codigo
shopping-cart     <- sd-016-a-project-shopping-cart      (JS async)     demo+codigo
blogs-api         <- sd-019-a-project-blogs-api          (Node+Sequelize) codigo
store-manager     <- sd-017-store-manager               (Node+MySQL)   codigo
trybesmith        <- sd-019-a-project-trybesmith         (TS+MySQL)     codigo
car-shop          <- sd-019-a-project-car-shop           (TS+Mongo)     codigo
futebol-clube     <- sd-019-a-trybe-futebol-clube        (TS+Docker)    codigo
job-insights      <- sd-021-b-project-job-insights       (Python)       codigo
```

---

## Task 1: Esqueleto do repositório + assets

**Files:**
- Create: `morkertt.github.io/.gitignore` (já existe do spec; garantir conteúdo)
- Create: `morkertt.github.io/assets/foto.jpg`

- [ ] **Step 1: Garantir .gitignore**

Conteúdo de `.gitignore`:
```
node_modules/
.DS_Store
projetos/**/node_modules/
```

- [ ] **Step 2: Copiar a foto do CV para assets/**

Run (bash):
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io"
mkdir -p assets
cp "/c/Users/andre/Downloads/Aleatorio/Generated Image April 01, 2025 - 2_55PM.jpeg" assets/foto.jpg
ls -la assets/foto.jpg
```
Expected: arquivo `assets/foto.jpg` presente (~140 KB).

- [ ] **Step 3: Commit**
```bash
git add .gitignore assets/foto.jpg
git commit -m "chore: esqueleto + foto"
```

---

## Task 2: Gerar a base de `projetos.json` a partir dos repos clonados

**Files:**
- Create: `morkertt.github.io/scripts/build-base-json.js`
- Create (saída): `morkertt.github.io/projetos.json`

- [ ] **Step 1: Escrever `scripts/build-base-json.js`**

```js
// Varre trybe-projetos, cria a base de projetos.json.
// Categoriza por turma e nome; aplica overrides dos curados.
const fs = require('fs');
const path = require('path');
const SRC = 'C:/Users/andre/dev/Cloude/Teste/trybe-projetos';
const OUT = 'C:/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos.json';

// Overrides dos 12 curados: chave = nome da pasta de origem
const CURADOS = {
  'sd-017-project-trybewallet':        { slug:'trybewallet', nome:'Trybewallet', categoria:'React', stack:['React','Redux'], demo:true, codigo:true, descricao:'Carteira de despesas com conversão de moedas em tempo real.' },
  'sd-017-project-trybetunes':         { slug:'trybetunes', nome:'Trybetunes', categoria:'React', stack:['React','API REST'], demo:true, codigo:true, descricao:'App de música que busca artistas e toca prévias via API.' },
  'sd-017-project-starwars-planets-search': { slug:'starwars-search', nome:'Star Wars Planets Search', categoria:'React', stack:['React','Context API','Hooks'], demo:true, codigo:true, descricao:'Busca e filtra planetas de Star Wars com Context API.' },
  'sd-016-a-project-pixels-art':       { slug:'pixels-art', nome:'Pixels Art', categoria:'Fundamentos JS', stack:['JavaScript','DOM','localStorage'], demo:true, codigo:true, descricao:'Editor de pixel art com paleta aleatória e persistência.' },
  'sd-016-a-project-trybewarts':       { slug:'trybewarts', nome:'Trybewarts', categoria:'Fundamentos JS', stack:['JavaScript','Forms','DOM'], demo:true, codigo:true, descricao:'Formulário interativo com validação e contadores.' },
  'sd-016-a-project-shopping-cart':    { slug:'shopping-cart', nome:'Shopping Cart', categoria:'Fundamentos JS', stack:['JavaScript','Async/Await','API'], demo:true, codigo:true, descricao:'Carrinho de compras consumindo API do Mercado Livre.' },
  'sd-019-a-project-blogs-api':        { slug:'blogs-api', nome:'Blogs API', categoria:'Back-end Node/TS', stack:['Node','Express','Sequelize','JWT'], demo:false, codigo:true, descricao:'API REST de blog com autenticação JWT e ORM Sequelize.' },
  'sd-017-store-manager':              { slug:'store-manager', nome:'Store Manager', categoria:'Back-end Node/TS', stack:['Node','Express','MySQL','Testes'], demo:false, codigo:true, descricao:'API de gestão de vendas em camadas (MSC) com testes.' },
  'sd-019-a-project-trybesmith':       { slug:'trybesmith', nome:'Trybesmith', categoria:'Back-end Node/TS', stack:['TypeScript','Express','MySQL'], demo:false, codigo:true, descricao:'API de loja medieval em TypeScript com MySQL.' },
  'sd-019-a-project-car-shop':         { slug:'car-shop', nome:'Car Shop', categoria:'Back-end Node/TS', stack:['TypeScript','POO','MongoDB'], demo:false, codigo:true, descricao:'API de concessionária com POO e MongoDB (Mongoose).' },
  'sd-019-a-trybe-futebol-clube':      { slug:'futebol-clube', nome:'Trybe Futebol Clube', categoria:'Back-end Node/TS', stack:['TypeScript','JWT','Docker','Sequelize'], demo:false, codigo:true, descricao:'API de classificação de futebol em TS, JWT e Docker.' },
  'sd-021-b-project-job-insights':     { slug:'job-insights', nome:'Job Insights', categoria:'Python', stack:['Python','Testes'], demo:false, codigo:true, descricao:'Análise de dados de vagas de emprego em Python.' },
};

// Categoria por turma para os NÃO curados
function categoriaTurma(name) {
  if (name.startsWith('sd-016-a')) return 'Fundamentos JS';
  if (name.startsWith('sd-021-b')) return 'Python';
  // sd-017 e sd-019-a: heurística simples por palavra-chave
  if (/(react|trybetunes|trybewallet|trivia|recipes|starwars|store-front|online-store|testing-library)/.test(name)) return 'React';
  return 'Back-end Node/TS';
}
// Nome legível a partir do slug do repo
function nomeLegivel(name) {
  return name.replace(/^sd-\d+-?[a-z]?-/,'').replace(/^(project|mysql)-/,'')
    .split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
}

const dirs = fs.readdirSync(SRC, { withFileTypes:true })
  .filter(d=>d.isDirectory() && d.name.startsWith('sd-'))
  .map(d=>d.name);

const projetos = dirs.map(name => {
  if (CURADOS[name]) return { ...CURADOS[name], origem:`tryber/${name}` };
  return {
    slug:name, nome:nomeLegivel(name), categoria:categoriaTurma(name),
    stack:[], demo:false, codigo:false, descricao:'', origem:`tryber/${name}`,
  };
});

// Ordem das categorias
const ORDEM = ['Fundamentos JS','React','Back-end Node/TS','Python'];
projetos.sort((a,b)=> ORDEM.indexOf(a.categoria)-ORDEM.indexOf(b.categoria)
  || (b.codigo - a.codigo) || a.nome.localeCompare(b.nome));

fs.writeFileSync(OUT, JSON.stringify(projetos, null, 2));
console.log(`projetos.json: ${projetos.length} projetos, ${projetos.filter(p=>p.codigo).length} curados`);
```

- [ ] **Step 2: Rodar e verificar contagem**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io" && node scripts/build-base-json.js
```
Expected: `projetos.json: 43 projetos, 12 curados`

- [ ] **Step 3: Conferir que os 12 curados têm descrição**
```bash
node -e "const p=require('./projetos.json');const c=p.filter(x=>x.codigo);console.log(c.length, c.every(x=>x.descricao && x.stack.length)?'OK':'FALTA META')"
```
Expected: `12 OK`

- [ ] **Step 4: Commit**
```bash
git add scripts/build-base-json.js projetos.json
git commit -m "feat: gerador da base de projetos.json (43 projetos, 12 curados)"
```

---

## Task 3: Gerador da página `gerar.js`

**Files:**
- Create: `morkertt.github.io/gerar.js`
- Create: `morkertt.github.io/assets/style.css`
- Create (saída): `morkertt.github.io/index.html`

- [ ] **Step 1: Escrever `assets/style.css`**

```css
:root{ --navy:#16243f; --navy2:#1f3257; --tan:#c9b48d; --txt:#2b2b2b; --muted:#6b7280; --line:#e5e7eb; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Segoe UI",Arial,sans-serif;color:var(--txt);background:#f7f8fa;line-height:1.5}
a{color:inherit;text-decoration:none}
header{background:var(--navy);color:#fff;padding:48px 24px}
.header-inner{max-width:1000px;margin:0 auto;display:flex;gap:20px;align-items:center;flex-wrap:wrap}
.avatar{width:84px;height:84px;border-radius:50%;background-size:cover;background-position:center;flex-shrink:0;border:3px solid var(--tan)}
.h-name{font-size:28px;font-weight:800}
.h-role{color:var(--tan);letter-spacing:1px;font-size:13px;text-transform:uppercase;margin-top:4px}
.h-links{margin-top:10px;display:flex;gap:14px;flex-wrap:wrap}
.h-links a{background:var(--navy2);padding:7px 14px;border-radius:6px;font-size:13px;font-weight:600}
.h-links a:hover{background:var(--tan);color:var(--navy)}
main{max-width:1000px;margin:0 auto;padding:32px 24px 64px}
.cat{font-size:20px;font-weight:800;color:var(--navy);margin:34px 0 14px;border-bottom:2px solid var(--line);padding-bottom:6px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.card{background:#fff;border:1px solid var(--line);border-radius:10px;padding:18px;display:flex;flex-direction:column}
.card.curado{border-left:4px solid var(--tan)}
.c-nome{font-weight:700;font-size:16px;color:var(--navy)}
.c-desc{color:var(--muted);font-size:13px;margin:6px 0 10px;flex:1}
.tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
.tag{background:#eef1f6;color:var(--navy);font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px}
.btns{display:flex;gap:8px}
.btn{font-size:13px;font-weight:600;padding:7px 12px;border-radius:6px;text-align:center}
.btn-demo{background:var(--navy);color:#fff}
.btn-demo:hover{background:var(--navy2)}
.btn-code{background:#fff;color:var(--navy);border:1px solid var(--navy)}
.btn-code:hover{background:var(--navy);color:#fff}
footer{text-align:center;color:var(--muted);font-size:12px;padding:24px}
@media(max-width:600px){.grid{grid-template-columns:1fr}}
```

- [ ] **Step 2: Escrever `gerar.js`**

```js
const fs = require('fs');
const BASE = 'C:/Users/andre/dev/Cloude/Teste/morkertt.github.io';
const projetos = JSON.parse(fs.readFileSync(BASE + '/projetos.json', 'utf8'));
const GH = 'https://github.com/morkertt/morkertt.github.io/tree/main/projetos';

const ORDEM = ['Fundamentos JS','React','Back-end Node/TS','Python'];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function card(p){
  const tags = p.stack.map(t=>`<span class="tag">${esc(t)}</span>`).join('');
  let btns = '';
  if (p.demo)   btns += `<a class="btn btn-demo" href="projetos/${p.slug}/">Demo</a>`;
  if (p.codigo) btns += `<a class="btn btn-code" href="${GH}/${p.slug}/">Código</a>`;
  return `<div class="card ${p.codigo?'curado':''}">
    <div class="c-nome">${esc(p.nome)}</div>
    <div class="c-desc">${esc(p.descricao || 'Projeto desenvolvido no bootcamp.')}</div>
    <div class="tags">${tags}</div>
    <div class="btns">${btns}</div>
  </div>`;
}

const secoes = ORDEM.map(cat => {
  const itens = projetos.filter(p=>p.categoria===cat);
  if (!itens.length) return '';
  return `<h2 class="cat">${esc(cat)} <span style="font-weight:400;color:#6b7280;font-size:14px">(${itens.length})</span></h2>
    <div class="grid">${itens.map(card).join('')}</div>`;
}).join('');

const html = `<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>André Morkertt — Portfólio</title>
<link rel="stylesheet" href="assets/style.css">
</head><body>
<header><div class="header-inner">
  <div class="avatar" style="background-image:url('assets/foto.jpg')"></div>
  <div>
    <div class="h-name">André Oliveira Morkertt</div>
    <div class="h-role">Desenvolvedor Full-Stack</div>
    <div class="h-links">
      <a href="https://github.com/morkertt">GitHub</a>
    </div>
  </div>
</div></header>
<main>
  <p style="color:#6b7280;margin-bottom:8px">${projetos.length} projetos desenvolvidos no bootcamp — ${projetos.filter(p=>p.codigo).length} com código/demo disponíveis.</p>
  ${secoes}
</main>
<footer>Gerado por gerar.js · ${projetos.length} projetos</footer>
</body></html>`;

fs.writeFileSync(BASE + '/index.html', html);
console.log('index.html gerado:', projetos.length, 'cards');
```

- [ ] **Step 3: Rodar o gerador**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io" && node gerar.js
```
Expected: `index.html gerado: 43 cards`

- [ ] **Step 4: Verificar o HTML (contagem de cards e curados)**
```bash
node -e "const h=require('fs').readFileSync('index.html','utf8');console.log('cards:',(h.match(/class=\"card /g)||[]).length,'| botoes Código:',(h.match(/btn-code/g)||[]).length,'| Demo:',(h.match(/btn-demo/g)||[]).length)"
```
Expected: `cards: 43 | botoes Código: 12 | Demo: 6`

- [ ] **Step 5: Preview renderizado (screenshot)**
```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --screenshot="preview.png" --window-size=1100,1400 "index.html"
```
Então ler `preview.png` e conferir visual. Ajustar CSS se necessário e repetir Steps 3-5.

- [ ] **Step 6: Commit**
```bash
git add gerar.js assets/style.css index.html
git commit -m "feat: gerador da landing page + estilo"
```

---

## Task 4: Copiar código dos curados para `projetos/<slug>/`

**Files:**
- Create: `morkertt.github.io/scripts/copiar-curados.js`
- Create: `morkertt.github.io/projetos/<slug>/...`

- [ ] **Step 1: Escrever `scripts/copiar-curados.js`**

```js
// Copia o conteúdo de cada curado (sem .git e node_modules) para projetos/<slug>/
const fs = require('fs');
const path = require('path');
const SRC = 'C:/Users/andre/dev/Cloude/Teste/trybe-projetos';
const DEST = 'C:/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos';
const projetos = require('C:/Users/andre/dev/Cloude/Teste/morkertt.github.io/projetos.json')
  .filter(p => p.codigo);

const IGNORAR = new Set(['.git','node_modules','.github','coverage','dist','build']);
function copiar(src, dst){
  fs.mkdirSync(dst, { recursive:true });
  for (const e of fs.readdirSync(src, { withFileTypes:true })){
    if (IGNORAR.has(e.name)) continue;
    const s = path.join(src,e.name), d = path.join(dst,e.name);
    if (e.isDirectory()) copiar(s,d);
    else fs.copyFileSync(s,d);
  }
}
for (const p of projetos){
  const origem = p.origem.replace('tryber/','');
  const src = path.join(SRC, origem);
  const dst = path.join(DEST, p.slug);
  if (!fs.existsSync(src)){ console.log('FALTA origem:', origem); continue; }
  copiar(src, dst);
  console.log('copiado:', p.slug);
}
```

- [ ] **Step 2: Rodar a cópia**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io" && node scripts/copiar-curados.js
```
Expected: 12 linhas `copiado: <slug>`, nenhuma `FALTA origem`.

- [ ] **Step 3: Verificar que cada pasta tem conteúdo e nenhum node_modules**
```bash
ls projetos && find projetos -name node_modules -type d | head
```
Expected: 12 pastas; nenhum `node_modules` listado.

- [ ] **Step 4: Commit**
```bash
git add projetos scripts/copiar-curados.js
git commit -m "feat: código-fonte dos 12 projetos curados"
```

---

## Task 5: Demos vanilla (front-end sem build)

**Files:**
- Modify: nada de código; valida que as demos abrem direto.

Os 3 vanilla (`pixels-art`, `trybewarts`, `shopping-cart`) têm `index.html` próprio e
rodam servidos como estáticos sem build.

- [ ] **Step 1: Confirmar que cada um tem index.html**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io"
for s in pixels-art trybewarts shopping-cart; do echo "$s:"; ls projetos/$s/index.html 2>&1; done
```
Expected: três caminhos `projetos/<slug>/index.html` existentes.

- [ ] **Step 2: Preview de uma demo vanilla**
```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --screenshot="preview-pixels.png" --window-size=900,900 "projetos/pixels-art/index.html"
```
Ler `preview-pixels.png`: a tela do Pixels Art deve renderizar. Se quebrar por caminho
absoluto de CSS/JS, ajustar para caminho relativo no HTML do projeto.

- [ ] **Step 3: Commit (se houve ajuste)**
```bash
git add projetos
git commit -m "fix: caminhos relativos nas demos vanilla" || echo "sem mudanças"
```

---

## Task 6: Demos React (tentar build, fallback para só código)

**Files:**
- Create: `morkertt.github.io/scripts/build-demos.js`
- Modify: `morkertt.github.io/projetos.json` (rebaixar demo:false se build falhar)

Os 3 React (`trybewallet`, `trybetunes`, `starwars-search`) são Create React App.
Build precisa de `homepage` relativo para funcionar em subpasta.

- [ ] **Step 1: Escrever `scripts/build-demos.js`**

```js
// Tenta buildar cada demo React em projetos/<slug>/ e mover build/ para a raiz da subpasta.
// Em falha, marca demo:false no projetos.json e segue.
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/andre/dev/Cloude/Teste/morkertt.github.io';
const REACT = ['trybewallet','trybetunes','starwars-search'];
const projetos = JSON.parse(fs.readFileSync(BASE+'/projetos.json','utf8'));

for (const slug of REACT){
  const dir = path.join(BASE,'projetos',slug);
  try {
    // homepage relativo p/ assets carregarem em subpasta
    const pkgPath = path.join(dir,'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath,'utf8'));
    pkg.homepage = '.';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg,null,2));
    console.log(`[${slug}] npm ci...`);
    execSync('npm ci --no-audit --no-fund', { cwd:dir, stdio:'inherit' });
    console.log(`[${slug}] build...`);
    execSync('npm run build', { cwd:dir, stdio:'inherit', env:{...process.env, CI:'false'} });
    console.log(`[${slug}] OK`);
  } catch(e){
    console.log(`[${slug}] FALHOU build -> demo:false`);
    const p = projetos.find(x=>x.slug===slug); if (p) p.demo = false;
  }
}
fs.writeFileSync(BASE+'/projetos.json', JSON.stringify(projetos,null,2));
console.log('Demos React com sucesso:', projetos.filter(p=>REACT.includes(p.slug)&&p.demo).map(p=>p.slug).join(', ') || 'nenhuma');
```

- [ ] **Step 2: Rodar (pode demorar; builds antigos)**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io" && node scripts/build-demos.js
```
Expected: para cada slug, `OK` ou `FALHOU build -> demo:false`. Anotar quais caíram.

- [ ] **Step 3: Servir o demo buildado a partir de build/**

Para os que buildaram: a demo precisa apontar para `projetos/<slug>/build/`.
Atualizar o link no gerador para usar `build/` quando React. Editar `gerar.js`,
linha do `btn-demo`, para:
```js
if (p.demo){ const base = p.react ? `projetos/${p.slug}/build/` : `projetos/${p.slug}/`;
  btns += `<a class="btn btn-demo" href="${base}">Demo</a>`; }
```
E em `build-demos.js` Step 1, marcar `p.react=true` nos que buildaram. (Adicionar
`const pr = projetos.find(x=>x.slug===slug); if(pr) pr.react=true;` após o build OK.)

- [ ] **Step 4: Regenerar e verificar**
```bash
node gerar.js && node -e "const h=require('fs').readFileSync('index.html','utf8');console.log('Demos:',(h.match(/btn-demo/g)||[]).length)"
```
Expected: `Demos: 6` (3 vanilla + React que buildaram); menos se algum React falhou.

- [ ] **Step 5: Commit**
```bash
git add -A
git commit -m "feat: demos React (build + fallback) e regeneração"
```

---

## Task 7: Criar o repositório no GitHub e publicar

**Files:** nenhum novo.

- [ ] **Step 1: Criar o repo público e dar push**
```bash
cd "/c/Users/andre/dev/Cloude/Teste/morkertt.github.io"
gh repo create morkertt/morkertt.github.io --public --source=. --remote=origin --push
```
Expected: repo criado e `main` enviado.

- [ ] **Step 2: Ativar GitHub Pages (branch main, raiz)**
```bash
gh api -X POST repos/morkertt/morkertt.github.io/pages -f "source[branch]=main" -f "source[path]=/" 2>&1 || \
gh api -X PUT repos/morkertt/morkertt.github.io/pages -f "source[branch]=main" -f "source[path]=/"
```
Expected: JSON com a config do Pages (ou já habilitado por ser `<user>.github.io`).

- [ ] **Step 3: Aguardar e verificar o site no ar**
```bash
sleep 60 && curl -sI https://morkertt.github.io | head -1
```
Expected: `HTTP/2 200`.

---

## Task 8: Verificação final do site ao vivo

- [ ] **Step 1: Screenshot da home publicada**
```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --screenshot="preview-live.png" --window-size=1100,1400 "https://morkertt.github.io"
```
Ler `preview-live.png`: header com foto, 4 seções, 43 cards, botões nos curados.

- [ ] **Step 2: Testar um link de Código e uma Demo**
```bash
curl -sI https://morkertt.github.io/projetos/pixels-art/ | head -1
curl -sI "https://github.com/morkertt/morkertt.github.io/tree/main/projetos/blogs-api" | head -1
```
Expected: `200` na demo; `200` no link de código.

- [ ] **Step 3: Relatório final**

Listar: URL do site, quais demos ficaram ao vivo, quais React caíram para só-código,
e próximos passos sugeridos (LinkedIn no header, README do repo, hospedar back-ends).

---

## Notas de execução
- **Builds React** (Task 6) são o ponto frágil: se `npm ci` falhar por lockfile antigo,
  tentar `npm install --legacy-peer-deps`. Se ainda assim falhar, aceitar `demo:false`.
- **Não** versionar `node_modules` (está no `.gitignore`); para React, versionar só `build/`.
- Reexecutar tudo: `node scripts/build-base-json.js && node gerar.js`.
