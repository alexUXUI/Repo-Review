import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Icon } from 'semantic-ui-react'
import { Repo } from '../app.types'
import { RepoList } from '../RepoList/RepoList.component'
import { RepoListSkeleton } from '../RepoList/RepoList.skeleton'

interface Props {
    repoListLoading: boolean
    isRepoListError: boolean
    repoListData: Repo[] | undefined
    repoListError: string
    repoSearch: string | undefined
    setSelectedRepo: React.Dispatch<React.SetStateAction<Repo | undefined>>
    sorted: Repo[] | undefined
    historyObj: { pathname: string } | undefined
}

export const List: React.FC<Props> = ({
    repoListLoading,
    isRepoListError,
    repoListData,
    repoListError,
    repoSearch,
    setSelectedRepo,
    sorted,
    historyObj
}) => {
    return (
        <>
            {!isRepoListError && repoListLoading && (
                <RepoListSkeleton numRows={10} />
            )}
            {!historyObj || historyObj.pathname === "/" || !repoListData ? (
                <div className="prompt">
                    <Icon name="github" size="massive" id="prompt--icon" />
                    <p>Search for some repos. 👀</p>
                </div>
            ) : null}
            {isRepoListError && (
                <div className="prompt">
                    <Icon name="github" size="massive" id="prompt--icon" />
                    <p>
                        {
                            isRepoListError
                                ? <div><p>Bummer, couldn't search for repos. 😢</p><p>This is most likely due to github rate limiting requests from Repo Review.</p><p> Please try again soon.</p></div>
                                : null
                        }
                    </p>
                </div>
            )}
            <Switch>
                <Route
                    path="/:search"
                    children={
                        <RepoList
                            repoSearch={repoSearch}
                            setSelectedRepo={setSelectedRepo}
                            repoListLoading={repoListLoading}
                            repoListError={repoListError}
                            sorted={sorted}
                            isRepoListError={isRepoListError}
                        />
                    }
                />
            </Switch>
        </>
    )
}

