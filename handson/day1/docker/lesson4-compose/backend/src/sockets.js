const chats = require('./controllers/chats');

const emitToRoom = async (io) => {
  try {
    io.to('room').emit('chats', await chats.getChats());
  } catch (err) {}
};

exports.init = (app, io) => {
  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('get chats', async (params, fn) => {
      socket.join('room');

      try {
        fn(await chats.getChats());
      } catch (err) {}
    });

    socket.on('create chat', async (params) => {
      const { chat } = await chats.createChat(params);

      socket.emit('chat created');

      await emitToRoom(io);
    });
  });
};
