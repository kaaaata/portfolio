const knex = require('./db');

const getNum = async () => {
  const data = await knex('stat_tracking').where({ id: 1 }).select('num');
  const { num } = data[0];
  return num;
};
const increaseNum = async ({ increment }) => {
  const currentNum = await getNum();
  const newNum = currentNum + increment;
  await knex('stat_tracking').where({ id: 1 }).update({ num: newNum });
  return newNum;
};

module.exports = {
  getNum,
  increaseNum
};
