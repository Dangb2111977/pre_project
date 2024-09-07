/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('order').del();
  await knex('order').insert([
    { id: 1, customer_id: 1, total_price: 100.00 },
    { id: 2, customer_id: 2, total_price: 200.00 },
    { id: 3, customer_id: 3, total_price: 150.00 },
    { id: 4, customer_id: 4, total_price: 60.00 },
    { id: 5, customer_id: 5, total_price: 300.00 },
    { id: 6, customer_id: 6, total_price: 110.00 },
    { id: 7, customer_id: 7, total_price: 110.00 },
    { id: 9, customer_id: 8, total_price: 90.00 },
  ]);
};
