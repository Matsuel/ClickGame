import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import { Logger } from './utils/Logger';
import { Database } from './objects/Database';

const app = express();
app.use(express.json());
app.use(cors());

let left = 0;
let right = 0;

const logger = new Logger('index.ts');
logger.info('Server is starting...');

Database.getInstance().connect();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || 'localhost';

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.join('game');
    socket.emit('sync', { left, right });
    socket.on('left', () => {
        left++;
        io.to('game').emit('left', { left });
    });
    socket.on('right', () => {
        right++;
        io.to('game').emit('right', { right });
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

server.listen(PORT, () => {
    logger.info(`Server is running on http://${HOST}:${PORT}`);
})