
exports.up = function(knex, Promise) {

    return knex.schema.createTable('customers', function(t) {

        t.increments('id').unsigned().primary();
        t.string('first_name',190).nullable();
        t.string('last_name',190).nullable();
        t.string('gender',10).nullable();
        t.string('mobile',20).nullable();
        t.string('eamil',190).nullable();
        t.text('address').nullable();
        t.date('date_of_birth').nullable();

        t.timestamps();
    });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
