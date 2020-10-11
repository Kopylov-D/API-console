import {SEND_START, SEND_SUCCESS, SEND_ERROR, INIT, SET_CURRENT_RESPONSE, TOGGLE_POPUP} from '../actions/actionTypes';

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
        // currentResponse: action.newResponseData[0].response,
      };
    case SEND_ERROR:
      return {
        ...state,
        isLoading: false,
        responseData: action.newResponseData,
        // currentResponse: action.newResponseData[0].response,
      };
    case SET_CURRENT_RESPONSE:
      return {
        ...state,
        // isLoading: false,
        // responseData: action.newResponseData,
        currentResponse: action.currentResponse
      };
    case INIT:
      return {
        ...state,
        // isLoading: false,
        responseData: action.newResponseData,
        // currentResponse: action.newResponseData[0].response,
      };
    case TOGGLE_POPUP:
      return {
        ...state,
        isOpenPopup: !state.isOpenPopup
      };
    default:
      return state;
  }
};
