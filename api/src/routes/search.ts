import { Router } from 'express';
import {
    searchGithubRepos,
    getRepoContents,
    searchGithubRepoPrompt,
} from '../handlers/search';
import cache, { RouteOptions } from 'express-redis-cache';

export const cacheDefaults: RouteOptions = {
    expire: {
        200: 5000,
        500: 10,
        xxx: 1,
    },
};

const redisUrl = process.env.APP_ENV === "dev"
    ? process.env.DEV_REDIS_URL
    : process.env.REDIS_URL;

const client = { client: require('redis').createClient({ url: redisUrl }) }

export const searchRouter: Router = Router();

searchRouter.get(
    '/github/repos/',
    cache(client).route(cacheDefaults),
    searchGithubRepoPrompt,
);
searchRouter.get(
    '/github/repos/:query',
    cache(client).route(cacheDefaults),
    searchGithubRepos,
);
searchRouter.get(
    '/github/repos/:query/:repo',
    cache(client).route(cacheDefaults),
    getRepoContents,
);
