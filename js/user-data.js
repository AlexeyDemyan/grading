const userProfileElement = document.querySelector('.user-profile');
const userCryptoBalanceElement = userProfileElement.querySelector('#user-crypto-balance');
const userFiatBalanceElement = userProfileElement.querySelector('#user-fiat-balance');
const userProfileNameElement = userProfileElement.querySelector('.user-profile__name');
const userNameElement = userProfileNameElement.querySelector('#user-name');

// need to accrue for errors

const getUserCryptoBalance = (balances) => {
  for (let i = 0; i <= balances.length; i++) {
    if (balances[i].currency === "KEKS") {
      return balances[i].amount;
    }
  }
};

const getUserFiatBalance = (balances) => {
  for (let i = 0; i <= balances.length; i++) {
    if (balances[i].currency === "RUB") {
      return balances[i].amount;
    }
  }
};

const renderMainUserData = (userData) => {
  userNameElement.textContent = userData.userName;
  userCryptoBalanceElement.textContent = getUserCryptoBalance(userData.balances);
  userFiatBalanceElement.textContent = getUserFiatBalance(userData.balances)
};

const hideUserData = () => {
  userProfileElement.style.display = 'none';
};

export { renderMainUserData , hideUserData };
