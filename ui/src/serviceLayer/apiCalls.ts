'use server';
import {
  setSessionValue,
  getSessionId,
  getSessionIdAndCreateIfMissing,
  getSessionValue,
  getAllSessionValues,
} from '@/utils/session-store';
// Fetch all PR's
const fetchPRs = async () => {
  const response = await fetch(process.env.VIEW_PR_URL!, {
    method: 'GET',
  });

  return response.json();
};

const addRepo = async (repoName: string) => {
  const sessionValue: any = await getSessionValue('repos');
  if (!sessionValue) {
    await setSessionValue('repos', { repoList: [repoName] });
  } else {
    sessionValue.repoList.push(repoName);
    await setSessionValue('repos', sessionValue);
  }
};

export { fetchPRs, addRepo };
