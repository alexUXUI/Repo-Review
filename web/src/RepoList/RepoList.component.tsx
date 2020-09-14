import * as React from "react";
import { Repo } from "../app.types"
import { List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./RepoList.css";
import "./Github.css";

interface Props {
  setSelectedRepo: React.Dispatch<React.SetStateAction<Repo | undefined>>
  repoSearch: string | undefined,
  repoListLoading: boolean
  repoListError: string
  sorted: Repo[] | undefined,
  isRepoListError: boolean
}

export const RepoList: React.FC<Props> = ({
  repoSearch,
  setSelectedRepo,
  repoListLoading,
  repoListError,
  sorted,
  isRepoListError
}): JSX.Element => {
  const params = window.location.pathname.split('/')
  return (
    <div>
      {!repoListLoading && !params[1] && !isRepoListError ? (
        <div className="prompt">
          <Icon name="github" size="massive" id="prompt--icon" />
          <p>Search for some repos. 👀</p>
        </div>
      ) : null}
      {isRepoListError && (
        <div className="prompt">
          <Icon name="github" size="massive" id="prompt--icon" />
          <p>{JSON.stringify(repoListError)}</p>
        </div>
      )}
      {sorted && sorted.length ? (
        <div className="list--wrapper">
          <List divided relaxed className="repo__list">
            {
              sorted && sorted.map((repo: Repo, index: number) => {
                console.log(repo.owner)
                return (
                  <List.Item key={index}>
                    <List.Icon name="github" size="big" verticalAlign="middle" />
                    <List.Content>
                      <List.Header>
                        <Link
                          onClick={(e) => setSelectedRepo(repo)}
                          to={{
                            pathname: `/${repoSearch}/${repo.name}?owner=${repo.owner.login}&name=${repo.name}`,
                            state: repo,
                          }}
                          key={index}
                        >
                          {repo.name}
                        </Link>
                        <div className="list__icons">
                          <div className="list__icons__group">
                            <Icon name="circle" size="small" className={`${repo.language}`} />
                            {repo.language || "None Detected"}
                          </div>
                          <div className="list__icons__group">
                            <Icon name="star" size="small" />
                            {repo.stars}
                          </div>
                          <div className="list__icons__group">
                            <Icon name="clock" size="small" />
                            {toDate(repo.updated_unix)}
                          </div>
                        </div>
                      </List.Header>
                      <List.Description>{repo.description}</List.Description>
                    </List.Content>
                  </List.Item>
                )
              })
            }
          </List>
        </div>
      ) : <div className="prompt">
          <Icon name="github" size="massive" id="prompt--icon" />
          <p>Search for some repos. 👀</p>
        </div>}
    </div>
  );
};

const toDate = (unix: number) => new Date(unix * 1000).toLocaleString().substr(0, 9)