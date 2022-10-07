import { getUserData, getContragentData} from './api.js';
import { renderMainUserData, hideUserData } from './user-data.js';
import { chooseToSellHandler, chooseToBuyHandler, showMapHandler, showListHandler } from './main-menu.js';
import { renderUsers } from './render-users.js';
import { filterUsers, filterUsersHandler } from './filter-users.js';
import { showErrorMessage } from './error.js';
import { createInteractiveMap } from './map.js';

// map requires timeout to load, hmmm

const DEFAULT_FILTER_SETTINGS = {
  status: 'seller',
  onlyCheckedUsers: false,
};

showMapHandler();
showListHandler();
chooseToSellHandler();
chooseToBuyHandler();

getUserData(
  (data) => {renderMainUserData(data)},
  () => {hideUserData();}
);

getContragentData(
  (data) => {
    console.log(data);
    const filteredUsers = filterUsers(data, DEFAULT_FILTER_SETTINGS);
    renderUsers(filteredUsers);
    filterUsersHandler(data, renderUsers);
    setTimeout(createInteractiveMap, 2000);
  },
  () => {showErrorMessage();}
);
