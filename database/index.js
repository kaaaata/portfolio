const knex = require('./db');

const getText = async () => {
  const data = await knex('apps').where({ key: 'copy_paster_text' }).select('text');
  return data[0].text;
};
const saveText = async ({ text }) => {
  await knex('apps').where({ key: 'copy_paster_text' }).update({ text });
  return text;
};
const getSnakeHighScore = async () => {
  const data = await knex('apps').where({ key: 'snake_high_score' }).select('value');
  return data[0].value;
};
const getSnakeTotalFoodEaten = async () => {
  const data = await knex('stat_tracking').count('stat').where({ stat: 'snake_ate_food' });
  return data[0].count;
};
const registerSnakeHighScore = async ({ score }) => {
  await knex('apps').where({ value: 'snake_high_score' }).update({ value: score });
  return score;
};
const trackStats = async ({ stat, numValue, textValue }) => {
  await knex('stat_tracking').insert({ stat, numValue, textValue });
  return stat;
};

module.exports = {
  getText,
  saveText,
  getSnakeHighScore,
  registerSnakeHighScore,
  getSnakeTotalFoodEaten,
  trackStats
};
