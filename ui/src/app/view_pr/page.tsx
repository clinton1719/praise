import { fetchPRs } from '../../serviceLayer/apiCalls';
import { getSessionValue, setSessionValue } from '../../utils/session-store';

const ViewPRs = async () => {
  const response: any = await fetchPRs();
  await setSessionValue('key', 'value');
  const ans: any = await getSessionValue('key');
  return (
    <>
      <div>View PR</div>
      <p>{ans}</p>
      {response.map((object: any, i: any) => (
        <p key={i}>{object.title}</p>
      ))}
      {response[0].title}
    </>
  );
};

export default ViewPRs;
