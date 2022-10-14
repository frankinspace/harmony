exports.up = function(knex) {
  return knex.schema.renameTable('batch_granules', 'batch_items')
  .then(() => {
    return knex.schema
      .alterTable('batch_items', (t) => {
        t.renameColumn('granuleUrl', 'stacItemUrl');
        t.renameColumn('granuleSize', 'itemSize');
      });
  })
  .then(() => {
    return knex.schema
    .alterTable('work_items', (t) => {
      t.renameColumn('totalGranulesSize', 'totalItemsSize');
      t.renameColumn('outputGranuleSizesJson', 'outputItemSizesJson');
    });
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('batch_items', (t) => {
        t.renameColumn('stacItemUrl', 'granuleUrl');
        t.renameColumn('itemSize', 'granuleSize');
      })
      .then( () => {
        return knex.schema.renameTable('batch_items', 'batch_granules');
      })
      .then(() => {
        return knex.schema
        .alterTable('work_items', (t) => {
          t.renameColumn('totalItemsSize', 'totalGranulesSize');
          t.renameColumn('outputItemSizesJson', 'outputGranuleSizesJson');
        });
      });
};