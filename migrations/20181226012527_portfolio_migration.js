exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('stat_tracking', (statTracking) => {
    statTracking.string('id').primary(),
    statTracking.integer('value')
  }),
  knex.schema.createTable('copy_paster', (copyPaster) => {
    copyPaster.string('id').primary(),
    copyPaster.text('text')
  }).then(() => Promise.all([
    knex('copy_paster').insert({ id: 'default', text: '"there\'s nothing here!"' }),
    knex('stat_tracking').insert({ id: 'snake_high_score', value: 0 })
  ]))
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('stat_tracking'),
  knex.schema.dropTable('copy_paster')
]);
