const getUserData = (onSuccess, onFail) => {
  fetch('https://cryptostar.grading.pages.academy/user')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {onSuccess(data);})
    .catch((err) => {onFail(err);});
};

const getContragentData = (onSuccess, onFail) => {
  fetch('https://cryptostar.grading.pages.academy/contractors')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {onSuccess(data);})
    .catch((err) => {onFail(err);});
};

const sendData = (onSuccess, onFail, formData) => {
  fetch('https://cryptostar.grading.pages.academy/',
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {onSuccess();}
      else {onFail();}
    })
    .catch((err) => {onFail(err);});
};

export { getUserData, getContragentData, sendData };

