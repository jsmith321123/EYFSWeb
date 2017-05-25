import React from 'react';

var users = require("../../data/users.json")

export class TestComponent extends React.Component {
	createTable() {
		var elements = [<tr key="head"><th>Username </th><th>Hashed Password</th></tr>];

		for (let i = 0; i < users.length; i++) {
			console.log(i);
			elements.push(<tr key={i}><td>{users[i].user}</td><td>{users[i].hashed_password}</td></tr>);
		}

		console.log(elements);

		return(elements)
	}

	render() {
		return(<table><tbody>{this.createTable()}</tbody></table>)
	}
}