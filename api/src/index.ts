import http, { Server } from 'http';
import { Application } from 'express';
import { config } from 'dotenv';
import { init } from './app';

config();

const serverPort = process.env.PORT;

const app: Application = init();

const server: Server = http.createServer(app);

server.listen(serverPort, (): void => {
    console.log(`Github search proxy listening on port: ${serverPort}`);
});
