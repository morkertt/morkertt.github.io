const fs = require('fs');
const BASE = 'C:/Users/andre/dev/Cloude/Teste/morkertt.github.io';
const projetos = JSON.parse(fs.readFileSync(BASE + '/projetos.json', 'utf8'));
const GH = 'https://github.com/morkertt/morkertt.github.io/tree/main/projetos';

const ORDEM = ['Fundamentos JS','React','Back-end Node/TS','Python'];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function card(p){
  const tags = p.stack.map(t=>`<span class="tag">${esc(t)}</span>`).join('');
  let btns = '';
  if (p.demo){ const base = p.react ? `projetos/${p.slug}/build/` : `projetos/${p.slug}/`;
    btns += `<a class="btn btn-demo" href="${base}">Demo</a>`; }
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
