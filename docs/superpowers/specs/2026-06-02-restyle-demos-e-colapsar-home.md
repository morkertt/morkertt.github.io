# Restyle das demos + colapsar a home — Design

> **Data:** 2026-06-02 · **Status:** aprovado (aguardando revisão do spec)

## 1. Visão geral

Dois trabalhos no portfólio `morkertt.github.io`:
1. **Restyle das 6 demos** — cada projeto ganha um visual próprio, adequado ao que ele
   faz (estética distinta por projeto), substituindo o CSS cru do bootcamp.
2. **Colapsar a landing page** — mostrar 3 cards por categoria com botão "Ver mais"
   para expandir, reduzindo o scroll inicial.

## 2. Princípio inegociável (ambos)

**Não quebrar funcionalidade.** O JS/JSX desses projetos seleciona elementos por
ID/classe. Antes de estilizar cada um, ler o JS para mapear os ganchos e **preservá-los**.
Só muda aparência; sem refator de marcação da qual o código dependa.

## 3. Restyle das demos

Abordagem: **CSS puro reescrito por projeto** (sem framework — leve, autêntico e
explicável em entrevista). Markup só recebe ajustes presentacionais que não afetem os
seletores do JS.

| Projeto | Tipo | Direção estética |
|---|---|---|
| Pixels Art | vanilla | Retrô/8-bit limpo: fonte pixel, toolbar organizada, paleta arredondada, grid com sombra leve |
| Trybewarts | vanilla | "Dark academia" mágico: pergaminho/escuro, serifa, tons quentes |
| Shopping Cart | vanilla | E-commerce moderno: grid de produtos, carrinho lateral, cor de destaque |
| Star Wars Search | React | Sci-fi/HUD: fundo espacial escuro, acento âmbar/azul, tabela estilo console |
| Trybetunes | React | Player tipo Spotify: escuro, acento vibrante, cards de álbum, navbar limpa |
| Trybewallet | React | Fintech: claro e confiável, card de resumo, tabela de gastos, números formatados |

Para as 3 React: editar os `.css` em `src/`, depois `npm run build`
(com `NODE_OPTIONS=--openssl-legacy-provider`), e a demo serve de `build/`.

Verificação por projeto: subir o build/pasta num servidor local HTTP e tirar screenshot
(o `file://` engana com apps React Router — usar `scripts/serve.js`).

## 4. Colapsar a home (gerar.js)

- Em cada categoria, os 3 primeiros cards ficam visíveis; os demais recebem a classe
  `.extra` (oculta por CSS).
- Categorias com >3 projetos ganham um botão `.ver-mais` com o texto "Ver mais (N)".
- Um trecho mínimo de JS (~8 linhas, inline no index.html) alterna a classe `.aberto`
  na `<section>` da categoria, revelando os `.extra` e trocando o texto para "Ver menos".
- Categorias com ≤3 projetos não recebem botão.
- Como a ordenação já coloca curados (demo/código) primeiro, os 3 visíveis são os mais fortes.
- Acessibilidade: o botão é um `<button>` real com `aria-expanded` alternando.

## 5. Critérios de sucesso

- As 6 demos com visual próprio e **funcionando** (login/listas/etc. operando como antes).
- Home inicia mostrando 3 cards por categoria; "Ver mais" expande/recolhe sem recarregar.
- Nenhuma regressão nas demos (verificado por screenshot via HTTP).
- Nada de framework novo; CSS/JS legível e explicável.

## 6. Fora de escopo

- Mudar o visual da própria landing (já aprovado anteriormente).
- Demos de back-end (continuam sem demo).
