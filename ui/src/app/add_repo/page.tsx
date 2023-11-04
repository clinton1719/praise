const AddRepo = () => {
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
            />
            <button className="addPr" type="button">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRepo;
