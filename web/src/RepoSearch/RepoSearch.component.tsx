import React, { Dispatch, RefObject, SetStateAction } from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import './RepoSearch.css'
import { FilterState, SortType } from "../app.types";

interface Props {
  filterState: FilterState
  repoListLoading: boolean;
  userInput: string | undefined;
  sortBy: string | undefined;
  sortOrder: SortType
  setFilterState: Dispatch<SetStateAction<FilterState>>
  setUserInput: Dispatch<SetStateAction<string | undefined>>
  setSortBy: Dispatch<SetStateAction<"stars" | "updated" | undefined>>
  setSortOrder: Dispatch<SetStateAction<SortType>>
  setRepoSerch: Dispatch<SetStateAction<string | undefined>>;
}

type SemanticUIInputRefType = string | ((instance: Input | null) => void) | RefObject<Input> | null | undefined

export const RepoSearch: React.FC<Props> = ({
  setRepoSerch,
  repoListLoading,
  userInput,
  sortBy,
  sortOrder,
  setUserInput,
  setFilterState,
  filterState
}): JSX.Element => {

  const history = useHistory()
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="repo-search">
      <Input
        loading={repoListLoading}
        icon="github"
        type="text"
        iconPosition="left"
        labelPosition="right"
        name="repo-search-input"
        id="repo-search-input"
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
        placeholder={"enter a search term "}
        ref={inputRef as unknown as SemanticUIInputRefType}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && userInput) {
            setFilterState({
              ...filterState,
              languages: undefined
            });

            history.push(`/${userInput}?sort=${sortBy}&order=${sortOrder}`, {
              userInput,
              sortBy,
              sortOrder
            });

            setRepoSerch(userInput);
          }
        }}
        label={
          <Button.Group>
            <Button
              icon
              disabled={!userInput}
              className="submit-repo-search"
              onClick={(e) => {
                setFilterState({
                  ...filterState,
                  languages: undefined
                })
                history.push(`/${userInput}?sort=${sortBy}&order=${sortOrder}`, {
                  userInput,
                  sortBy,
                  sortOrder
                })
                setRepoSerch(userInput)
              }}
            >
              <Icon name='search' />
            </Button>
            <Button
              icon
              disabled={!userInput}
              className="clear-repo-search"
              onClick={(e) => {
                setUserInput(undefined)
                history.push('/', {
                  userInput,
                  sortBy,
                  sortOrder
                })
                if (null !== inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              <Icon name='x' />
            </Button>
          </Button.Group>
        }
      />
    </div>
  );
};
