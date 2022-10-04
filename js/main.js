import { getUserData, getContragentData} from './api.js';
import { renderUserData, hideUserData } from './user-data.js';

getUserData(
  (data) => {renderUserData(data)},
  () => {hideUserData();}
);

getContragentData(
  (data) => {console.log(data)},
  (error) => {console.log(error)}
);
