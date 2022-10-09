import { sendData } from './api.js';
// import { showSuccessMessage } from './success.js';
// import { showErrorMessage } from './error.js';

const exchangeForm = document.querySelector('.modal-buy');
const submitButton = exchangeForm.querySelector('.modal__submit');
const paymentInputElement = exchangeForm.querySelector('#payment-input');
const receivalInputElement = exchangeForm.querySelector('#receival-input');
const paymentMethodsElement = exchangeForm.querySelector('.payment-methods');
const cardNumberElement = exchangeForm.querySelector('.card-number');
const walletNumberElement = exchangeForm.querySelector('.wallet-number');
const passwordInputElement = exchangeForm.querySelector('.password');
const errorMessageElement = exchangeForm.querySelector('.modal__validation-message--error');
const successMessageElement = exchangeForm.querySelector('.modal__validation-message--success');
const userProfileElement = document.querySelector('.user-profile');
const userCryptoBalanceElement = userProfileElement.querySelector('#user-crypto-balance');

// const mainUserCryptoBalanceElement = userProfileElement.querySelector('#user-crypto-balance');
const mainUserFiatBalanceElement = userProfileElement.querySelector('#user-fiat-balance');
const exchangeAllButton = exchangeForm.querySelector('.exchange-all');

const CORRECT_PASSWORD = '180712';

const PRISTINE_CONFIG = {
  classTo: 'modal-form__element',
  errorClass: 'has-error',
  successClass: 'has-success',
  errorTextParent: 'modal-form__element',
  errorTextTag: 'div',
  errorTextClass: 'custom-input__error'
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

const exchangeAll = (user) => {
  // const mainUserCryptoBalance = Number(mainUserCryptoBalanceElement.textContent);
  const mainUserFiatBalance = Number(mainUserFiatBalanceElement.textContent);

  exchangeAllButton.addEventListener('click', () => {
    paymentInputElement.value = mainUserFiatBalance;
    if (user.balance.amount < mainUserFiatBalance) {
      receivalInputElement.value = user.balance.amount;
      paymentInputElement.value = (receivalInputElement.value * user.exchangeRate).toFixed(2);
    }
    else receivalInputElement.value = (paymentInputElement.value / user.exchangeRate).toFixed(2);

    console.log(user.balance.amount);
  })
};

const showErrorMessage = () => {
  errorMessageElement.style.visibility = "visible";
};

const showSuccessMessage = () => {
  successMessageElement.style.visibility = "visible";
}

const disableSubmitButton = () => {
  submitButton.disabled = true;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
};

const resetFormData = () => {
  // remove select options
  exchangeForm.reset();
};

const syncPaymentAndReceivalFields = (user) => {
  paymentInputElement.addEventListener('input', () => {
    receivalInputElement.value = (paymentInputElement.value / user.exchangeRate).toFixed(2);
  });

  receivalInputElement.addEventListener('input', () => {
    paymentInputElement.value = (receivalInputElement.value * user.exchangeRate).toFixed(2);
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

  pristine.addValidator(passwordInputElement, (value) => (value == CORRECT_PASSWORD),
    'Неверный пароль', 1, true);

  exchangeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formIsValid = pristine.validate();
    if (formIsValid) {
      disableSubmitButton();
      sendData(
        () => {
          enableSubmitButton();
          resetFormData();
          showSuccessMessage();
        },
        () => {
          enableSubmitButton();
          showErrorMessage();
        },
        formData
      );
    }
  });
};

// const INITIAL_PRICE_AMOUNT = '1000';

// const ALLOWED_CAPACITIES_PER_ROOM_NUMBER = {
//   '1': ['1'],
//   '2': ['1', '2'],
//   '3': ['1', '2', '3'],
//   '100': ['0']
// };

// const resetFormData = () => {
//   adForm.reset();
//   resetMainMarkerPosition();
//   closeLeafletPopup();
//   resetFilters();
// };


// const validateForm = () => {
//   const pristine = new Pristine(adForm, PRISTINE_CONFIG, true);

//   pristine.addValidator(roomNumberFormElement, (value) => ALLOWED_CAPACITIES_PER_ROOM_NUMBER[value].includes(capacityElement.value),
//     'Такое количество комнат не подойдет', 1, true);

//   pristine.addValidator(capacityElement, (value) => ALLOWED_CAPACITIES_PER_ROOM_NUMBER[roomNumberFormElement.value].includes(value),
//     'Столько гостей нельзя', 2, true);

//   pristine.addValidator(accommodationTypeElement, (value) => {
//     priceElement.min = MIN_ACCOMMODATION_PRICES[value];
//     priceElement.placeholder = priceElement.min;
//     if (priceElement.value >= priceElement.min) {
//       return true;
//     }
//     return false;
//   }, 'Не подходящий тип жилья для такой цены', 2, false);

//   pristine.addValidator(priceElement, (value) => {
//     if (value >= priceElement.min) {
//       return true;
//     }
//     return false;
//   }, 'Такая цена не подойдет', 2, true);

  // adForm.addEventListener('submit', (evt) => {
  //   evt.preventDefault();
  //   const formData = new FormData(evt.target);
  //   const formIsValid = pristine.validate();
  //   if (formIsValid) {
  //     disableSubmitButton();
  //     sendData(
  //       () => {enableSubmitButton(); resetFormData(); showSuccessMessage();},
  //       () => {enableSubmitButton(); showErrorMessage();},
  //       formData
  //     );
  //   }
  // });
// };

// const makePageInactive = () => {
//   adForm.classList.add('ad-form--disabled');
//   adFormFieldsetElements.forEach((element) => {
//     element.disabled = true;
//   });
// };

// const makePageActive = () => {
//   adForm.classList.remove('ad-form--disabled');
//   adFormFieldsetElements.forEach((element) => {
//     element.disabled = false;
//   });
// };

// export { makePageInactive, makePageActive, validateForm, syncCheckinCheckoutTimes, resetFormData };

export { buyFormHandler }
