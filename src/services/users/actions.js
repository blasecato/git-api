import { createActions } from "redux-actions";

const { users: usersActions } = createActions({
  USERS: {
    GET_USER: (user) => ({ user }),
    GET_USER_RESPONSE: (users) => users,

    GET_REPOS: (user) => ({ user }),
    GET_REPOS_RESPONSE: (users) => users,
  },
});

export default usersActions;
