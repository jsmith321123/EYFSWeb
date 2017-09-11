import React from 'react';

import {login} from './../Login.jsx';

export class LoginComponent extends React.Component {
	submit_pw (props) {
		//open socket to communicate with server
		var io = require("../../node_modules/socket.io-client/dist/socket.io.js");
		
		var socket = io.connect(location.host);

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

		socket.emit("get_id", user)

		//get id corresponding to the user
		socket.on("get_id", (id) => {
			//submit username to server and handle data received
			socket.emit("get_pw", id);
	
			socket.on("get_pw", (data) => {
				if (data != undefined && parseInt(data) == hashed) {
					console.log(document);
					console.log(document.getElementById("remember"));
	
					if (document.getElementById("remember").checked) {
						document.cookie = "user=" + id;
					} else {
						//wipe cookie for user
						document.cookie = "user=";
					}
	
					login(props.store, id);

					socket.disconnect();
				} else {
					//tell the user that the login attempt failed
					document.getElementById("pw_error").innerHTML = "Wrong username or password.";
				}
			});
		});

		
	}

	render() {

		return (
			<div>
				<p><input id="username" placeholder="username"></input></p>
				<p><input id="password" type="password" placeholder="password"></input></p>
				<p><input id="remember" type="checkbox"></input>Remember me.</p>
				<p><button id="submit_pw" onClick={() => this.submit_pw(this.props)}>Submit</button></p>
				<p id="pw_error"></p>
			</div>
		);
	}
}
