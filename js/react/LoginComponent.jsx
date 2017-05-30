import React from 'react';

import {PlaceholderComponent} from './PlaceholderComponent.jsx';

export class LoginComponent extends React.Component {
	submit_pw (props) {
		//open socket to communicate with server
		var io = require("../../node_modules/socket.io-client/dist/socket.io.js");
		
		var socket = io.connect("http://192.168.1.141:3000");


		this.hash_password(props, socket);
	}

	hash_password(props, socket) {
		let pw = document.getElementById("password").value;

		socket.emit("hash", pw);

		socket.on("hash", (hashed) => {
			this.login(props, socket, hashed);			
		});
	}

	login(props, socket, hashed) {
		//get inputted username
		let user = document.getElementById("username").value;

		//submit username to server and handle data received
		socket.emit("get_pw", user);

		socket.on("get_pw", (data) => {
			if (data != undefined && parseInt(data) == hashed) {
				props.store.dispatch({type: "SET_USER", user: user});
				props.store.dispatch({type: "SET_PAGE", page_component: PlaceholderComponent});
			} else {
				document.getElementById("pw_error").innerHTML = "Wrong username or password.";
			}

			socket.disconnect();
		});
	}

	render() {

		return (
			<div>
				<p><input id="username" placeholder="username"></input></p>
				<p><input id="password" type="password" placeholder="password"></input></p>
				<p><button id="submit_pw" onClick={() => this.submit_pw(this.props)}>Submit</button></p>
				<p id="pw_error"></p>
			</div>
		);
	}
}
