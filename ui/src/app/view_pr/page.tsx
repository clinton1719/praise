const fetchPRs = async () => {
  const response = await fetch(global.process.env.NEXT_PUBLIC_VIEW_PR_URL!, {
    method: 'GET',
  });

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
