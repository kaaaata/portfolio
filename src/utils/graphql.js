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

export const registerSnakeHighScore = async (score) => {
  const query = `
    query RegisterSnakeHighScore($score: Int) {
      registerSnakeHighScore(score: $score)
    }
  `;
  const variables = { score };

  return graphqlQuery(query, variables);
};

/**
 * Write stat tracking entries into database
 * @param {string} stat stat to be tracked
 * @param {object|number|string} value ({ numValue, textValue }|numValue|textValue)
 * @returns {string} graphql query function called
 */
export const trackStats = async (stat, value = {}) => {
  let values;

  if (typeof value === 'object') {
    values = {
      numValue: value.hasOwnProperty('numValue') ? value.numValue : 1,
      textValue: value.hasOwnProperty('textValue') ? value.textValue : ''
    };
  } else if (typeof value === 'number') {
    values = {
      numValue: value,
      textValue: ''
    };
  } else if (typeof value === 'string') {
    values = {
      numValue: 1,
      textValue: value
    };
  }

  const query = `
    query TrackStats($stat: String, $numValue: Int, $textValue: String) {
      trackStats(stat: $stat, numValue: $numValue, textValue: $textValue)
    }
  `;
  const variables = { stat, ...values };

  return graphqlQuery(query, variables);
};
