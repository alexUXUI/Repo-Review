export interface Repo {
  name: string;
  description: string;
  stars: number;
  language: string;
  score: number;
  url: string
  updated_unix: number;
  updated_date: string,
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export type SortType = false | "asc" | "desc" | undefined;

export type SortByType = "stars" | "updated" | undefined;

export interface SortState {
  star: SortType;
  updated: SortType;
  sortBy: "stars" | "updated" | undefined;
  sortOrder: false | "asc" | "desc" | undefined;
}

export interface Language {
  name: string;
  showInList: boolean;
}

export type Languages = { name: string; showInList: boolean }[] | undefined;

export interface FilterState {
  languages: Languages,
}

export interface RepoDetail {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  }
}
