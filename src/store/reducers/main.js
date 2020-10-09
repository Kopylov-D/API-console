import {SEND_START, SEND_SUCCESS, SET_WIDTH} from '../actions/actionTypes';

const initialState = {
  isLoding: false,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_START:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        responseValue: action.responseValue,
      };
    default:
      return state;
  }
};
