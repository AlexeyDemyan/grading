const modalBuyElement = document.querySelector('.modal--buy');
const modalSellElement = document.querySelector('.modal--sell');
const mapContainerElement = document.querySelector('.map-container');
const bodyElement = document.querySelector('body');
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

const openExchangeModal = (data) => {
  console.log(data);
  mapContainerElement.style.display = 'none';
  bodyElement.classList.add('scroll-lock');

  if (data.status === 'seller') {
    modalBuyElement.style.display = 'block';
  }
  else {
    modalSellElement.style.display = 'block';
  }

  document.addEventListener('keydown', onModalEscKeydown);

};

export { openExchangeModal, modalsCloseButtonHandler };

