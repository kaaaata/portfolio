exports.up = (knex, Promise) => (
  knex.schema.createTable('stat_tracking', (statTracking) => {
    statTracking.string('id').primary(),
    statTracking.integer('num')
  })
);

exports.down = (knex, Promise) => (
  knex.schema.dropTable('stat_tracking')
);
