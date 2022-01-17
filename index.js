const express = require('express');
const mysql = require('mysql');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
});

const PORT = process.env.PORT || 8080; // Edit port if needed
let count;
var users = [];

const db = mysql.createConnection({
    host     : 'localhost', // Enter host
    user     : 'root', // Enter user
    password : '1234', // Enter password
    database : 'test' // Enter database
});

db.connect((err) => { // Connect to database
    if(err) {
        throw err;
    }
    console.log('Mysql Connected...')
});

io.on('connection', (socket) => { // On connection
    let clientIp = socket.request.connection.remoteAddress;
    let clientHeader = socket.request.headers['user-agent'];

    users.push(clientIp); // Add user to array

    count = users.filter(function(item, pos) { return users.indexOf(item) == pos }).length; // The number of unique clients from the array
    console.clear();
    console.log('Total Clients: ' + count);

    io.emit('socketClientID', socket.client.id);
    socket.on('clientMessage', (url) => { // Get url from client
        let sql = "INSERT INTO `users` (`ID`, `IP`, `USER-AGENT`, `URL`) VALUES (NULL, '" + clientIp + "', '" + clientHeader + "', '" + url + "');"
        db.query(sql, (err, result) => { // Log the client ip, client header and visited url to database
            if(err) throw err;
        });
    });

    socket.on('disconnect', () => { // On disconnection
        users.splice(users.indexOf(clientIp), 1); // Remove user from array
        count = users.filter(function(item, pos) { return users.indexOf(item) == pos }).length; // Update the number of unique clients from the array
        console.clear();
        console.log('Total Clients: ' + count);
    });
});

http.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});