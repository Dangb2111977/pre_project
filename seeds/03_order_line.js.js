/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa tất cả dữ liệu hiện có trong bảng order_line
  await knex('order_line').del();
  total_price = quantity * unit_price;
  // Thêm dữ liệu mới vào bảng order_line
  await knex('order_line').insert([
    { id: 1, order_id: 1, name: 'Product A', quantity: 2, unit_price: 30.00, total_price},
    { id: 2, order_id: 2, name: 'Product B', quantity: 1, unit_price: 60.00, total_price},
    { id: 3, order_id: 9, name: 'Product C', quantity: 3, unit_price: 30.00, total_price},
    { id: 4, order_id: 7, name: 'Product D', quantity: 1, unit_price: 110.00, total_price},
    { id: 5, order_id: 3, name: 'Product A', quantity: 5, unit_price: 20.00, total_price},
    { id: 6, order_id: 4, name: 'Product A', quantity: 1, unit_price: 60.00, total_price},
    { id: 7, order_id: 5, name: 'Product B', quantity: 3, unit_price: 30.00, total_price},
    { id: 8, order_id: 6, name: 'Product D', quantity: 1, unit_price: 110.00, total_price}
    // { id: 5, order_id: 3, name: 'Product E', quantity: 4, unit_price: 25.00, total_price: 100.00 }
  ]);
};
