/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  
exports.up = function (knex) {
    return knex.schema.createTable('order', function (table) {
      table.increments('id').primary(); // Primary key
      table.integer('customer_id').unsigned().notNullable(); // Foreign key reference to customer
      table.date('purchased_date').notNullable();
      table.string('reference', 255).notNullable();
      table.float('total_price').notNullable();
  
      // Set up foreign key reference to the customer table
      table.foreign('customer_id').references('id').inTable('customer').onDelete('CASCADE');
    });
  };
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('order');
  };
  