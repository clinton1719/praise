'use client';
import { useState } from 'react';
import { addRepo } from '../../serviceLayer/apiCalls';

const AddRepo = () => {
  const [repoName, setRepoName] = useState('');
  return (
    <>
      <div className="addSection">
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="inputPr"
              type="text"
              placeholder="Add Repo name"
              aria-label="Repo Name"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
            <button
              className="addPr"
              type="button"
              onClick={() => addRepo(repoName)}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRepo;
