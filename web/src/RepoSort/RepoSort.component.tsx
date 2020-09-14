import * as React from "react";
import { Button, Divider, Icon, Popup } from "semantic-ui-react";
import { SortState, SortType } from "../app.types";
import "./RepoSort.css";
import { sortIconToggler, sortStateToggler } from "./RepoSort.logic";

interface Props {
    sortState: SortState;
    setSortState: Function;
}

export const RepoSort: React.FC<Props> = ({
    sortState,
    setSortState,
}): JSX.Element => {
    return (
        <div className="repo-sort">
            <Divider />
            <div className="label">
                <span>
                    <span className="label-title">Sort:</span>
                    <Popup
                        content={
                            <div className="instructions">
                                <p>Sort by number of stars <Icon name="star" /> or last updated. <Icon name="clock" /></p>
                                <p>Sort orders are :</p>
                                <p>1) Ascending <Icon name="arrow up" /></p>
                                <p>2) Descending <Icon name="arrow down" /></p>
                                <p>3) None <Icon name="sort" /></p>
                                <p>(Sort options can be applied before the request.)</p>
                            </div>
                        }
                        trigger={
                            <Button className="info-circle"
                                icon='info circle'
                                size="medium"
                            />
                        }
                        basic={true}
                    />
                </span>
                <span className="filter-results">
                    {sortState.star && `Stars: ${sortState.star}`}
                    {sortState.updated && `updated: ${sortState.updated}`}
                </span>
            </div>
            <Button.Group basic>
                <Button
                    onClick={() => {
                        setSortState({
                            updated: false,
                            star: sortStateToggler(sortState.star),
                        });
                    }}
                    toggle={false}

                    icon='star'
                    content='Stars'
                    className="sort__label star-icon"
                />
                <Button
                    toggle={false}
                    onClick={() => {
                        setSortState({
                            updated: false,
                            star: sortStateToggler(sortState.star),
                        });
                    }}
                    icon={sortIconToggler(sortState.star)}
                />
                <Button
                    toggle={false}
                    onClick={() => {
                        setSortState({
                            ...sortState,
                            star: false,
                        });
                    }}
                    icon='x'
                />
            </Button.Group>
            <br />
            <Button.Group basic>
                <Button
                    onClick={() => {
                        setSortState({
                            star: false,
                            updated: sortStateToggler(sortState.updated),
                        });
                    }}
                    icon='clock'
                    content='updated'
                    className="sort__label"
                />
                <Button
                    onClick={() => {
                        setSortState({
                            star: false,
                            updated: sortStateToggler(sortState.updated),
                        });
                    }}
                    icon={sortIconToggler(sortState.updated)}
                />
                <Button
                    onClick={() => {
                        setSortState({
                            ...sortState,
                            updated: false,
                        });
                    }}
                    icon='x'
                />
            </Button.Group>
        </div>
    );
};
