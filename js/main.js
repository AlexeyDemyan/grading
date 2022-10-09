import { getUserData, getContragentData} from './api.js';
import { renderMainUserData, hideUserData } from './user-data.js';
import { chooseToSellHandler, chooseToBuyHandler, showMapHandler, showListHandler } from './main-menu.js';
import { renderUsers } from './render-users.js';
import { filterUsers, filterUsersHandler } from './filter-users.js';
import { showServerErrorMessage } from './errors.js';
import { modalsCloseButtonHandler } from './modal.js';
import { populateMainUserPaymentMethods } from './sell-form.js';
import { removePasswordErrorMessageHandler } from './errors.js';

const DEFAULT_FILTER_SETTINGS = {
  status: 'seller',
  onlyCheckedUsers: false,
};

showListHandler();
chooseToSellHandler();
chooseToBuyHandler();
modalsCloseButtonHandler();
removePasswordErrorMessageHandler();

getUserData(
  (data) => {
    renderMainUserData(data);
    populateMainUserPaymentMethods(data);
  },
  () => {hideUserData();}
);

getContragentData(
  (data) => {
    const filteredUsers = filterUsers(data, DEFAULT_FILTER_SETTINGS);
    renderUsers(filteredUsers);
    filterUsersHandler(data, renderUsers);
    showMapHandler(filteredUsers);
  },
  () => {showServerErrorMessage();}
);
