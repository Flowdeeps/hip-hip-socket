var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/client/', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

app.get('/p5.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/p5/lib/p5.js');
});

io.on('connection', (socket) => {
  socket.on('server', (message) => {
    console.log('server says', message);
    socket.broadcast.emit('server', message);
  });
  socket.on('client', (message) => {
    console.log('client says', message);
    socket.broadcast.emit('client', message);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});