import { handleActions } from "redux-actions";

export const INITIAL_STATE = {
  loading: {
    user: false,
    repos: false,
  },
  error: {
    user: undefined,
    repos: undefined,
  },
  success: {
    user: undefined,
    repos: undefined,
  },
};

const reducer = handleActions(
  {
    USERS: {
      GET_USER: (state) => ({
        ...state,
        loading: { ...state.loading, user: true },
        error: { ...state.error, user: undefined },
      }),
      GET_USER_RESPONSE: {
        next(state, { payload: { user } }) {
          return {
            ...state,
            loading: { ...state.loading, user: false },
            success: { ...state.success, user: user },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, user: message },
            success: { ...state.success, user: undefined },
            loading: { ...state.loading, user: false },
          };
        },
      },

      GET_REPOS: (state) => ({
        ...state,
        loading: { ...state.loading, repos: true },
        error: { ...state.error, repos: undefined },
      }),
      GET_REPOS_RESPONSE: {
        next(state, { payload: { repos } }) {
          return {
            ...state,
            loading: { ...state.loading, repos: false },
            success: { ...state.success, repos: repos },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, repos: message },
            success: { ...state.success, repos: undefined },
            loading: { ...state.loading, repos: false },
          };
        },
      },
    },
  },
  INITIAL_STATE
);

export default reducer;
