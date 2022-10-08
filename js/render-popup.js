// const renderFeatures = (features) => {
//   const featuresFragment = document.createDocumentFragment();

//   features.forEach((element) => {
//     const featureElement = document.createElement('li');
//     featureElement.classList.add('popup__feature');
//     featureElement.classList.add(`popup__feature--${element}`);
//     featuresFragment.appendChild(featureElement);
//   });

//   return featuresFragment;
// };

// const renderPhotos = (photos) => {
//   const photosFragment = document.createDocumentFragment();

//   photos.forEach((photo) => {
//     const photoElement = cardPhotoTemplate.cloneNode(true);
//     const photoImgElement = photoElement.querySelector('.popup__photo');
//     photoImgElement.src = photo;
//     photosFragment.appendChild(photoElement);
//   });

//   return photosFragment;
// };

import { openExchangeModal } from './modal.js'

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
  const starBadge = popupCardElement.querySelector('#seller-star-badge');
  const exchangeButton = popupCardElement.querySelector('.exchange-btn');

  userNameElement.textContent = sellerData.userName;
  sellerCurrencyElement.textContent = sellerData.balance.currency
  sellerExchangeRateElement.textContent = `${sellerData.exchangeRate} ₽`;
  sellerLimitElement.textContent = `${sellerData.minAmount}₽ - ${sellerData.balance.amount}₽`;

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
    starBadge.remove();
  };

  exchangeButton.addEventListener('click', () => {
    openExchangeModal(sellerData);
  });

  userCardELement.appendChild(popupCardElement);

  return userCardELement;
};

export { renderPopup };

