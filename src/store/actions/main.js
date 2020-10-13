import sendsey from '../../sendsay/sendsay';
import {setID} from '../../utils/utils';
import {
  SEND_START,
  SEND_SUCCESS,
  SEND_ERROR,
  SET_CURRENT_RESPONSE,
  TOGGLE_POPUP,
  CLEAR_HISTORY,
  UPDATE_RESPONSE_DATA
} from './actionTypes';

function setResponseData(responseData, action, isOk, response) {
  const ind = responseData.findIndex(res => res.action === action);
  if (ind !== -1) {
    const elem = responseData[ind];
    responseData.splice(ind, 1);
    const newArr = [elem, ...responseData];
    return newArr;
  } else {
    const newResponse = {
      id: setID(),
      isOk,
      action,
      response,
    };
    responseData.unshift(newResponse);
    return responseData;
  }
}

export function sendNewRequest(requestValue) {
  return async (dispatch, getState) => {
    dispatch(sendStart());
    const state = getState();
    const responseData = state.main.responseData;
    // const session = sendsey.session;
    // let action
    // if (id) {
    //   requestValue = responseData
    // }
    // const action = requestValue.action;
    // let isOk;
    // let res = await req(requestValue, responseData)
    const response = await sendRequest(requestValue, responseData);
    dispatch(sendSuccess(response.newResponseData));
    dispatch(setCurrentResponse(response.currentResponse));

    // const request = {...requestValue, session};
    // sendsey
    //   .request(request)
    //   .then(res => {
    //     // console.log(res);
    //     isOk = true;
    //     const newResponseData = setResponseData(responseData, action, isOk, res);
    //     localStorage.setItem('response-data', JSON.stringify(newResponseData));
    //     dispatch(sendSuccess(newResponseData));
    //     dispatch(setCurrentResponse(res));
    //   })
    //   .catch(e => {
    //     isOk = false;
    //     const newResponseData = setResponseData(responseData, action, isOk, e);
    //     localStorage.setItem('response-data', JSON.stringify(newResponseData));
    //     dispatch(sendError(newResponseData));
    //     dispatch(setCurrentResponse(e));
    //     console.log(e);
    //   });
  };
}

async function sendRequest(requestValue, responseData) {
  const session = sendsey.session;
  const action = requestValue.action;
  const request = {...requestValue, session};
  let isOk;
  let obj = {};

  await sendsey
    .request(request)
    .then(response => {
      isOk = true;
      const newResponseData = setResponseData(responseData, action, isOk, response);
      localStorage.setItem('response-data', JSON.stringify(newResponseData));
      // dispatch(sendSuccess(newResponseData));
      // dispatch(setCurrentResponse(response));
      obj = {
        newResponseData,
        currentResponse: response,
      };
      // return obj
      // return ;
    })
    .catch(error => {
      isOk = false;
      const newResponseData = setResponseData(responseData, action, isOk, error);
      localStorage.setItem('response-data', JSON.stringify(newResponseData));
      // dispatch(sendError(newResponseData));
      // dispatch(setCurrentResponse(response));
      console.error(error);
      obj = {
        newResponseData,
        currentResponse: error,
      };
    });

  return obj;
}

export function changeCurrentResponse(id) {
   return (dispatch, getState) => {
    const state = getState();
    const responseData = state.main.responseData;
    // const currentResponse = state.main.currentResponse;
    // console.log(currentResponse)
    const currentResponse = responseData.find(response => response.id === id)
    console.log(currentResponse)
    dispatch(setCurrentResponse(currentResponse))

   }
}

export function sendRequestFromHistory(id) {
  return async (dispatch, getState) => {
    const state = getState();
    const responseData = state.main.responseData;
    const requestValue = responseData.find(response => response.id === id);

    const response = await sendRequest(requestValue, responseData);
    dispatch(sendSuccess(response.newResponseData));
    dispatch(setCurrentResponse(response.currentResponse));
  };
}

export function togglePopup() {
  return dispatch => {
    dispatch({
      type: TOGGLE_POPUP,
    });
  };
}

export function deleteResponse(id) {
  return (dispatch, getState) => {
    const state = getState();
    const responseData = state.main.responseData;
    const newResponseData = responseData.filter(response => response.id !== id);
    localStorage.setItem('response-data', JSON.stringify(newResponseData));
    dispatch(updateResponseData(newResponseData));
  };
}

export function loadHistoryFromLocalStorage() {
  return dispatch => {
    let responseData = localStorage.getItem('response-data');
    if (responseData) {
      responseData = JSON.parse(responseData);
      dispatch(updateResponseData(responseData));
    }
  };
}

export function clearHistory() {
  return dispatch => {
    localStorage.removeItem('response-data');
    dispatch({type: CLEAR_HISTORY});
  };
}

function sendStart() {
  return {
    type: SEND_START,
  };
}

// function sendError(newResponseData) {
//   return {
//     type: SEND_ERROR,
//     newResponseData,
//   };
// }

function sendSuccess(newResponseData) {
  return {
    type: SEND_SUCCESS,
    newResponseData,
  };
}

function updateResponseData(newResponseData) {
  return {
    type: UPDATE_RESPONSE_DATA,
    newResponseData,
  };
}

function setCurrentResponse(currentResponse) {
  return {
    type: SET_CURRENT_RESPONSE,
    currentResponse,
  };
}


