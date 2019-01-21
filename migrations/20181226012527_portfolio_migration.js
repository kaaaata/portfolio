exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('stat_tracking', (table) => {
    table.increments('id'),
    table.string('stat'),
    table.integer('value')
  }),
  knex.schema.createTable('apps', (table) => {
    table.string('key').primary(),
    table.text('text'),
    table.integer('value')
  }).then(() => Promise.all([
    knex('stat_tracking').insert({ stat: 'migration_completed', value: 1 }),
    knex('apps').insert({ key: 'copy_paster_text', text: '"there\'s nothing here!"' }),
    knex('apps').insert({ key: 'snake_high_score', value: 0 }),
  ]))
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('stat_tracking'),
  knex.schema.dropTable('apps')
]);
