'use client';
import { useEffect, useState } from 'react';
import { fetchPRs } from '../../serviceLayer/apiCalls';
import Loading from '../loading';

const ViewPRs = () => {
  const [prList, setPRList] = useState([]);
  const fetchPRList = async () => {
    const temp: any = await fetchPRs();
    setPRList(temp);
  };
  useEffect(() => {
    fetchPRList();
  }, []);
  return (
    <>
      <div className="viewPRSection">
        <button
          className="viewPRButton"
          type="submit"
          onClick={() => {
            fetchPRList();
          }}
        >
          View PR&apos;s
        </button>
        <div className="tablePR">
          <table className="table table-auto">
            {prList === null || prList.length == 0 ? (
              <Loading />
            ) : (
              <thead className="table-header-group">
                <tr className="table-row underline uppercase">
                  <th className="table-cell text-left ">Repo Name</th>
                  <th className="table-cell text-left">Title</th>
                  <th className="table-cell text-left">URL</th>
                  <th className="table-cell text-left">Requester</th>
                </tr>
              </thead>
            )}
            {prList === null || prList.length == 0 ? (
              <></>
            ) : (
              prList.map((object: any, i: any) => {
                return (
                  <>
                    <tbody key={i} className="table-row-group">
                      <tr className="table-row text-base">
                        <td className="table-cell">{object.repo}</td>
                        <td className="table-cell">{object.title}</td>
                        <td className="table-cell">{object.url}</td>
                        <td className="table-cell">{object.requester}</td>
                      </tr>
                    </tbody>
                  </>
                );
              })
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewPRs;
