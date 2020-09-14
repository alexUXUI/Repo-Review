import * as React from 'react'
import { List } from "semantic-ui-react"
import { FilterState, Language } from '../app.types'

export const FilterLoadingSkeleton = ({ numRows }: { numRows: number }): JSX.Element => {
    return (
        <>
            {
                Array.from(Array(numRows).keys()).map((row: number, index: number) => {
                    return (
                        <List.Item key={index} className="loading-list-item">
                            <div className="loading-skeleton filter-language"></div>
                            <div className="loading-skeleton filter-toggle"></div>
                        </List.Item>
                    )
                })
            }
        </>
    )
}

export const updatedFilterState = (filterState: FilterState, selectedLanguage: Language) => {
    return filterState?.languages?.map(
        (l: Language) => {
            return l.name === selectedLanguage.name
                ? {
                    ...selectedLanguage,
                    showInList: !selectedLanguage.showInList,
                }
                : l;
        }
    );
}
