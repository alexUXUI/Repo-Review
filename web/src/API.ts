
export const API_URL_LOCAL = `http://localhost:3000`

export const searchApi = {
    index: `search`,
    github: {
        index: `github`,
        repos: `search/github/repos`
    }
}

const URL_BASE = process.env.REACT_APP_APPLICATION_ENV === 'dev' 
    ? API_URL_LOCAL
    : process.env.REACT_APP_HEROKU

export const getRepos = (repoQuery: string, sortBy: string, order: string) => {
    return fetch(`${URL_BASE}/${searchApi.github.repos}/${repoQuery}?sort=${sortBy}&order=${order}`)
        .then((response) => response.json())
}

export const getRepoDetails = (owner: string, repo: string) => {
    return fetch(`${URL_BASE}/${searchApi.github.repos}/${owner}/${repo}`)
      .then((response) => response.json())
}