const buyButton = document.querySelector('#button-buy');
const sellButton = document.querySelector('#button-sell');
const checkedUsersButton = document.querySelector('#checked-users');
const listOfUsers = document.querySelector('.users-list__table-body');

const filterByStatus = (users, status) => {
  return users.filter((user) => user.status === status);
};

const filterByCheckedUsers = (users, checked) => {
  if (checked === true) {
    return users.filter((user) => user.isVerified === true);
  }
  else {return users;}
};

const filterUsers = (users, settings) => {
  let result = filterByStatus(users, settings.status);
  result = filterByCheckedUsers(result, settings.onlyCheckedUsers);
  return result;
};

const filterUsersHandler = (users, action) => {
  let filteredUsers = [];
  const filterSettings = {
    status: 'seller',
    onlyCheckedUsers: false,
  };

  const applyFilter = () => {
    listOfUsers.textContent = '';
    filteredUsers = filterUsers(users, filterSettings);
    action(filteredUsers);
  };

  buyButton.addEventListener('click', () => {
    filterSettings.status = 'seller';
    applyFilter();
  });

  sellButton.addEventListener('click', () => {
    filterSettings.status = 'buyer';
    applyFilter();
  });

  checkedUsersButton.addEventListener('click', (evt) => {
    filterSettings.onlyCheckedUsers = evt.target.checked;
    applyFilter();
  });
};

export { filterUsers, filterUsersHandler };
