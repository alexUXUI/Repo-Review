import express, { Application } from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { ExpressRedisCache } from 'express-redis-cache';
import cors from 'cors';

import { indexRouter } from './routes';
import { searchRouter } from './routes/search'

export const githubProxy: Application = express();

export const init = (requestCache?: ExpressRedisCache): Application => {
    return githubProxy
        .use(express.urlencoded({ extended: false }))
        .use(bodyParser.json())
        .use(cors())
        .use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", process.env.APP_ENV === 'dev' ? "http://localhost:3001" : "https://repo-review.herokuapp.com"); 
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          })
        .use(logger(':method :url :status - :response-time ms'))
        .set('requestCache', requestCache ? requestCache : undefined)
        .use('/', indexRouter)
        .use('/search', searchRouter);
};
