var http = require('http'),
  util = require('util'),
  mu = require('mu2');

var mongoose = require('mongoose');
var express = require('express'),
  path = require('path');

var io = require('socket.io').listen(8080, {
  log: false
});
var crypto = require('crypto');
var Schema = mongoose.Schema;
mongoose.connect('localhost', 'password');
mongoose.connection.on('error', console.error.bind(console, 'Mongo Connection error:'));
mongoose.connection.on('open', function() {
  console.error('Connected to Mongo');
});

var PasswordSchema = new Schema({
  hashed: {
    type: String,
    required: true,
    dropDups: true
  },
});
var Password = mongoose.model('Password', PasswordSchema);



/*

Password.count({}, function( err, count){
    console.log( "Number of passwords:", count );
})
*/

var app = express();

app.set('port', process.env.PORT || 3000);
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/app'));



io.sockets.on('connection', function(socket) {
  console.log("Connection...");


  socket.on('data', function(data) {
    console.log("Got: " + data);

    Password.findOne({
      'hashed': data
    }, function(err, result) {
      if (err) {} else {
        if (result) {
          socket.emit('result', {
            result: "1"
          });
        } else {
          socket.emit('result', {
            result: "0"
          });
        }
      }
    });

  });


  socket.on('disconnect', function() {});

});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});