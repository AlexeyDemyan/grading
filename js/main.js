import { getUserData, getContragentData} from './api.js';
import { renderMainUserData, hideUserData } from './user-data.js';
import { chooseToSellHandler, chooseToBuyHandler, showMapHandler, showListHandler } from './main-menu.js';
import { renderUsers } from './render-users.js';
import { filterUsers, filterUsersHandler } from './filter-users.js';
import { showServerErrorMessage } from './errors.js';
import { modalsCloseButtonHandler } from './modal.js';

const DEFAULT_FILTER_SETTINGS = {
  status: 'seller',
  onlyCheckedUsers: false,
};

showListHandler();
chooseToSellHandler();
chooseToBuyHandler();
modalsCloseButtonHandler();

getUserData(
  (data) => {
    renderMainUserData(data);
    console.log(data)
  },
  () => {hideUserData();}
);

getContragentData(
  (data) => {
    console.log(data);
    const filteredUsers = filterUsers(data, DEFAULT_FILTER_SETTINGS);
    renderUsers(filteredUsers);
    filterUsersHandler(data, renderUsers);
    showMapHandler(filteredUsers);
  },
  () => {showServerErrorMessage();}
);
