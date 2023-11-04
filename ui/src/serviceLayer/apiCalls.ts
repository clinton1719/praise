'use server';
// Fetch all PR's
const fetchPRs = async () => {
  const response = await fetch(process.env.VIEW_PR_URL!, {
    method: 'GET',
  });

  return response.json();
};

export { fetchPRs };
