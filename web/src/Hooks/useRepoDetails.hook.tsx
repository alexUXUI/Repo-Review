import { useQuery } from 'react-query';
import { getRepoDetails } from '../API';
import { Repo, RepoDetail } from '../app.types';

interface UseRepoDetail {
    repoDetailLoading: boolean;
    isRepoDetailError: boolean;
    repoDetailData: RepoDetail;
    repoDetailError: any;
}

export const useRepoDetail = (selectedRepo: Repo | undefined): UseRepoDetail => {
    const {
        isLoading: repoDetailLoading,
        isError: isRepoDetailError,
        data: repoDetailData,
        error: repoDetailError,
    } = useQuery(
        selectedRepo && [selectedRepo.owner.login, selectedRepo.name],
        getRepoDetails,
        {
            initialData: undefined
        }
    );

    return {
        repoDetailLoading,
        isRepoDetailError,
        repoDetailData: repoDetailData && repoDetailData.data ? repoDetailData.data : undefined,
        repoDetailError,
    }
}
