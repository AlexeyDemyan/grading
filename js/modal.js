import { calculateMaxExchangeAmount } from './util.js';
import { buyFormHandler } from './buy-form.js';
import { sellFormHandler } from './sell-form.js';

const modalBuyElement = document.querySelector('.modal--buy');
const modalSellElement = document.querySelector('.modal--sell');
const mapContainerElement = document.querySelector('.map-container');
const bodyElement = document.querySelector('body');
const modalOverlayElements = document.querySelectorAll('.modal__overlay');
const modalBuyElementCloseButton = modalBuyElement.querySelector('#modal-buy-close-button');
const modalSellElementCloseButton = modalSellElement.querySelector('#modal-sell-close-button');


function onModalEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeExchangeModal();
  }
}

function closeExchangeModal () {
  modalBuyElement.style.display = 'none';
  modalSellElement.style.display = 'none';
  mapContainerElement.style.display = 'block';
  bodyElement.classList.remove('scroll-lock');
  document.removeEventListener('keydown', onModalEscKeydown);
}

const modalsCloseButtonHandler = () => {
  modalBuyElementCloseButton.addEventListener('click', closeExchangeModal);
  modalSellElementCloseButton.addEventListener('click', closeExchangeModal);
};

const populateDataOnModal = (modal, user) => {
  const starBadge = modal.querySelector('.star-badge');
  const modalNameElement = modal.querySelector('.transaction-info-name');
  const modalExchangeRateElement = modal.querySelector('.transaction-info-exchange-rate');
  const modalLimitElement = modal.querySelector('.transaction-info-limit');

  starBadge.style.visibility = 'visible';
  if (user.isVerified === false) {
    starBadge.style.visibility = 'hidden';
  };

  modalNameElement.textContent = user.userName;
  modalExchangeRateElement.textContent = `${user.exchangeRate} ₽`;
  modalLimitElement.textContent = `${user.minAmount}₽ - ${calculateMaxExchangeAmount(user)}₽`;

};

const openExchangeModal = (user) => {
  console.log(user);
  mapContainerElement.style.display = 'none';
  bodyElement.classList.add('scroll-lock');

  if (user.status === 'seller') {
    modalBuyElement.style.display = 'block';
    populateDataOnModal(modalBuyElement, user);
    buyFormHandler(user);
  }
  else {
    modalSellElement.style.display = 'block';
    populateDataOnModal(modalSellElement, user);
    sellFormHandler(user);
  }

  document.addEventListener('keydown', onModalEscKeydown);
  modalOverlayElements.forEach((element) => {
    element.addEventListener('click', closeExchangeModal);
  });
};

export { openExchangeModal, modalsCloseButtonHandler };

