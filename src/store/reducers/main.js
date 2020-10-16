import {
  SEND_START,
  SEND_SUCCESS,
  SET_CURRENT_RESPONSE,
  CLEAR_HISTORY,
  UPDATE_RESPONSE_DATA,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isOpenPopup: false,
  responseData: [],
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
        responseData: action.newResponseData,
      };
    case SET_CURRENT_RESPONSE:
      return {
        ...state,
        currentResponse: action.currentResponse,
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        responseData: [],
      };
    case UPDATE_RESPONSE_DATA:
      return {
        ...state,
        responseData: action.newResponseData,
      };
    default:
      return state;
  }
};
