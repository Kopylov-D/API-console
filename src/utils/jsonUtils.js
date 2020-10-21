export function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

export function formatJson(str, tabs = 4) {
	if (isJson(str)) {
		str = JSON.parse(str);
	}
	return JSON.stringify(str, null, tabs);
}
