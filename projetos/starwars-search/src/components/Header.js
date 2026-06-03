import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Filters from './Filters';
import filterByComparison from '../Helpers';

function Header() {
  const { store: {
    handleFilterByName,
    addNewFilter,
    filterByNumericValues,
  } } = useContext(PlanetsContext);

  const comparisonOptions = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [filters, setFilters] = useState([]);
  const [columnOpt, setColumnOpt] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFilter = {
      column,
      comparison,
      value,
    };
    if (newFilter.column) {
      const filteredPlanets = filterByComparison(newFilter, filterByNumericValues);
      addNewFilter(filteredPlanets);
      setFilters([...filters, newFilter]);
      setColumnOpt(columnOpt.filter((element) => element !== newFilter.column));
      setColumn(columnOpt[1]);
    }
  };

  return (
    <header>
      <h1>Star Wars Planets</h1>
      <p className="demo-hint">Como testar: a tabela já vem com os planetas. Digite no campo abaixo para filtrar por <b>nome</b>, ou monte um filtro numérico (coluna + operador + valor) e clique em <b>Filter</b>.</p>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleFilterByName }
      />
      <form>
        <label
          htmlFor="column-filter"
        >
          Coluna:
          <select
            data-testid="column-filter"
            id="column-filter"
            onChange={ ({ target }) => setColumn(target.value) }
            name="column"
            value={ column }
          >
            {columnOpt.map((option) => (
              <option key={ option }>{option}</option>
            ))}
          </select>
        </label>
        <label
          htmlFor="comparison-filter"
        >
          Operador:
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            onChange={ ({ target }) => setComparison(target.value) }
            name="comparison"
            value={ comparison }
          >
            {comparisonOptions.map((option) => (
              <option key={ option }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="value-filter">
          Valor:
          <input
            type="number"
            data-testid="value-filter"
            name="value"
            id="value-filter"
            onChange={ ({ target }) => setValue(target.value) }
            value={ value }
          />
        </label>
        <button
          type="submit"
          onClick={ handleSubmit }
          data-testid="button-filter"
        >
          Filter
        </button>
      </form>
      <Filters
        filters={ filters }
        setFilters={ setFilters }
        setColumnOpt={ setColumnOpt }
        setColumn={ setColumn }
      />
    </header>
  );
}

export default Header;
