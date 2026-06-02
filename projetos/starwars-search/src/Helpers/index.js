function filterByComparison(newFilter, filterByNumericValues) {
  switch (newFilter.comparison) {
  case 'maior que':
    return filterByNumericValues.filter((planet) => Number(planet[newFilter.column])
      > Number(newFilter.value));
  case 'menor que':
    return filterByNumericValues.filter((planet) => Number(planet[newFilter.column])
      < Number(newFilter.value));
  case 'igual a':
    return filterByNumericValues.filter((planet) => Number(planet[newFilter.column])
      === Number(newFilter.value));
  default:
    break;
  }
}

export default filterByComparison;
