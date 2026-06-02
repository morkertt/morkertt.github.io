import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveWalletInfo } from '../actions';

const ALIMENTACAO = 'Alimentação';
const TAG = [ALIMENTACAO, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class Forms extends React.Component {
  constructor() {
    super();
    this.state = {
      expenseValue: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      coinRatio: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveBtn = this.saveBtn.bind(this);
    this.getRatios = this.getRatios.bind(this);
  }

  componentDidMount() {
    this.getRatios();
  }

  async getRatios() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const info = Object.keys(data);
    const coinRatio = info.filter((e) => e !== 'USDT');
    this.setState({ coinRatio });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveBtn() {
    const { expenseValue, description, currency, method, tag } = this.state;
    const { handleInfo, numberId } = this.props;
    handleInfo({
      id: numberId.length,
      value: expenseValue,
      description,
      currency,
      method,
      tag,
      exchangeRates: {},
    });
    this.setState({
      expenseValue: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });
  }

  render() {
    const { expenseValue, description, currency, method, tag, coinRatio } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="expenseValue"
            value={ expenseValue }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {coinRatio.map((element) => (
              <option key={ element } data-testid={ element }>
                {element}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {METHOD.map((element) => (<option key={ element }>{element}</option>))}
          </select>
        </label>
        <label htmlFor="tag-input">
          Tipo:
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {TAG.map((element) => (<option key={ element }>{element}</option>))}
          </select>
        </label>
        <button
          type="button"
          name="saveBtn"
          onClick={ this.saveBtn }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Forms.propTypes = {
  handleInfo: PropTypes.func.isRequired,
  numberId: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleInfo: (info) => {
    dispatch(saveWalletInfo(info));
  },
});

const mapStateToProps = (state) => ({
  numberId: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
