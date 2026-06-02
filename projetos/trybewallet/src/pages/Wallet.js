import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Forms from './Forms';
import Table from './Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.sumTotal = this.sumTotal.bind(this);
  }

  sumTotal() {
    const { expenses } = this.props;

    if (expenses.length > 0) {
      const result = expenses.reduce((curr, element) => {
        const multiplier = (element.exchangeRates[element.currency].ask * element.value);
        return curr + multiplier;
      }, 0);
      return Number(result).toFixed(2);
    }
    return 0;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <>
        <header>
          <h4 data-testid="email-field">
            Email:
            {userEmail}
          </h4>
          <h5 data-testid="total-field">
            Despesas Totais:
            {this.sumTotal()}
          </h5>
          <h5 data-testid="header-currency-field">
            BRL
          </h5>
        </header>
        <Forms />
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
