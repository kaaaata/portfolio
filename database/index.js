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
const trackStats = async ({ stat, numValue, textValue }) => {
  await knex('stat_tracking').insert({ stat, numValue, textValue });
  console.log('trackStats returned ', stat);
  return stat;
};

module.exports = {
  getText,
  saveText,
  getSnakeHighScore,
  registerSnakeHighScore,
  trackStats
};
