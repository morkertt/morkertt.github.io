const fs = require('fs');
const BASE = 'C:/Users/andre/dev/Cloude/Teste/morkertt.github.io';
const projetos = JSON.parse(fs.readFileSync(BASE + '/projetos.json', 'utf8'));
const GH = 'https://github.com/morkertt/morkertt.github.io/tree/main/projetos';

const ORDEM = ['Fundamentos JS','React','Back-end Node/TS','Python'];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const IC_DEMO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';
const IC_CODE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18-6-6 6-6m6 0 6 6-6 6"/></svg>';

let n = 0; // contador global p/ stagger
function card(p){
  const delay = (n++ * 0.045).toFixed(3);
  const tags = p.stack.map(t=>`<span class="tag">${esc(t)}</span>`).join('');
  let btns = '';
  if (p.demo){ const base = p.react ? `projetos/${p.slug}/build/` : `projetos/${p.slug}/`;
    btns += `<a class="btn btn-demo" href="${base}">${IC_DEMO} Demo</a>`; }
  if (p.codigo) btns += `<a class="btn btn-code" href="${GH}/${p.slug}/">${IC_CODE} Código</a>`;
  return `<article class="card ${p.codigo?'curado':''}" style="animation-delay:${delay}s">
    <h3 class="c-nome">${esc(p.nome)}</h3>
    <p class="c-desc ${p.descricao?'':'plain'}">${esc(p.descricao || 'Projeto desenvolvido durante o bootcamp.')}</p>
    ${tags?`<div class="tags">${tags}</div>`:''}
    ${btns?`<div class="btns">${btns}</div>`:''}
  </article>`;
}

const presentes = ORDEM.filter(c=>projetos.some(p=>p.categoria===c));
const secoes = presentes.map((cat,i) => {
  const itens = projetos.filter(p=>p.categoria===cat);
  return `<section><div class="cat">
      <span class="idx">${String(i+1).padStart(2,'0')}</span>
      <h2>${esc(cat)}</h2>
      <span class="count">${itens.length} projeto${itens.length>1?'s':''}</span>
      <span class="rule"></span>
    </div>
    <div class="grid">${itens.map(card).join('')}</div></section>`;
}).join('');

const total = projetos.length;
const comCodigo = projetos.filter(p=>p.codigo).length;
const comDemo = projetos.filter(p=>p.demo).length;

const html = `<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>André Morkertt · Portfólio</title>
<meta name="description" content="Portfólio de André Morkertt — desenvolvedor full-stack. ${total} projetos em JavaScript, React, Node/TypeScript e Python.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,600&family=Sora:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head><body>
<header class="hero">
  <div class="hero-top">
    <div class="avatar" style="background-image:url('assets/foto.jpg')"></div>
    <div>
      <div class="eyebrow">Desenvolvedor Full-Stack</div>
      <h1 class="name">André <em>Morkertt</em></h1>
      <p class="tagline">Do front ao deploy: JavaScript, React, Node/TypeScript e Python. Abaixo, ${total} projetos construídos ao longo da minha formação — ${comDemo} com demo ao vivo e ${comCodigo} com código aberto.</p>
      <div class="links">
        <a class="link primary" href="https://github.com/morkertt" target="_blank" rel="noopener">GitHub ↗</a>
        <a class="link" href="https://www.linkedin.com/in/andremorkertt/" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a class="link" href="mailto:andre.morkertt@gmail.com">E-mail</a>
      </div>
    </div>
  </div>
  <div class="stats">
    <div class="stat"><div class="n">${total}</div><div class="l">Projetos</div></div>
    <div class="stat"><div class="n">${comDemo}</div><div class="l">Demos ao vivo</div></div>
    <div class="stat"><div class="n">${comCodigo}</div><div class="l">Com código</div></div>
    <div class="stat"><div class="n">${presentes.length}</div><div class="l">Stacks</div></div>
  </div>
</header>
<main>${secoes}</main>
<footer>
  <span>© 2026 André Morkertt</span>
  <span><a href="https://github.com/morkertt" target="_blank" rel="noopener">github.com/morkertt</a></span>
</footer>
</body></html>`;

fs.writeFileSync(BASE + '/index.html', html);
console.log('index.html gerado:', total, 'cards |', comDemo, 'demos |', comCodigo, 'codigo');
