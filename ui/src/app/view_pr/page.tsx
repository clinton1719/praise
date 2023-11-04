import { fetchPRs } from './apiCalls';

const ViewPRs = async () => {
  const response: any = await fetchPRs();
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
