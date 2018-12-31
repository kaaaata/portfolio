const knex = require('./db');

const getText = async () => {
  const data = await knex('copy_paster').where({ id: 'default' }).select('text');
  return data[0].text;
};
const saveText = async ({ text }) => {
  await knex('copy_paster').where({ id: 'default' }).update({ text });
  return text;
};

module.exports = {
  getText,
  saveText
};
