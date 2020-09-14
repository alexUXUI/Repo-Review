import { SortType } from "../app.types";


export const sortStateToggler = (sortState: SortType): SortType => {
    return sortState === false
        ? "desc"
        : sortState === "desc"
            ? "asc"
            : sortState === "asc"
                ? false
                : false;
};

export const sortIconToggler = (sortState: SortType): string | boolean => {
    return sortState === false
        ? "sort"
        : sortState === "asc"
            ? "arrow up"
            : sortState === "desc"
                ? "arrow down"
                : false;
}