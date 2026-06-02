import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HEADER_INPUTS = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {HEADER_INPUTS.map((element) => <th key={ element }>{element}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 && expenses.map((element) => (
            <tr key={ element.id }>
              <td>{ element.description }</td>
              <td>{ element.tag }</td>
              <td>{ element.method }</td>
              <td>{ Number(element.value).toFixed(2) }</td>
              <td>{ element.exchangeRates[element.currency].name }</td>
              <td>
                {
                  Number(element.exchangeRates[element.currency].ask).toFixed(2)
                }

              </td>
              <td>
                {
                  Number(
                    element.exchangeRates[element.currency].ask * element.value,
                  )
                    .toFixed(2)
                }

              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

// https://www.w3schools.com/html/html_tables.asp
export default connect(mapStateToProps)(Table);
