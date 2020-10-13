import {
  SEND_START,
  SEND_SUCCESS,
  SEND_ERROR,
  SET_CURRENT_RESPONSE,
  TOGGLE_POPUP,
  CLEAR_HISTORY,
  UPDATE_RESPONSE_DATA,
} from '../actions/actionTypes';

const initialState = {
  isLoding: false,
  isOpenPopup: false,
  responseData: [
    // {isOk: 200, action: 'track.get', responseValue: '{response}'},
    // {isOk: false, action: 'pong', responseValue: '{response}'},
    // {isOk: 200, action: 'ping', responseValue: '{response}'},
  ],
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
    case SEND_ERROR:
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
    case TOGGLE_POPUP:
      return {
        ...state,
        isOpenPopup: !state.isOpenPopup,
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
