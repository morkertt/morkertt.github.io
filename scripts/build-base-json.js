// Varre trybe-projetos, cria a base de projetos.json.
// Categoriza por turma e nome; aplica overrides dos curados.
const fs = require('fs');
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

function categoriaTurma(name) {
  if (name.startsWith('sd-016-a')) return 'Fundamentos JS';
  if (name.startsWith('sd-021-b')) return 'Python';
  if (/(react|trybetunes|trybewallet|trivia|recipes|starwars|store-front|online-store|testing-library|trybetunes)/.test(name)) return 'React';
  return 'Back-end Node/TS';
}
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

const ORDEM = ['Fundamentos JS','React','Back-end Node/TS','Python'];
projetos.sort((a,b)=> ORDEM.indexOf(a.categoria)-ORDEM.indexOf(b.categoria)
  || (b.codigo - a.codigo) || a.nome.localeCompare(b.nome));

fs.writeFileSync(OUT, JSON.stringify(projetos, null, 2));
console.log(`projetos.json: ${projetos.length} projetos, ${projetos.filter(p=>p.codigo).length} curados`);
