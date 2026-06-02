export const USER_EMAIL = 'USE_EMAIL';
export const SUCCESS_RESPONSE = 'SUCCESS_RESPONSE';
export const FAIL_RESPONSE = 'FAIL_RESPONSE';

export function saveEmail(email) {
  return {
    type: USER_EMAIL,
    email,
  };
}

function saveExpenseInfo(info) {
  return {
    type: SUCCESS_RESPONSE,
    info,
  };
}

function failResponse() {
  return {
    type: FAIL_RESPONSE,
  };
}

export function saveWalletInfo(info) {
  return async (dispatch) => {
    try {
      const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await apiResponse.json();
      info.exchangeRates = data;
      dispatch(saveExpenseInfo(info));
    } catch (error) {
      dispatch(failResponse());
    }
  };
}
