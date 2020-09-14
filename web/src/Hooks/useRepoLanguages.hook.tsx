import * as React from 'react';
import { Languages, Repo } from '../app.types';
import _ from "lodash";

export const useRepoLanguages = (repos: Repo[] | undefined) => {
    const [languages, setLanguages] = React.useState<Languages>();
  
    React.useEffect(() => {
      if (repos) {
        const languages = _.uniqBy(repos, 'language')
          .reduce<Languages>((acc: Languages, repo: Repo): Languages => {
            return acc?.concat({
              name: repo.language,
              showInList: true,
            });
          }, []);
  
        setLanguages(languages);
      }
    }, [repos])
  
    return {
      languages,
      setLanguages
    }
  }