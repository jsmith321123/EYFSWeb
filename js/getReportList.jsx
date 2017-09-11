export var getReportList = (store) => {
	var io = require("../node_modules/socket.io-client/dist/socket.io.js");
	var socket = io.connect(location.host);

	socket.emit("get_child_data", store.getState()["user"]);

	let reports = [];

	socket.on("get_child_data", (child) => {
		socket.emit("get_report_list", child.id);

		socket.on("get_report_list", (list) => {
			for (let i = 0; i < list.length; i++) {
				reports.push(list[i]);
			}

			store.dispatch({type: "SET_REPORTS", reports: reports});
		});
	});
}