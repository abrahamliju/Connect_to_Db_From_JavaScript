
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table){
      table.foreign('id').references('famous_people.id');
  })
])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    table.dropForeign(id)
])
};
