const knex = require('./db');

const getNum = async() => {
  const data = await knex('stat_tracking').where({ id: 1 }).select('num');
  const { num } = data[0];
  console.log('getting num', num);
  return num;
};
const increaseNum = async({ increment }) => {
  console.log('increaseing num');
  const currentNum = await getNum();
  const newNum = currentNum + increment;
  await knex('stat_tracking').where({ id: 1}).update({ num: newNum });
  console.log('returning newnum', newNum);
  return newNum;
};

module.exports = {
  getNum,
  increaseNum
};
