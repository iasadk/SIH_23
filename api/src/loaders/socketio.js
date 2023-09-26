const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter();
const { validateTokenSocketio } = require('../api/middlewares/auth');
module.exports = ({ server }) => {
    console.log("Socket:--------------",server)
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            // allowedHeaders: ["my-custom-header"],
            credentials: true,
        },
    });

    try {
        io.on('connection', async function (socket) {
            socket.on("disconnect", () => {
                console.log("Socket Disconnectecd!!")
            })
            console.log("Soket Io connected!!")

            socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
            });

            socket.on('connect_timeout', (timeout) => {
                console.error('Connection timeout:', timeout);
            });

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });
            socket.on("new-pickup", (data) => {
                console.log("socket data: ", data)
                socket.broadcast.emit('new-pickup-admin', data);
            })

        });


    } catch (err) {
        console.log(err)
    }
};