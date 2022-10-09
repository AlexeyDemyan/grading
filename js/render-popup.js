import { openExchangeModal } from './modal.js';
import { calculateMaxExchangeAmount } from './util.js';

const popupCardTemplate = document.querySelector('#map-baloon__template').content;

const renderPopup = (sellerData) => {

  const userCardELement = document.createElement('div');

  const popupCardElement = popupCardTemplate.cloneNode(true);
  const userCardNameElement = popupCardElement.querySelector('.user-card__user-name');
  const userNameElement = userCardNameElement.querySelector('#seller-name');
  const sellerCurrencyElement = popupCardElement.querySelector('#seller-currency');
  const sellerExchangeRateElement = popupCardElement.querySelector('#seller-exchange-rate');
  const sellerLimitElement = popupCardElement.querySelector('#seller-limit');
  const badgesListElement = popupCardElement.querySelector('.user-card__badges-list');
  const starBadge = popupCardElement.querySelector('.star-badge');
  const exchangeButton = popupCardElement.querySelector('.exchange-btn');

  userNameElement.textContent = sellerData.userName;
  sellerCurrencyElement.textContent = sellerData.balance.currency
  sellerExchangeRateElement.textContent = `${sellerData.exchangeRate} ₽`;
  sellerLimitElement.textContent = `${sellerData.minAmount}₽ - ${calculateMaxExchangeAmount(sellerData)}₽`;

  if (sellerData.paymentMethods) {
    sellerData.paymentMethods.forEach((item) => {
      const badgeElement = document.createElement('li');
      badgeElement.classList.add('user-card__badges-item');
      badgeElement.classList.add('badge');
      badgeElement.textContent = item.provider;
      badgesListElement.appendChild(badgeElement);
    })
  };

  if (sellerData.isVerified === false) {
    starBadge.style.visibility = 'hidden';
  };

  exchangeButton.addEventListener('click', () => {
    openExchangeModal(sellerData);
  });

  userCardELement.appendChild(popupCardElement);

  return userCardELement;
};

export { renderPopup };

