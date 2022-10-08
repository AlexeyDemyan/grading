import { showSearchErrorMessage } from './errors.js';
import { openExchangeModal } from './modal.js';

const listOfUsers = document.querySelector('.users-list__table-body');
const userItemTemplate = document.querySelector('#user-table-row__template').content;

const renderUsers = (users) => {
  if (!users) {
    showSearchErrorMessage();
  };

  const userFragment = document.createDocumentFragment();

  users.forEach((user) => {
    const userElement = userItemTemplate.cloneNode(true);
    const userNameElement = userElement.querySelector('.user-name');
    const currencyELement = userElement.querySelector('.users-list__table-currency');
    const exchangeRateElement = userElement.querySelector('.users-list__table-exchangerate');
    const cashLimitElement = userElement.querySelector('.users-list__table-cashlimit');
    const badgesListElement = userElement.querySelector('.users-list__badges-list');
    const starBadge = userElement.querySelector('#star-badge');
    const exchangeButton = userElement.querySelector('.exchange-btn');

    if (user.paymentMethods) {
      user.paymentMethods.forEach((item) => {
        const badgeElement = document.createElement('li');
        badgeElement.classList.add('users-list__badges-item');
        badgeElement.classList.add('badge');
        badgeElement.textContent = item.provider;
        badgesListElement.appendChild(badgeElement);
      })
    };

    if (user.isVerified === false) {
      starBadge.remove();
    };

    exchangeButton.addEventListener('click', () => {
      openExchangeModal(user);
    });

    userNameElement.textContent = user.userName;
    currencyELement.textContent = user.balance.currency;
    exchangeRateElement.textContent = `${user.exchangeRate} ₽`;
    cashLimitElement.textContent = `${user.minAmount}₽ - ${user.balance.amount}₽`;
    userFragment.appendChild(userElement);
  });

  listOfUsers.appendChild(userFragment);
};

export { renderUsers };
