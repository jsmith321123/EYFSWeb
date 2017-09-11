import {login} from './Login.jsx';

export var handleCookies = (store) => {
	var cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		if (cookies[i].includes("user=")) {
			let user = cookies[i].split("=")[1]
			if (user.length != 0) {
				login(store, user);
			}
		}
	}
}