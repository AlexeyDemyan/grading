import { sendData } from './api.js';

const exchangeForm = document.querySelector('.modal-buy');
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
const userCryptoBalanceElement = userProfileElement.querySelector('#user-crypto-balance');
const passwordErrorMessageElement = exchangeForm.querySelector('.password-error-message');
const contractorIdInputElement = exchangeForm.querySelector('.contractorId');
const exchangeRateInputElement = exchangeForm.querySelector('.exchangeRate');

const mainUserFiatBalanceElement = userProfileElement.querySelector('#user-fiat-balance');
const exchangeAllButton = exchangeForm.querySelector('.exchange-all');

const CORRECT_PASSWORD = '180712';
const HIDE_MESSAGE_DELAY = 1500;
const CASH_PAYMENT_METHOD_REF = 'Cash in person';


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

const populatePaymentMethods = (user) => {
  user.paymentMethods.forEach((method) => {
    const paymentMethodOptionElement = document.createElement('option');
    paymentMethodOptionElement.textContent = method.provider;
    paymentMethodsElement.appendChild(paymentMethodOptionElement)
  })
};

const populateMainUserWalletNumber = () => {
  walletNumberElement.value = userCryptoBalanceElement['data-wallet-number'];
};

const populateCardNumber = (user) => {
  paymentMethodsElement.addEventListener('change', (evt) => {
    if (evt.target.value === CASH_PAYMENT_METHOD_REF) {
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

const exchangeAll = (user) => {
  const mainUserFiatBalance = Number(mainUserFiatBalanceElement.textContent);

  exchangeAllButton.addEventListener('click', () => {
    paymentInputElement.value = mainUserFiatBalance;
    if (user.balance.amount < mainUserFiatBalance) {
      receivalInputElement.value = user.balance.amount;
      paymentInputElement.value = (receivalInputElement.value * user.exchangeRate);
    }
    else receivalInputElement.value = (paymentInputElement.value / user.exchangeRate);

    console.log(user.balance.amount);
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

const resetBuyFormdata = () => {
  exchangeForm.reset();
  paymentMethodsElement.textContent = '';
  const titleElement = document.createElement('option');
  titleElement.textContent = 'Выберите платёжную систему';
  titleElement.selected = true;
  titleElement.disabled = true;
  paymentMethodsElement.appendChild(titleElement);
  passwordErrorMessageElement.textContent = '';
};

const syncPaymentAndReceivalFields = (user) => {
  paymentInputElement.addEventListener('input', () => {
    receivalInputElement.value = (paymentInputElement.value / user.exchangeRate);
  });

  receivalInputElement.addEventListener('input', () => {
    paymentInputElement.value = (receivalInputElement.value * user.exchangeRate);
  });
};

const buyFormHandler = (user) => {
  paymentInputElement.min = user.minAmount;
  paymentInputElement.max = user.balance.amount * user.exchangeRate;
  exchangeAll(user);
  syncPaymentAndReceivalFields(user);
  populatePaymentMethods(user);
  populateCardNumber(user);
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
          resetBuyFormdata();
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

export { buyFormHandler, resetBuyFormdata }
