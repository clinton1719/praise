const fetchPRs = async () => {
  const response = await fetch(
    'https://api.github.com/repos/aws/aws-cdk/pulls',
    {
      method: 'GET',
    }
  );

  return response.json();
};

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
