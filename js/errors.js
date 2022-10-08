// const bodyElement = document.querySelector('body');
// const errorMessageTemplate = document.querySelector('#error').content;

const serverErrorMessageContainerElement = document.querySelector('.server-error-message-container');
const menuHeaderContainerElement = document.querySelector('.menu-header-container');
const showSearchErrorMessageContainer = document.querySelector('.search-error-message-container');

const showServerErrorMessage = () => {
  serverErrorMessageContainerElement.style.display = 'block';
  menuHeaderContainerElement.style.display = 'none';
};

const showSearchErrorMessage = () => {
  showSearchErrorMessageContainer.style.display = 'block';
};

// const closeErrorMessage = () => {
//   const errorMessage = document.querySelector('.error');
//   errorMessage.remove();
//   document.removeEventListener('keydown', onErrorMessageEscKedown);
//   document.removeEventListener('click', onErrorMessageClick);
// };

// function onErrorMessageEscKedown (evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     closeErrorMessage();
//   }
// }

// function onErrorMessageClick () {
//   closeErrorMessage();
// }

// const showErrorMessage = () => {
//   const errorMessageFragment = document.createDocumentFragment();
//   const errorMessageElement = errorMessageTemplate.cloneNode(true);
//   const closeButton = errorMessageElement.querySelector('.error__button');

//   errorMessageFragment.appendChild(errorMessageElement);
//   bodyElement.appendChild(errorMessageFragment);
//   closeButton.addEventListener('click', closeErrorMessage);
//   document.addEventListener('keydown', onErrorMessageEscKedown);
//   document.addEventListener('click', onErrorMessageClick);
// };

export { showServerErrorMessage, showSearchErrorMessage };