export const graphqlQuery = async(query, variables = {}) => {
  let num = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  num = await num.json();
  
  return num.data;
}

export const increaseNum = async(increment) => {
  const query = `
    query IncreaseNum($increment: Int) {
      increaseNum(increment: $increment)
    }
  `;
  const variables = { increment };

  return await graphqlQuery(query, variables);
}
