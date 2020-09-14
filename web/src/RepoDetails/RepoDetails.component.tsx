import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Repo, RepoDetail as RepoDeets } from '../app.types';
import emoji from 'node-emoji'

import "./RepoDetails.css";

interface Props {
    selectedRepo: Repo | undefined
    setSelectedRepo: React.Dispatch<React.SetStateAction<Repo | undefined>>
    repoDetailLoading: boolean
    repoDetailData: RepoDeets
    repoDetailError: string
}

export const RepoDetail: React.FC<Props> = ({
    repoDetailLoading,
    repoDetailError,
    repoDetailData,
}): JSX.Element => {
    return (
        <div className="repo-detail">
            {repoDetailLoading && <span>Loading...</span>}
            {repoDetailError && <span>error: {repoDetailError}</span>}
            {
                repoDetailData && repoDetailData.content
                    ? (
                        <ReactMarkdown
                            escapeHtml={false}
                            className="readme"
                            source={emoji.emojify(
                                decodeURIComponent(
                                    atob(repoDetailData.content)
                                        .split('')
                                        .map(
                                            (c) =>
                                                '%' +
                                                ('00' + c.charCodeAt(0).toString(16)).slice(-2),
                                        )
                                        .join(''),
                                ),
                            )}
                        />
                    )
                    : null
            }
        </div>
    )
}

