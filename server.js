var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9090);

app.get('/pc', function (req, res) {
  res.sendfile(__dirname + '/pc.html');
});
app.get('/mobile', function (req, res) {
  res.sendfile(__dirname + '/mobile.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('submit from mobile', function (data) {
    console.log(data);

    socket.send('done');
    
    socket.broadcast.emit('mobile done');
  });
});