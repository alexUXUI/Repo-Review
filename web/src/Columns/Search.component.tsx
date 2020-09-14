import * as React from 'react';
import { Button, Header, Popup } from 'semantic-ui-react';
import { FilterState, Repo, SortState, SortType } from '../app.types';
import { RepoFilter } from '../RepoFilter/RepoFilter.component';
import { RepoSearch } from '../RepoSearch/RepoSearch.component';
import { RepoSort } from '../RepoSort/RepoSort.component';

interface SearchProps {
    setRepoSerch: React.Dispatch<React.SetStateAction<string | undefined>>
    setUserInput: React.Dispatch<React.SetStateAction<string | undefined>>
    repoListLoading: boolean
    userInput: string | undefined
    sortBy: string | undefined
    sortOrder: SortType | undefined
    setSortBy: React.Dispatch<React.SetStateAction<"stars" | "updated" | undefined>>
    setSortOrder: React.Dispatch<React.SetStateAction<SortType | undefined>>
    setFilterState: React.Dispatch<React.SetStateAction<FilterState>>
    sortState: SortState
    setSortState: React.Dispatch<React.SetStateAction<SortState>>
    repoListData: Repo[] | undefined
    filterState: FilterState
    sorted: Repo[] | undefined
}

export const Search: React.FC<SearchProps> = ({
    setRepoSerch,
    setUserInput,
    repoListLoading,
    userInput,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    setFilterState,
    sortState,
    setSortState,
    repoListData,
    filterState,
    sorted,
}) => {
    return (
        <>
            <div className="header-group">
                <Header as="h3" icon="github" content="Repo Review" />
                <Popup
                    content={
                        <div className="instructions">
                            <h4>Welcome to the Repo Review</h4>
                            <h5>The place where you can find the README.md files of github repos with ease.</h5>
                            <hr />
                            <p>1) Search for repos containing whatever term you'd like, using the input below.</p>
                            <p>2) Use sorting and filtering to help you narrow down the results.</p>
                            <p>3) Click on a repo name in the list to see the repo README in the right column</p>
                        </div>
                    }
                    trigger={<Button className="info-circle" icon='info circle' size="medium" />}
                    basic={true}
                />
            </div>
            <RepoSearch
                setRepoSerch={setRepoSerch}
                setUserInput={setUserInput}
                repoListLoading={repoListLoading}
                userInput={userInput}
                sortBy={sortBy}
                sortOrder={sortOrder}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}
                setFilterState={setFilterState}
                filterState={filterState}
            />
            <RepoSort
                sortState={sortState}
                setSortState={setSortState}
            />
            <RepoFilter
                repos={repoListData}
                setFilterState={setFilterState}
                filterState={filterState}
                sorted={sorted}
                repoListLoading={repoListLoading}
            />
        </>
    )
}