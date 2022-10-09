const CALCULATION_ACCURACY = 2;

const calculateMaxExchangeAmount = (user) => {

  if (user.status === 'seller') {
    return (user.balance.amount * user.exchangeRate).toFixed(CALCULATION_ACCURACY);
  }

  else {
    return user.balance.amount;
  }

};

export { calculateMaxExchangeAmount };
