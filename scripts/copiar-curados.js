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
