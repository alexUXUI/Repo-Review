import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Icon } from 'semantic-ui-react'
import { Repo, RepoDetail as RepoDeets } from '../app.types'
import { RepoDetail } from '../RepoDetails/RepoDetails.component'

interface DetailProps {
    searchParams: URLSearchParams,
    repoDetailLoading: boolean,
    repoDetailData: RepoDeets,
    isRepoDetailError: boolean,
    selectedRepo: Repo | undefined,
    repoDetailError: string,
    isRepoListError: boolean,
    setSelectedRepo: React.Dispatch<React.SetStateAction<Repo | undefined>>,
}

export const Detail: React.FC<DetailProps> = ({
    searchParams,
    repoDetailLoading,
    repoDetailData,
    isRepoDetailError,
    selectedRepo,
    setSelectedRepo,
    repoDetailError,
    isRepoListError,
}): JSX.Element => {
    return (
        <>
            {repoDetailLoading && (
                <div className="prompt">
                    <Icon name="github" size="massive" id="prompt--icon" />
                    <p>Loading...</p>
                </div>
            )}
            {isRepoListError && (
                <div className="prompt">
                    <Icon name="github" size="massive" id="prompt--icon" />
                    <p>Want to contribute to the project by fixing bugs like these? 🐛<br />You are more than welcome to contribute! <br /> insert githublink </p>
                </div>
            )}
            {!repoDetailLoading && !isRepoDetailError && !searchParams.get("sort") && !searchParams.get("owner") ? (
                <div className="prompt">{searchParams.get("sort")}
                    <Icon name="github" size="massive" id="prompt--icon" />
                    <p>Once you have some repo results, <br /> select a repo, and the readm.md file will display here. ✨</p>
                </div>
            ) : null}
            {searchParams.get("sort") && !searchParams.get("owner") ? (
                <div className="prompt">
                    <Icon name="github" size="massive" id="prompt--icon" />
                    <p>Select a repo, and the readm.md will display here. ✨</p>
                </div>
            ) : null}
            {!isRepoListError && !isRepoDetailError && !repoDetailLoading && repoDetailData === undefined && searchParams.get("owner") && (
                <div className="prompt">
                    <p style={{ fontSize: '100px' }}>
                        🐥📝
                    </p>
                    No read me. Write docs, peeps!
                </div>
            )
            }
            <Switch>
                <Route
                    path="/:search/:repo"
                    children={
                        <RepoDetail
                            selectedRepo={selectedRepo}
                            setSelectedRepo={setSelectedRepo}
                            repoDetailLoading={repoDetailLoading}
                            repoDetailError={repoDetailError}
                            repoDetailData={repoDetailData}
                        />
                    }
                />
            </Switch>
        </>
    )
}