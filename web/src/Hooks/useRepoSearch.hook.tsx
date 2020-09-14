import { useQuery } from 'react-query';
import { getRepos } from '../API';
import { Repo, SortByType, SortType } from '../app.types';

interface UseRepoSearch {
  repoListLoading: boolean,
  isRepoListError: boolean,
  repoListData: Repo[] | undefined,
  repoListError: any,
}

export const useRepoSearch = (repoSearch: string, sortBy: SortByType, sortOrder: SortType): UseRepoSearch => {
  const {
    isLoading: repoListLoading,
    isError: isRepoListError,
    data: repoListData,
    error: repoListError,
  } = useQuery(repoSearch && [repoSearch, sortBy, sortOrder], getRepos);

  return {
    repoListLoading,
    isRepoListError,
    repoListData: repoListData && repoListData.data && repoListData.data.repos ? repoListData.data.repos : undefined,
    repoListError,
  }
}