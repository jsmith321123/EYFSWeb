/*
	Start web server.
*/

const express = require("express");
const app = express();

const path = require("path");


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

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1011josh',
	database: 'EYFSWeb'
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connected to db!");
})


/*
	Wait for connections from client!
*/

var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var hash = require("./js/hash.js").hash;

io.on("connect", function(client) {
	var rws = "NULL";

	client.on("get_pw", function (user) {
		console.log(user);

		//get data from db
		var query = connection.query("SELECT hashed_password FROM users WHERE user_name=\'" + user + "\';", function(err, rows) {
			if (!err) {
				row = rows[0];
			}

			if (row == undefined) {
				client.emit("get_pw", undefined);
			} else {
				console.log(row.hashed_password);

				client.emit("get_pw", row.hashed_password);
			}
		});
	});

	//hash password
	client.on("hash", function (pass) {
		client.emit("hash", hash(pass));
	});

	client.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});
