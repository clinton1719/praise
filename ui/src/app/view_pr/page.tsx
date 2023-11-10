'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchPRs } from '../../serviceLayer/apiCalls';
import Loading from '../loading';
import ModalBody from './modalBody';

const ViewPRs = () => {
  const [prList, setPRList] = useState([]);
  const fetchPRList = async () => {
    const temp: any = await fetchPRs();
    setPRList(temp);
  };
  const [show, setShow] = useState(false);
  const [modalObject, setModalObject] = useState({ body: '' });
  const showOrHideModal = (show: boolean) => {
    setShow(show);
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
          <table className="table table-auto border-separate border-spacing-3">
            {prList === null ? (
              <p>
                Please add a repo or check the spelling of the repo if you have
                added already
              </p>
            ) : prList.length == 0 ? (
              <Loading />
            ) : (
              <thead className="table-header-group">
                <tr className="table-row underline uppercase">
                  <th className="table-cell text-left">Repo Name</th>
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
                        <td className="table-cell">
                          <button
                            onClick={() => {
                              setShow(true);
                              setModalObject(object);
                            }}
                            className="block text-white bg-inherit focus:ring-4 focus:outline-none rounded-lg"
                            type="button"
                          >
                            {object.title}
                          </button>
                        </td>
                        <td className="table-cell">
                          <a
                            target="_blank"
                            href={object.url}
                            className="hover:font-bold"
                          >
                            {object.number}
                          </a>
                        </td>
                        <td className="table-cell">{object.requester}</td>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={object.avatar_url}
                          alt={''}
                          className="max-w-lg max-h-10"
                        />
                      </tr>
                    </tbody>
                  </>
                );
              })
            )}
          </table>
        </div>
      </div>
      {show ? (
        <ModalBody
          showOrHideModal={showOrHideModal}
          parentData={modalObject.body}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewPRs;
