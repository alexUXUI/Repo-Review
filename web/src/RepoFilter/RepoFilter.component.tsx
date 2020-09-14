import * as React from "react";
import { Route, Switch } from "react-router";
import { List, Checkbox, Divider, Button, Icon, Popup } from "semantic-ui-react";
import * as _ from "lodash";

import { FilterLoadingSkeleton, updatedFilterState } from "./RepoFilter.logic";

import { FilterState, Language, Repo } from "../app.types";
import "./RepoFilter.css";
import "../App/App.css";

interface Props {
  repos: Repo[] | undefined;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  filterState: FilterState;
  sorted: Repo[] | undefined;
  repoListLoading: boolean
}

export const RepoFilter: React.FC<Props> = ({
  repos,
  setFilterState,
  filterState,
  sorted,
  repoListLoading,
}): JSX.Element => {

  const { languages } = filterState;

  return (
    <div className="repo-filter">
      <Divider />
      <div className="label">
        <span>
          <span className="label-title">Filter:</span>
          <Popup
            content={<div className="instructions"><p>Filter repo results by progamming language.</p></div>}
            trigger={<Button className="info-circle" icon='info circle' size="medium" />}
            basic={true}
          />
        </span>
        <span className="filter-results">
          {sorted?.length ? sorted?.length : '0'} of {repos && repos.length || '0 repos'}
        </span>
      </div>
      <List className={`language-list ${!filterState.languages && 'no-data'}`}>
        <Switch>
          <Route
            path="/:search"
            children={
              <>
                {repoListLoading
                  ? (
                    <FilterLoadingSkeleton numRows={10} />
                  ) : null
                }
                {languages && languages.length
                  ? languages.map((language: { name: string; showInList: boolean }, index: number) => {
                    return (
                      <List.Item key={index}>
                        {language.name || "None detected"}
                        <Checkbox
                          className={`language-filter`}
                          onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                            setFilterState({
                              ...filterState,
                              languages: updatedFilterState(filterState, language),
                            });
                          }}
                          toggle
                          checked={language.showInList}
                        />
                      </List.Item>
                    );
                  })
                  : null}
              </>
            }
          />
        </Switch>
        {
          !sorted && !repoListLoading ? (
            <div className="no-language-filters">
              <Icon name="sliders horizontal" size="huge" className="sliders" />
              <p>Programming language filters will appear here.</p>
            </div>
          ) : null
        }
      </List>
    </div>
  );
}
