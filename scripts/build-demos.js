// Tenta buildar cada demo React (CRA) em projetos/<slug>/.
// Em sucesso: marca react:true (a demo serve de build/). Em falha: demo:false.
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/andre/dev/Cloude/Teste/morkertt.github.io';
const REACT = ['trybewallet','trybetunes','starwars-search'];
const projetos = JSON.parse(fs.readFileSync(BASE+'/projetos.json','utf8'));

function run(cmd, dir, extraEnv){
  execSync(cmd, { cwd:dir, stdio:'inherit', env:{...process.env, ...extraEnv} });
}

for (const slug of REACT){
  const dir = path.join(BASE,'projetos',slug);
  const p = projetos.find(x=>x.slug===slug);
  try {
    // homepage relativo p/ assets carregarem em subpasta
    const pkgPath = path.join(dir,'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath,'utf8'));
    pkg.homepage = '.';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg,null,2));

    console.log(`\n=== [${slug}] instalando deps ===`);
    // --engine-strict=false sobrescreve .npmrc de projetos antigos (engines node:16)
    try { run('npm ci --no-audit --no-fund --engine-strict=false', dir); }
    catch { console.log(`[${slug}] npm ci falhou, tentando npm install --legacy-peer-deps`);
            run('npm install --no-audit --no-fund --legacy-peer-deps --engine-strict=false', dir); }

    console.log(`=== [${slug}] build ===`);
    run('npm run build', dir, { CI:'false', NODE_OPTIONS:'--openssl-legacy-provider' });

    if (fs.existsSync(path.join(dir,'build','index.html'))){
      console.log(`[${slug}] OK (build/ gerado)`);
      if (p){ p.demo = true; p.react = true; }
    } else {
      throw new Error('build/index.html ausente');
    }
  } catch(e){
    console.log(`[${slug}] FALHOU -> demo:false (${(e.message||'').split('\n')[0]})`);
    if (p){ p.demo = false; p.react = false; }
  }
}
fs.writeFileSync(BASE+'/projetos.json', JSON.stringify(projetos,null,2));
const ok = projetos.filter(p=>REACT.includes(p.slug)&&p.demo).map(p=>p.slug);
console.log('\n=== RESUMO React ===');
console.log('Demos OK:', ok.length ? ok.join(', ') : 'nenhuma');
