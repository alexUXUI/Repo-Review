import http from 'http';
import { config } from 'dotenv';
import { init } from '../src/app';

config();

const app = init();

export const testServer = http.createServer(app);

testServer.listen(process.env.DEV_TEST_PORT, () => {
    console.log(
        `Github search proxy listening on port: ${process.env.DEV_TEST_PORT}`,
    );
});
