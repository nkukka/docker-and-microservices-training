const socket = require('socket.io');

const app = require('./src/app');
const sockets = require('./src/sockets');

const db = require('./src/database');

const port = process.env.PORT || 9000;

db.sync().then(() => {
  const http = app.listen(port);

  sockets.init(app, socket.listen(http));
});

console.log('App listening on port ' + port);
