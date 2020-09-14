import * as React from 'react'
import { useWorker } from "@koale/useworker";
import { FilterState, Language, Repo, SortState, SortType } from "../app.types";

type NumberSort = (
    sortType: SortType,
    key: keyof Repo
) => (a: Repo, b: Repo) => number;

export const applySortAndFilters = (list: Repo[], sortState: SortState, filterState: FilterState): Repo[] | undefined => {

    let newList = list;

    const { languages } = filterState;

    const activeLanguageFilters: string[] | undefined = languages
        ?.filter((language: Language) => language.showInList)
        .map((l: Language) => l.name)

    const numSort: NumberSort = (sortType, key) => {
        return (a, b) => {
            let desc = Number(b[key]) - Number(a[key]);
            let asc = Number(a[key]) - Number(b[key]);
            if (a[key] > b[key]) {
                return sortType === "desc" ? desc : asc;
            }
            if (a[key] < b[key]) {
                return sortType === "asc" ? asc : desc;
            }
            return 0;
        };
    };

    if (list && list.length && sortState.star) {
        newList = list.sort(numSort(sortState.star, "stars"))
    } else if (list && list.length && sortState.updated) {
        newList = list.sort(numSort(sortState.updated, "updated_unix"))
    }

    if (activeLanguageFilters && activeLanguageFilters.length) {
        const returnList = newList.filter((repo: Repo) => {
            console.log(repo)
            return activeLanguageFilters?.includes(repo.language)
        });
        return returnList
    }

    return newList
};

export const useSortAndFilter = (repos: Repo[] | undefined, sortState: SortState, filterState: FilterState): {
    sorted: Repo[] | undefined
    setSorted: React.Dispatch<React.SetStateAction<Repo[] | undefined>>,
    status: string,
    kill: Function
} => {

    const { languages } = filterState;
    const [sorted, setSorted] = React.useState<Repo[] | undefined>();
    const [sortWorker, { status, kill }] = useWorker(applySortAndFilters);

    const runSort = (repos: Repo[], sortState: SortState, filterState: FilterState, sortWorker: Function) => {
        return sortWorker(repos, sortState, filterState).then((data: Repo[]) => {
            setSorted(data)
        })
    };

    React.useEffect(() => {
        if (status !== "RUNNING" && repos && filterState.languages && filterState.languages.length) {
            runSort(repos, sortState, filterState, sortWorker)
        }
    }, [repos, sortState, filterState, languages]);

    return {
        sorted,
        setSorted,
        status,
        kill
    }
}