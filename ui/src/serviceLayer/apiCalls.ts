'use server';
import { getSessionValue, setSessionValue } from '@/utils/session-store';

export type tableList = {
  repo: string;
  url: string;
  title: string;
  requester: string;
  avatar_url: string;
  body: string;
  number: string;
};

//Add a single repo to the array
const addRepo = async (repoName: string): Promise<void> => {
  const sessionValue: any = await getSessionValue('repos');
  if (!sessionValue) {
    await setSessionValue('repos', { repoList: [repoName] });
  } else {
    sessionValue.repoList.push(repoName);
    await setSessionValue('repos', sessionValue);
  }
};

//Get all the repos from session store
const getAllRepos = async (): Promise<Array<string> | null> => {
  const sessionValue: any = await getSessionValue('repos');
  if (!sessionValue) {
    return null;
  } else {
    return sessionValue.repoList;
  }
};

//Delete all the repos
const clearAllRepos = async (): Promise<void> => {
  const sessionValue: any = await getSessionValue('repos');
  if (!sessionValue) {
    return;
  } else {
    await setSessionValue('repos', null);
    return;
  }
};

//Remove a single repo
const removeRepoFromList = async (repoName: string): Promise<void> => {
  let sessionValue: any = await getSessionValue('repos');
  if (!sessionValue) {
    return;
  } else {
    let arr = sessionValue.repoList.filter((repo: string) => repo !== repoName);
    if (arr.length == 0) {
      await setSessionValue('repos', null);
    } else {
      sessionValue.repoList = arr;
      await setSessionValue('repos', sessionValue);
    }
    return;
  }
};

// Fetch all PR's for View Page
const fetchPRs = async (): Promise<Array<tableList> | null> => {
  const sessionValue: any = await getSessionValue('repos');
  if (!sessionValue) {
    return null;
  }
  let prList: Array<tableList> = [];
  for (let repo of sessionValue.repoList) {
    const url: string = process.env.VIEW_PR_URL!.replace('placeholder', repo);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: process.env.AUTHORIZATION_HEADER!,
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
        'User-Agent': 'PostmanRuntime/7.35.0',
      },
    });
    try {
      const listItem: Array<any> = await response.json();
      listItem.map((pr) => {
        const item: tableList = {
          repo: repo,
          url: pr.html_url,
          avatar_url: pr.user.avatar_url,
          body: pr.body,
          requester: pr.user.login,
          title: pr.title,
          number: pr.number,
        };
        prList.push(item);
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return prList;
};

export { fetchPRs, addRepo, getAllRepos, clearAllRepos, removeRepoFromList };
