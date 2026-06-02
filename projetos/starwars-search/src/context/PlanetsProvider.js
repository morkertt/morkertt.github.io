import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/api';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const addNewFilter = (newFilter) => {
    setFilterByNumericValues(newFilter);
  };

  const handleFilterByName = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const planets = async () => {
    const result = await fetchPlanets();
    setData(result);
    setFilterByNumericValues(result);
  };

  useEffect(() => { planets(); }, []);

  const store = {
    data,
    filterByName,
    handleFilterByName,
    filterByNumericValues,
    addNewFilter,
  };

  return (
    <main>
      <PlanetsContext.Provider value={ { store } }>
        {children}
      </PlanetsContext.Provider>
    </main>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default PlanetsProvider;
