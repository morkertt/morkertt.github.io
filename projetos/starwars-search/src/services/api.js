import response from '../testData';

// A API original (swapi-trybe no Heroku) saiu do ar — Heroku encerrou o tier grátis.
// Mantemos a chamada e caímos para o dataset local (testData) quando ela falha.
const fetchPlanets = async () => {
  try {
    const res = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    if (!res.ok) throw new Error('api indisponível');
    const data = await res.json();
    if (!data.results || !data.results.length) throw new Error('sem resultados');
    return data.results;
  } catch (e) {
    return response.results;
  }
};

export default fetchPlanets;
