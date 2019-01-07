const knex = require('./db');

const getText = async () => {
  const data = await knex('copy_paster').where({ id: 'default' }).select('text');
  console.log('getText returned ', data);
  return data[0].text;
};
const saveText = async ({ text }) => {
  await knex('copy_paster').where({ id: 'default' }).update({ text });
  console.log('saveText returned ', text);
  return text;
};

const getSnakeHighScore = async () => {
  const data = await knex('stat_tracking').where({ id: 'snake_high_score' }).select('value');
  console.log('getSnakeHighScore returned ', data);
  return data[0].value;
};
const registerSnakeHighScore = async ({ score }) => {
  await knex('stat_tracking').where({ id: 'snake_high_score' }).update({ value: score });
  console.log('registerSnakeHighScore returned ', score);
  return score;
};

module.exports = {
  getText,
  saveText,
  getSnakeHighScore,
  registerSnakeHighScore
};
