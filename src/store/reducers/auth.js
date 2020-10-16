import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_RESTORE_SESSION,
  AUTH_START,
  AUTH_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  isLoading: false,
};

export const authreducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        authData: action.authData,
      };
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_RESTORE_SESSION:
      return {
        ...state,
        authData: {
          session: action.session,
        },
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        responseError: action.responseError,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isAuth: false,
        authData: {},
      };
    default:
      return state;
  }
};
