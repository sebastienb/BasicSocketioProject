var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    colors = require('colors');

server.listen(3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});


var connectCounter = "0"


io.sockets.on('connection', function(socket){
    connectCounter++;
    console.log('New device connected'.green);
    console.log("Connections: "+connectCounter);

    io.emit("status", "Hi from the server");

    socket.on('status', function(data){
                console.log(data);
    });

});