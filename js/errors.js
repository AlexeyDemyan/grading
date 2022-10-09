const serverErrorMessageContainerElement = document.querySelector('.server-error-message-container');
const menuHeaderContainerElement = document.querySelector('.menu-header-container');
const showSearchErrorMessageContainer = document.querySelector('.search-error-message-container');
const passwordInputElements = document.querySelectorAll('.password');
const passwordErrorMessageElements = document.querySelectorAll('.password-error-message');

const showServerErrorMessage = () => {
  serverErrorMessageContainerElement.style.display = 'block';
  menuHeaderContainerElement.style.display = 'none';
};

const showSearchErrorMessage = () => {
  showSearchErrorMessageContainer.style.display = 'block';
};

const removePasswordErrorMessageHandler = () => {
  passwordInputElements.forEach((element) => {
    element.addEventListener('input', () => {
      passwordErrorMessageElements.forEach((message) => {
        message.textContent = '';
      });
    });
  });
};

export { showServerErrorMessage, showSearchErrorMessage, removePasswordErrorMessageHandler};
