exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('stat_tracking', (statTracking) => {
    statTracking.string('id').primary(),
    statTracking.integer('num')
  }),
  knex.schema.createTable('copy_paster', (copyPaster) => {
    copyPaster.string('id').primary(),
    copyPaster.text('text')
  }).then(() => knex('copy_paster').insert({ id: 'default', text: '"there\'s nothing here!"' }))
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('stat_tracking'),
  knex.schema.dropTable('copy_paster')
]);
