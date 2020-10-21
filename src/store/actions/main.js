import sendsey from '../../sendsay/sendsay';
import { formatJson } from '../../utils/jsonUtils';
import { setID } from '../../utils/utils';
import {
	SEND_START,
	SEND_SUCCESS,
	SET_CURRENT_RESPONSE,
	CLEAR_HISTORY,
	UPDATE_RESPONSE_DATA,
} from './actionTypes';

function setResponseData(responseData, requestValue, isOk, response) {
	const action = requestValue.action;
	const ind = responseData.findIndex(res => res.action === action);
	if (ind !== -1) {
		const elem = responseData[ind];
		responseData.splice(ind, 1);
		const newResponseData = [elem, ...responseData];
		return newResponseData;
	} else {
		const newResponse = {
			id: setID(),
			isOk,
			action,
			response,
			requestValue,
			isOpenDropdown: false,
		};
		responseData.unshift(newResponse);
		if (responseData.length > 15) {
			responseData.pop();
		}
		return responseData;
	}
}

export function sendNewRequest(requestValue) {
	return async (dispatch, getState) => {
		dispatch(sendStart());
		const state = getState();
		const responseData = state.main.responseData;

		const response = await sendRequest(requestValue, responseData);
		dispatch(sendSuccess(response.newResponseData));
		dispatch(setCurrentResponse(response.currentResponse));
	};
}

async function sendRequest(requestValue, responseData) {
	const session = sendsey.session;
	const request = { ...requestValue, session };
	let isOk;
	let obj = {};

	await sendsey
		.request(request)
		.then(response => {
			isOk = true;
			const newResponseData = setResponseData(
				responseData,
				requestValue,
				isOk,
				response
			);
			localStorage.setItem('response-data', JSON.stringify(newResponseData));
			obj = {
				newResponseData,
				currentResponse: {
					response,
					isOk,
				},
			};
		})
		.catch(response => {
			isOk = false;
			const newResponseData = setResponseData(
				responseData,
				requestValue,
				isOk,
				response
			);
			localStorage.setItem('response-data', JSON.stringify(newResponseData));
			console.error(response);
			obj = {
				newResponseData,
				currentResponse: {
					response,
					isOk,
				},
			};
		});

	return obj;
}

export function sendRequestFromHistory(id) {
	return async (dispatch, getState) => {
		dispatch(sendStart());
		const state = getState();
		const responseData = state.main.responseData;
		const requestValue = responseData.find(response => response.id === id);

		const response = await sendRequest(requestValue, responseData);
		dispatch(sendSuccess(response.newResponseData));
		dispatch(setCurrentResponse(response.currentResponse));
	};
}

export function togglePopup(popupValue, id) {
	return (dispatch, getState) => {
		const state = getState();
		const responseData = state.main.responseData;
		const newResponseData = responseData.map(res => {
			if (res.id === id) {
				res.isOpenDropdown = popupValue;
			} else {
				res.isOpenDropdown = false;
			}
			return res;
		});
		dispatch(updateResponseData(newResponseData));
	};
}

export function copyResponse(id) {
	return async (dispatch, getState) => {
		const state = getState();
		const responseData = state.main.responseData;
		const requestValue = responseData.find(response => response.id === id);
		const copiedData = formatJson(requestValue);

		navigator.clipboard.writeText(copiedData);
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
		dispatch({ type: CLEAR_HISTORY });
	};
}

function sendStart() {
	return {
		type: SEND_START,
	};
}

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
