/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('test', function(table) {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.integer('test_id').notNullable(); // No length parameter needed
        table.string('name', 255).notNullable(); // Max length for string
        table.integer('quantity').notNullable(); // No length parameter needed
        table.float('unit_price').notNullable(); // Consider precision if needed
        table.float('total_price').notNullable(); // Consider precision if needed
    });
};
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('test');
};
