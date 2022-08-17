import { createActions } from "redux-actions";
// action user
const { users: usersActions } = createActions({
  USERS: {
    GET_USER: (user) => ({ user }),
    GET_USER_RESPONSE: (users) => users,

    GET_REPOS: (user) => ({ user }),
    GET_REPOS_RESPONSE: (users) => users,

    GET_REPO: (userRepo) => ({ userRepo }),
    GET_REPO_RESPONSE: (userRepos) => userRepos,
  },
});

export default usersActions;
