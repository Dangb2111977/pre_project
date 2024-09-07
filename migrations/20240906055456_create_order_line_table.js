/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('order_line', function (table) {
      table.increments('id').primary();
      table.integer('order_id', 10).unsigned().notNullable();;
      table.string('name',255).notNullable();
      table.integer('quantity',10).notNullable();
      table.float('unit_price').notNullable();
      table.float('total_price').notNullable();

      table.foreign('order_id').references('id').inTable('order').onDelete('CASCADE');

    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('order_line');
  };
  