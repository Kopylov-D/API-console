import sendsey from '../../sendsay/sendsay';
import {
  SEND_START,
  SEND_SUCCESS,
  SEND_ERROR,
  INIT,
  SET_CURRENT_RESPONSE,
  TOGGLE_POPUP,
} from './actionTypes';

const r = [
  {isOk: 200, action: 'track.get', responseValue: '{response}'},
  {isOk: false, action: 'pong', responseValue: '{response}'},
  {isOk: 200, action: 'ping', responseValue: '{response}'},
];

function setResponseData(responseData, action, isOk, response) {
  const ind = responseData.findIndex(res => res.action === action);
  if (ind !== -1) {
    console.log(ind);
    const elem = responseData[ind];
    responseData.splice(ind, 1);
    const newArr = [elem, ...responseData];
    return newArr;
  } else {
    const newResponse = {
      isOk,
      action,
      response,
    };
    responseData.unshift(newResponse);
    return responseData;
  }
}

// console.log(setResponseData(r, 'pingi', true, 'sdsdsdsd'));

export function sendRequest(requestValue) {
  return async (dispatch, getState) => {
    const state = getState();
    const responseData = state.main.responseData;
    const session = sendsey.session;
    const action = requestValue.action;
    let isOk;
    dispatch(sendStart());
    const request = {...requestValue, session};
    sendsey
      .request(request)
      .then(res => {
        // console.log(res);
        isOk = true;
        const newResponseData = setResponseData(responseData, action, isOk, res);
        localStorage.setItem('response-data', JSON.stringify(newResponseData));
        dispatch(sendSuccess(newResponseData));
        dispatch(setCurrentResponse(res));
      })
      .catch(e => {
        isOk = false;
        const newResponseData = setResponseData(responseData, action, isOk, e);
        localStorage.setItem('response-data', JSON.stringify(newResponseData));
        dispatch(sendError(newResponseData));
        dispatch(setCurrentResponse(e));
        console.log(e);
      });
  };
}

export function togglePopup() {
  return dispatch => {
    dispatch({
      type: TOGGLE_POPUP,
    });
  };
}

export function loadHistoryFromLocalStorage() {
  return dispatch => {
    let responseData = localStorage.getItem('response-data');
    if (responseData) {
      responseData = JSON.parse(responseData);
      dispatch(init(responseData));
    }
    // if (responseData.length > 0) {
    //   dispatch(init(responseData));
    // }
  };
}

function sendStart() {
  return {
    type: SEND_START,
  };
}

function sendError(newResponseData) {
  return {
    type: SEND_ERROR,
    newResponseData,
  };
}
// function setHistoryInLocalStorage(newResponseData) {
//   return {
//     type: SET_HISTORY_IN_LOCALSTORAGE,
//     newResponseData,
//   };
// }

function sendSuccess(newResponseData) {
  return {
    type: SEND_SUCCESS,
    newResponseData,
  };
}
function setCurrentResponse(currentResponse) {
  return {
    type: SET_CURRENT_RESPONSE,
    currentResponse,
  };
}

function init(newResponseData) {
  return {
    type: INIT,
    newResponseData,
  };
}
