const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter();
const { validateTokenSocketio } = require('../api/middlewares/auth');
module.exports = ({ server }) => {
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
            socket.on("disconnect",()=>{
                console.log("Socket Disconnectecd!!")
            })

            socket.on("bulk-uploading",(data)=>{
                socket.broadcast.emit('progressUpdate', data);
            })
            
        });
    } catch (err) {
    }
};