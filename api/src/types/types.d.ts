import { GetResponseTypeFromEndpointMethod } from '@octokit/types';
import { githubClient } from '../handlers/search';

export type GitRepos = GetResponseTypeFromEndpointMethod<
    typeof githubClient.repositories.list
>;

export interface GitRepo {
    name: string;
    description: string;
    stars: number;
    language: string;
    score: number;
    url: string
    updated_unix: number;
    updated_date: string,
    owner: {
        login: string
        avatar_url: string,
        html_url: string
    };
}
