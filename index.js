//load config
var config = require("./data/config.json");

/*
	Start web server.
*/

const express = require("express");
const app = express();

const path = require("path");
var server = require("http").createServer(app);

app.use(express.static(__dirname));

app.get('/', function (req, res) {

	res.sendFile(__dirname + "/index.html");
})

server.listen(3000, function () {
	console.log("Example app listing on port 3000!");
})

/*
	Connect to db!
*/

var mysql = require("mysql");

//TODO! add this to config, shouldnt be in the code, idiot
var connection = mysql.createConnection({
	host: config.database_connection.host,
	user: config.database_connection.user,
	password: config.database_connection.password,
	database: config.database_connection.database
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connected to db!");
})


/*
	Wait for connections from client!
*/


var io = require("socket.io").listen(server);
var hash = require("./js/hash.js").hash;
var fs = require("fs");

io.on("connect", function(client) {
	var rws = "NULL";

	client.on("get_id", function(user_name) {
		var query = connection.query("SELECT user_id FROM users WHERE user_name='" + user_name + "';", function(err, rows) {
			if(!err) {
    			var row_uid = rows[0];
			} else {return}

			client.emit("get_id", row_uid.user_id);
		});
	});

	client.on("get_pw", function (user_id) {
		//get data from db
		var query = connection.query("SELECT hashed_password FROM users WHERE user_id=" + user_id + ";", function(err, rows) {
			if (!err) {
				row_hp = rows[0];
			}

			if (row_hp == undefined) {
				client.emit("get_pw", undefined);
			} else {
				client.emit("get_pw", row_hp.hashed_password);
			}
		});
	});

	//hash password
	client.on("hash", function (pass) {
		client.emit("hash", hash(pass));
	});

	//get all data about the user's child
	client.on("get_child_data", function (user_id) {
		//get the id of the user's child
		let row_cid;

		var query = connection.query("SELECT child_id FROM users WHERE user_id=" + user_id + ";", function(err, rows) {
			if (!err) {
				row_cid = rows[0];
			} else {
				row_cid = undefined;
			}
	
			if (row_cid == undefined) {return};
	
			try {
				let child_json = require(config.path + "/data/children.json");
				client.emit("get_child_data", child_json[row_cid.child_id]);
			} catch (Error) {
				console.log("Invalid data path specified! Check data/config.json;");
			}
		});
	});

	//generate list of all reports
	client.on("get_report_list", function (child_id) {
		//get full name of the child
		let child_json = require(config.path + "/data/children.json");
		let this_child = child_json[child_id];

		let forename = this_child.forename;
		let surname = this_child.surname;
		let child_name = surname + ", " + forename;

		//find all reports for the child
		let reports = [];

		fs.readdir(config.path + "/reports", function(err, files) {
			if (!err) {
				for (let i = 0; i < files.length; i++) {
					if (files[i].includes(child_name + " ") && files[i].includes(".rpt")) {
						reports.push(files[i]);
					}
				}
			}

			client.emit("get_report_list", reports);
		});
	});

	//get report with specified name
	client.on("get_report", function (report_name) {
		let report_file = fs.readFileSync(config.path + "/reports/" + report_name);
		let report = JSON.parse(report_file);

		client.emit("get_report", report);
	});

	client.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});
