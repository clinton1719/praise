import { useEffect, useState } from 'react';

interface Props {
  showOrHideModal: Function;
  parentData: string;
}

const ModalBody = ({ showOrHideModal, parentData }: Props) => {
  const [data, setData] = useState('');
  useEffect(() => {
    setData(parentData);
  }, [parentData]);
  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y[-50%] max-w-[100%] max-h-[100%] overflow-x-scroll overflow-y-scroll text-white"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Github PR description
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => {
                  showOrHideModal(false);
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p>{data}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBody;
