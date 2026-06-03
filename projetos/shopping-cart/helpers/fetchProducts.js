function fallbackResults() {
  return (window.__FALLBACK__ || []).map((p) => ({
    id: p.id,
    title: p.title,
    thumbnail: window.__thumb__(p),
  }));
}

function fetchProducts(QUERY) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`)
    .then((data) => {
      if (!data.ok) throw new Error('api indisponível');
      return data.json();
    })
    .then((json) => (json.results && json.results.length ? json : { results: fallbackResults() }))
    .catch(() => ({ results: fallbackResults() }));
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
