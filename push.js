var express = require('express');
var app = express();
var client = 1;
var messages = [];
var clients = [];

app.configure(function () {
    app.use(express.static(__dirname + '/views/'));
});

var server = app.listen(8080);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    //console.log("connection client " + socket.id);
    clients[socket.id] = client;
    var msg = "Client " + clients[socket.id] + " connected <br />";
    messages.push(msg);
    io.sockets.emit('connected', { client: clients[socket.id], messages : messages});
    client ++;

    socket.on('addMessage', function(data) {
        //console.log("addMessage");
        var msg = "Client " + clients[socket.id] + " : " + data.message +"<br />";
        //console.log("addMessage :" +msg);
        messages.push(msg);
        io.sockets.emit('newMessage', messages);
    });


    socket.on('disconnected', function(socket, data){
        //console.log("disconnected client " + clients[socket.id]);
        var msg = "Client " + clients[socket.id] + " disconnected <br />";
        messages.push(msg);
        io.sockets.emit('newMessage', messages);
    });

});
