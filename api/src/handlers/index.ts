import { RequestHandler } from 'express';

export const index: RequestHandler = (_req, res) => {
    return res.json({
        message: 'Welcome to github search API app',
    });
};
