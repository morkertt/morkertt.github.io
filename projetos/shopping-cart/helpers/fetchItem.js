// Dataset de fallback (a API pública do Mercado Livre passou a exigir auth → 403).
// Mantemos a chamada real e caímos para estes dados de exemplo quando ela falha.
window.__FALLBACK__ = [
  { id: 'A1', title: 'Notebook Ultra 14"', price: 3499.9, color: '#2f6df6' },
  { id: 'A2', title: 'Mouse Sem Fio Slim', price: 129.9, color: '#16a34a' },
  { id: 'A3', title: 'Teclado Mecânico RGB', price: 349.0, color: '#e0457b' },
  { id: 'A4', title: 'Monitor 27" 144Hz', price: 1599.0, color: '#f59e0b' },
  { id: 'A5', title: 'Headset Gamer 7.1', price: 299.9, color: '#8b5cf6' },
  { id: 'A6', title: 'Cadeira Gamer Pro', price: 1199.0, color: '#0ea5e9' },
  { id: 'A7', title: 'Webcam Full HD', price: 219.9, color: '#ef4444' },
  { id: 'A8', title: 'SSD 1TB NVMe', price: 459.0, color: '#10b981' },
];
window.__thumb__ = function (p) {
  const letra = p.title.charAt(0);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>` +
    `<rect width='200' height='200' rx='18' fill='${p.color}'/>` +
    `<text x='100' y='128' font-size='96' font-family='Arial' font-weight='bold' fill='white' text-anchor='middle'>${letra}</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
};

function fetchItem(id) {
  const link = `https://api.mercadolibre.com/items/${id}`;
  return fetch(link)
    .then((data) => {
      if (!data.ok) throw new Error('api indisponível');
      return data.json();
    })
    .catch(() => {
      const p = window.__FALLBACK__.find((x) => x.id === id) || window.__FALLBACK__[0];
      return { id: p.id, title: p.title, price: p.price };
    });
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
