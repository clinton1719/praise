import { fetchPRs } from '../../serviceLayer/apiCalls';

const ViewPRs = async () => {
  const response: Array<any> = await fetchPRs();
  return (
    <>
      <div>View PR</div>
      {response.map((object: any, i: any) => (
        <p key={i}>{object.title}</p>
      ))}
      {response[0].title}
    </>
  );
};

export default ViewPRs;
