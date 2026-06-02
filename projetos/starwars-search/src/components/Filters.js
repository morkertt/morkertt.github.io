import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import filterByComparison from '../Helpers';
import PlanetsContext from '../context/PlanetsContext';

function Filters({ filters, setFilters, setColumnOpt, setColumn }) {
  const { store: { filterByNumericValues } } = useContext(PlanetsContext);
  const deleteFilter = (column) => {
    setFilters(filters.filter((element) => element.column !== column));
    setColumnOpt((prevState) => [...prevState, column]);
    setColumn(column);
    filterByComparison(filters, filterByNumericValues);
  };
  return (
    <>
      {filters.map(({ column, comparison, value }, index) => (
        <section key={ index }>
          <p key={ index } data-testid="filter">{`${column} ${comparison} ${value}`}</p>
          <button type="button" onClick={ () => deleteFilter(column) }>
            x
          </button>
        </section>
      ))}
    </>
  );
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  setFilters: PropTypes.func,
  setColumnOpt: PropTypes.func,
  setColumn: PropTypes.func,
}.isRequired;

export default Filters;
