const calculateMaxExchangeAmount = (user) => {

  if (user.status === 'seller') {
    return (user.balance.amount * user.exchangeRate).toFixed(2);
  }

  else {
    return user.balance.amount;
  }

};

export { calculateMaxExchangeAmount }
