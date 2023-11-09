'use client';
import { useEffect, useState } from 'react';
import {
  addRepo,
  getAllRepos,
  clearAllRepos,
  removeRepoFromList,
} from '../../serviceLayer/apiCalls';
import Loading from '../loading';

const AddRepo = () => {
  const [repoName, setRepoName] = useState('');
  const [repos, setRepos] = useState([]);
  const fetchAllRepos = async () => {
    const temp: any = await getAllRepos();
    setRepos(temp);
  };
  useEffect(() => {
    fetchAllRepos();
  }, []);
  return (
    <>
      <div className="addSection">
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="inputPr"
              type="text"
              placeholder="Add Repo"
              aria-label="Repo Name"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
            <button
              className="addPrButton"
              type="submit"
              onClick={() => {
                if (repoName.length > 1) {
                  addRepo(repoName);
                  fetchAllRepos();
                  setRepoName('');
                }
              }}
            >
              Add
            </button>
            <button
              className="addPrButton"
              type="button"
              onClick={() => {
                clearAllRepos();
                setRepos([]);
              }}
            >
              Clear Repos
            </button>
          </div>
        </form>
        <p className="repoText">
          List of repos added: {repos == null ? 0 : repos.length}
        </p>
        <div>
          <ul className="uListForRepos">
            {repos == null || repos.length == 0 ? (
              <Loading />
            ) : (
              repos.map((object: any, i: any) => {
                return (
                  <div key={i} className="repoSection">
                    <p className="repoItem">{object}</p>
                    <button
                      className="removeRepo"
                      type="button"
                      onClick={() => {
                        removeRepoFromList(object);
                        fetchAllRepos();
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddRepo;
