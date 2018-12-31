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

export const saveText = async (text) => {
  const query = `
    query SaveText($text: String) {
      saveText(text: $text)
    }
  `;
  const variables = { text };

  return graphqlQuery(query, variables);
};
