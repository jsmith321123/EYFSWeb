export var getReport = (store) => {
	var io = require("../node_modules/socket.io-client/dist/socket.io.js");
	var socket = io.connect(location.host);

	let report_name = store.getState().report_name;

	socket.emit("get_report", report_name);

	socket.on("get_report", (report) => {
		store.dispatch({type: "SET_REPORT", report: report});

		socket.disconnect();
	});
}