import { RequestHandler } from 'express';
import { Octokit } from '@octokit/rest';
import { GitRepos, GitRepo } from '../types/types';
import { ParsedUrlQuery } from 'querystring';

export const githubClient = new Octokit();

type QuerySort =
    | 'stars'
    | 'forks'
    | 'help-wanted-issues'
    | 'updated'
    | undefined;

type QueryOrder = "desc" | "asc" | undefined

export const searchGithubRepos: RequestHandler = async (req, res) => {
    const queryString = req.query  as { sort: QuerySort, order: QueryOrder } ;

    if (req.params.query && req.params.query != null) {
        try {
            const searchResponse: GitRepos = await githubClient.search.repos({
                q: req.params.query,
                per_page: 100,
                sort: queryString.sort,
                order: queryString.order,
            });
    
            const {
                data: { items, total_count },
            } = searchResponse;
    
            const data = {
                total_count,
                repos: items.map(
                    (item: typeof githubClient.repository): GitRepo => {
                        const {
                            name,
                            description,
                            language,
                            stargazers_count,
                            score,
                            url,
                            updated_at,
                            owner: { 
                                login, 
                                avatar_url, 
                                html_url 
                            },
                        } = item;
    
                        return {
                            name,
                            description,
                            stars: stargazers_count,
                            language,
                            score,
                            url,
                            // add a unic field so that we can use toLocaleString in the browser for dates / timezones etc
                            updated_unix: parseInt((new Date(updated_at).getTime() / 1000).toFixed(0)),
                            updated_date: updated_at,
                            owner: {
                                login, 
                                avatar_url, 
                                html_url 
                            },
                        };
                    },
                ),
            };
            return res.status(200).json({ data });
        } catch (e) {
            return res.status(500).json({
                message: `Could not fetch github repos`,
                error: e,
            });
        }
    } else {
        return res.status(500).json({
            message: `Please pass a query`,
        });
    }
};

export const searchGithubRepoPrompt: RequestHandler = async (_req, res) => {
    res.status(200).json({
        message: 'Enter a repo to search for',
    });
};

export const getRepoContents: RequestHandler = async (req, res) => {
    const { query, repo } = req.params;

    try {
        const readme = await githubClient.request(
            `GET /repos/${query}/${repo}/contents/README.md`,
            {
                headers: {
                    authorization: `token ${process.env.GITHUB_APP_TOKEN}`,
                },
                owner: 'octocat',
                repo: 'hello-world',
                path: 'path',
            },
        );
        if (readme) {
            return res.status(200).json({
                data: {
                    ...readme.data,
                    content: readme.data.content,
                },
            });
        } else {
            return res.status(500).json({
                message: `Could not fetch readme`,
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: `Could not fetch repo contents`,
            error: e,
        });
    }
};
