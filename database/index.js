const knex = require('./db');

const getText = async () => {
  const data = await knex('apps').where({ key: 'copy_paster_text' }).select('text');
  console.log('getText returned ', data);
  return data[0].text;
};
const saveText = async ({ text }) => {
  await knex('apps').where({ key: 'copy_paster_text' }).update({ text });
  console.log('saveText returned ', text);
  return text;
};

const getSnakeHighScore = async () => {
  const data = await knex('apps').where({ key: 'snake_high_score' }).select('value');
  console.log('getSnakeHighScore returned ', data);
  return data[0].value;
};
const registerSnakeHighScore = async ({ score }) => {
  await knex('apps').where({ value: 'snake_high_score' }).update({ value: score });
  console.log('registerSnakeHighScore returned ', score);
  return score;
};
const snakeAteFood = async () => {
  await knex('stat_tracking').insert({ stat: 'snake_ate_food', value: 1 });
  console.log('snakeAteFood returned', 1);
  return 1;
};

module.exports = {
  getText,
  saveText,
  getSnakeHighScore,
  registerSnakeHighScore,
  snakeAteFood
};
