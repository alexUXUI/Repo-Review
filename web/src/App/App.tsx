import React from "react";

import { useHistory } from "react-router-dom";
import { useRepoSearch } from "../Hooks/useRepoSearch.hook";
import { useRepoDetail } from "../Hooks/useRepoDetails.hook";
import { useSortAndFilter } from "../Hooks/useSortAndFilter.hook";
import { useRepoLanguages } from "../Hooks/useRepoLanguages.hook";

import { Search } from "../Columns/Search.component";
import { List } from "../Columns/List.component";
import { Detail } from "../Columns/Details.component";

import { FilterState, Repo, SortState } from "../app.types";

import "./App.css";

interface Props { }

const App: React.FC<Props> = () => {

  const history = useHistory();
  const [historyObj, setHistoryObj] = React.useState();
  var searchParams = new URLSearchParams(window.location.search);

  const [userInput, setUserInput] = React.useState<string | undefined>("");
  const [repoSearch, setRepoSerch] = React.useState<string | undefined>("");
  const [sortBy, setSortBy] = React.useState<typeof sortState.sortBy>("stars");
  const [sortOrder, setSortOrder] = React.useState<typeof sortState.sortOrder>(false);
  const [selectedRepo, setSelectedRepo] = React.useState<Repo | undefined>(undefined);

  const {
    repoListLoading,
    isRepoListError,
    repoListData,
    repoListError,
  } = useRepoSearch(repoSearch!, sortBy, sortOrder);

  const {
    repoDetailLoading,
    isRepoDetailError,
    repoDetailData,
    repoDetailError,
  } = useRepoDetail(selectedRepo)

  const [sortState, setSortState] = React.useState<SortState>({
    updated: false,
    star: false,
    sortBy: undefined,
    sortOrder: undefined
  });

  const { languages } = useRepoLanguages(repoListData);

  const [filterState, setFilterState] = React.useState<FilterState>({
    languages: languages,
  });

  React.useEffect(() => {
    setFilterState({
      ...filterState,
      languages
    })
  }, [languages])

  const { sorted, setSorted } = useSortAndFilter(repoListData, sortState, filterState);

  React.useLayoutEffect(() => {
    history.push('/')
  }, []);

  React.useEffect(() => {
    return history.listen((location: any) => {

      const repoListRoute: boolean = location.state && location.state.userInput;
      const repoDetailRoute: boolean = location.state && location.state.owner && location.state.name;

      if (location.pathname === "/") {
        setSorted(undefined)
      }

      if (location) {
        setHistoryObj(location)
      }

      if (repoListRoute) {
        setRepoSerch(location.state.userInput)
      }

      if (repoDetailRoute) {
        setSelectedRepo(location.state)
      }
    });
  }, [history]);

  return (
    <main className="App">
      <section className="column repo-search column--left">
        <Search
          setRepoSerch={setRepoSerch}
          setUserInput={setUserInput}
          repoListLoading={repoListLoading}
          userInput={userInput}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          setFilterState={setFilterState}
          sortState={sortState}
          setSortState={setSortState}
          repoListData={repoListData}
          filterState={filterState}
          sorted={sorted}
        />
      </section>
      <section className="column repo-list column--middle">
        <List
          repoListLoading={repoListLoading}
          isRepoListError={isRepoListError}
          repoListData={repoListData}
          repoListError={repoListError}
          repoSearch={repoSearch}
          setSelectedRepo={setSelectedRepo}
          sorted={sorted}
          historyObj={historyObj}
        />
      </section>
      <section className="column repo-detail">
        <Detail
          searchParams={searchParams}
          repoDetailLoading={repoDetailLoading}
          repoDetailData={repoDetailData}
          isRepoDetailError={isRepoDetailError}
          selectedRepo={selectedRepo}
          setSelectedRepo={setSelectedRepo}
          repoDetailError={repoDetailError}
          isRepoListError={isRepoListError}
        />
      </section>
    </main>
  );
}

export default App;
