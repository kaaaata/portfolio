export const graphqlQuery = async (query, variables = {}) => {
  const res = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const resJson = await res.json();

  return resJson.data;
};

export const increaseNum = async (increment) => {
  const query = `
    query IncreaseNum($increment: Int) {
      increaseNum(increment: $increment)
    }
  `;
  const variables = { increment };

  return graphqlQuery(query, variables);
};
