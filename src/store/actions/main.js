import sendsey from '../../sendsay/sendsay';
import {SEND_START, SEND_SUCCESS} from './actionTypes';

export function sendRequest(requestValue) {
  return async dispatch => {
    const session = sendsey.session;
    dispatch(sendStart());
    const request = {...requestValue, session};
    sendsey.request(request).then(res => {
      dispatch(sendSuccess(res));
    });
  };
}



function sendStart() {
  return {
    type: SEND_START,
  };
}

function sendSuccess(responseValue) {
  return {
    type: SEND_SUCCESS,
    responseValue,
  };
}
