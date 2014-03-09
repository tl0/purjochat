var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.directory(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/socket.io', express.static(__dirname + "/node_modules/socket.io/lib"));

var users = {};
var userIDs = {};

io.sockets.on('connection', function(socket) {
  socket.userID = Math.floor((Math.random()*1000000)+1);
  users[socket.userID] = socket;
  userIDs[socket.userID] = socket.userID;
  
  socket.emit('meta', { yourID: socket.userID, others: userIDs });
  
  socket.broadcast.emit('join', { user: socket.userID });

  socket.on('send', function(data) {
    users[data.receiver].emit('message', { user: data.user, receiver: data.receiver, message: data.message });
  });
  
  socket.on('quit', function(data) {
    socket.broadcast.emit('quit', { user: data.user });
    delete users[data.user];
    delete userIDs[data.user];
  });
  
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
