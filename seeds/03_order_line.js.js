/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('order_line').del();
  await knex('order_line').insert([
    { id: 1, name: 'Product A', order_id: 1, quantity: 2, total_price: 60, unit_price: 30 },
    { id: 2, name: 'Product B', order_id: 2, quantity: 1, total_price: 60, unit_price: 60 },
    { id: 3, name: 'Product C', order_id: 3, quantity: 3, total_price: 90, unit_price: 30 },
    { id: 4, name: 'Product D', order_id: 4, quantity: 1, total_price: 110, unit_price: 110 },
    { id: 5, name: 'Product A', order_id: 5, quantity: 5, total_price: 100, unit_price: 20 },
    { id: 6, name: 'Product A', order_id: 6, quantity: 1, total_price: 60, unit_price: 60 },
    { id: 7, name: 'Product B', order_id: 7, quantity: 3, total_price: 90, unit_price: 30 },
    { id: 8, name: 'Product D', order_id: 8, quantity: 1, total_price: 110, unit_price: 110 }
  ]);
};
