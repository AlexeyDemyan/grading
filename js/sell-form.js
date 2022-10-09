import { sendData } from './api.js';

const exchangeForm = document.querySelector('.modal-sell');
const submitButton = exchangeForm.querySelector('.modal__submit');
const paymentInputElement = exchangeForm.querySelector('.payment-input');
const receivalInputElement = exchangeForm.querySelector('.receival-input');
const paymentMethodsElement = exchangeForm.querySelector('.payment-methods');
const cardNumberElement = exchangeForm.querySelector('.card-number');
const walletNumberElement = exchangeForm.querySelector('.wallet-number');
const passwordInputElement = exchangeForm.querySelector('.password');
const errorMessageElement = exchangeForm.querySelector('.modal__validation-message--error');
const successMessageElement = exchangeForm.querySelector('.modal__validation-message--success');
const userProfileElement = document.querySelector('.user-profile');
const passwordErrorMessageElement = exchangeForm.querySelector('.password-error-message');
const contractorIdInputElement = exchangeForm.querySelector('.contractorId');
const exchangeRateInputElement = exchangeForm.querySelector('.exchangeRate');

const mainUserCryptoBalanceElement = userProfileElement.querySelector('#user-crypto-balance');
const exchangeAllButtons = exchangeForm.querySelectorAll('.exchange-all');

const CORRECT_PASSWORD = '180712';
const HIDE_MESSAGE_DELAY = 1500;

const PRISTINE_CONFIG = {
  classTo: 'modal-form__element',
  errorClass: 'has-error',
  successClass: 'has-success',
  errorTextParent: 'modal-form__element',
  errorTextTag: 'div',
  errorTextClass: 'custom-input__error'
};

const fillInFormFields = (contractorId, exchangeRate) => {
  contractorIdInputElement.value = contractorId;
  exchangeRateInputElement.value = exchangeRate;
};

const populateMainUserWalletNumber = () => {
  walletNumberElement.value = mainUserCryptoBalanceElement['data-wallet-number'];
};

const populateCardNumber = (user) => {
  paymentMethodsElement.addEventListener('change', (evt) => {
    if (evt.target.value === 'Cash in person') {
      cardNumberElement.value = ' ';
    }
    else {
      user.paymentMethods.forEach((method) => {
      if (method.provider === evt.target.value) {
        cardNumberElement.value = method.accountNumber;
      }
    })
    }
  })
};

const validatePassword = () => {
  if (passwordInputElement.value !== CORRECT_PASSWORD) {
    passwordErrorMessageElement.textContent = 'Неверный пароль!';
  }
  else return true;
};

const populateMainUserPaymentMethods = (user) => {
  user.paymentMethods.forEach((method) => {
    const paymentMethodOptionElement = document.createElement('option');
    paymentMethodOptionElement.textContent = method.provider;
    paymentMethodsElement.appendChild(paymentMethodOptionElement)
  });

  populateCardNumber(user);
};

const exchangeAll = (user) => {
  const mainUserCryptoBalance = Number(mainUserCryptoBalanceElement.textContent);

  exchangeAllButtons.forEach((button) => {
    button.addEventListener('click', () => {
      paymentInputElement.value = mainUserCryptoBalance;
      if (user.balance.amount < mainUserCryptoBalance * user.exchangeRate) {
        paymentInputElement.value = (user.balance.amount / user.exchangeRate);
        receivalInputElement.value = user.balance.amount;
      }
      else receivalInputElement.value = (mainUserCryptoBalance * user.exchangeRate);

      console.log(user.balance.amount);
    })
  })
};

const showErrorMessage = () => {
  errorMessageElement.style.visibility = "visible";
};

const hideErrorMessage = () => {
  errorMessageElement.style.visibility = "hidden";
};

const showSuccessMessage = () => {
  successMessageElement.style.visibility = "visible";
};

const hideSuccessMessage = () => {
  successMessageElement.style.visibility = "hidden";
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
};

const resetSellFormData = () => {
  exchangeForm.reset();
  passwordErrorMessageElement.textContent = '';
};

const syncPaymentAndReceivalFields = (user) => {
  paymentInputElement.addEventListener('input', () => {
    receivalInputElement.value = (paymentInputElement.value * user.exchangeRate);
  });

  receivalInputElement.addEventListener('input', () => {
    paymentInputElement.value = (receivalInputElement.value / user.exchangeRate);
  });
};

const sellFormHandler = (user) => {
  paymentInputElement.min = (user.minAmount / user.exchangeRate);
  paymentInputElement.max = Number(mainUserCryptoBalanceElement.textContent);
  exchangeAll(user);
  syncPaymentAndReceivalFields(user);
  populateMainUserWalletNumber();

  const pristine = new Pristine(exchangeForm, PRISTINE_CONFIG, true);

  exchangeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fillInFormFields(user.id, user.exchangeRate);
    const formData = new FormData(evt.target);
    const formIsValid = pristine.validate();
    const passwordIsValid = validatePassword();
    if (formIsValid && passwordIsValid) {
      disableSubmitButton();
      sendData(
        () => {
          enableSubmitButton();
          resetFormData();
          showSuccessMessage();
          setTimeout(hideSuccessMessage, HIDE_MESSAGE_DELAY);
        },
        () => {
          enableSubmitButton();
          showErrorMessage();
          setTimeout(hideErrorMessage, HIDE_MESSAGE_DELAY);
        },
        formData
      );
    }
  });
};

export { sellFormHandler, populateMainUserPaymentMethods, resetSellFormData }
