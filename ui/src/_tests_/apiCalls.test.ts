import {
  addRepo,
  clearAllRepos,
  fetchPRs,
  getAllRepos,
  removeRepoFromList,
  tableList,
} from '@/serviceLayer/apiCalls';
import * as session from '@/utils/session-store';

jest.mock('../utils/session-store');

describe('Add Repo Tests', () => {
  let setSessionValueSpy: jest.SpyInstance;
  const repoName: string = 'testRepo';

  beforeEach(() => {
    setSessionValueSpy = jest.spyOn(session, 'setSessionValue');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should return something', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve(null));

    await addRepo(repoName);

    expect(setSessionValueSpy).toHaveBeenCalledTimes(1);
    expect(setSessionValueSpy).toHaveReturned();
  });

  test('Should return new array', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve(null));

    await addRepo(repoName);

    expect(setSessionValueSpy).toHaveBeenCalledWith('repos', {
      repoList: [repoName],
    });
  });

  test('Should append new repo', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve({ repoList: [repoName] }));

    await addRepo('newRepo');

    expect(setSessionValueSpy).toHaveBeenCalledWith('repos', {
      repoList: [repoName, 'newRepo'],
    });
  });
});

describe('Get All Repos Tests', () => {
  const repoName: string = 'testRepo';

  test('Should return null', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve(null));

    const repos: Array<string> | null = await getAllRepos();

    expect(repos).toStrictEqual(null);
  });

  test('Should return array', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve({ repoList: [repoName] }));

    const repos: Array<string> | null = await getAllRepos();

    expect(repos).toStrictEqual([repoName]);
  });
});

describe('Clear All Repos', () => {
  let setSessionValueSpy: jest.SpyInstance;
  const repoName: string = 'testRepo';

  beforeEach(() => {
    setSessionValueSpy = jest.spyOn(session, 'setSessionValue');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should do nothing', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve(null));

    await clearAllRepos();

    expect(setSessionValueSpy).toHaveBeenCalledTimes(0);
  });

  test('Should set repos as null', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve({ repoList: [repoName] }));

    await clearAllRepos();

    expect(setSessionValueSpy).toHaveBeenCalledWith('repos', null);
  });
});

describe('Removing single repo test', () => {
  let setSessionValueSpy: jest.SpyInstance;
  const repoName: string = 'testRepo';

  beforeEach(() => {
    setSessionValueSpy = jest.spyOn(session, 'setSessionValue');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should do nothing', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve(null));

    await removeRepoFromList(repoName);

    expect(setSessionValueSpy).toHaveBeenCalledTimes(0);
  });

  test('Should set as null after removing single repo', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve({ repoList: [repoName] }));

    await removeRepoFromList(repoName);

    expect(setSessionValueSpy).toHaveBeenCalledWith('repos', null);
  });

  test('Should set as filtered repos after removing single repo', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve({ repoList: [repoName, 'secondRepo'] }));

    await removeRepoFromList(repoName);

    expect(setSessionValueSpy).toHaveBeenCalledWith('repos', {
      repoList: ['secondRepo'],
    });
  });
});

describe("Fetch PR's tests", () => {
  const repoName: string = 'testRepo';
  const data = [
    {
      html_url: 'Test URL',
      body: 'Test Body',
      title: 'Test title',
      number: 'Test Number',
      user: {
        avatar_url: 'Test URL',
        login: 'Test user',
      },
    },
  ];
  const mockedResponse = new Response(JSON.stringify(data), {
    status: 200,
    statusText: 'ok',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: '*/*',
    }),
  });
  const expectedResponse: tableList = {
    repo: repoName,
    url: data[0].html_url,
    avatar_url: data[0].user.avatar_url,
    body: data[0].body,
    requester: data[0].user.login,
    title: data[0].title,
    number: data[0].number,
  };

  global.fetch = jest.fn(() => {
    return Promise.resolve(mockedResponse);
  }) as jest.Mock;

  test('Should do nothing', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve(null));

    const prList = await fetchPRs();

    expect(prList).toStrictEqual(null);
  });

  test('Return expected value', async () => {
    jest
      .spyOn(session, 'getSessionValue')
      .mockReturnValue(Promise.resolve({ repoList: [repoName] }));

    const prList: Array<tableList> | null = await fetchPRs();

    expect(prList![0]).toStrictEqual(expectedResponse);
  });
});
