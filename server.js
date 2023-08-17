const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
    },
});

io.on('connection', (socket) => {
    let myData = undefined;
    let myId = undefined;

    let interval = setInterval(() => {
        if (myId !== undefined) {
            socket.emit('newdata', {
                id: myId,
                data: myData,
            });
        }
    }, 5000);

    console.log('new client');

    socket.on('RESET', () => {
        console.log('resetting on ', myId);
        myData = undefined;
    });

    socket.on('SET_BBOX', (bbox) => {
        console.log('setting bbox on ', myId);
        myData = bbox;
    });

    socket.on('setid', (id) => {
        console.log('setting my id to ', id);
        myId = id;
    });

    socket.on('disconnect', () => {
        clearInterval(interval);
    });

    socket.send('Hello from server');
});

io.listen(4000);
