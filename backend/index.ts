import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import { Logger } from './utils/Logger';

const app = express();
app.use(express.json());
app.use(cors());

const logger = new Logger();
logger.info('Server is starting...');

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

server.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})