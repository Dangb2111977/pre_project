/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa tất cả dữ liệu hiện có
  await knex('order').del();

  // Thêm dữ liệu mới vào bảng order
  await knex('order').insert([
    { id: 1, purchased_date: '2024-09-01', reference: 'ORD001', total_price: 100.00, customer_id: 1 },
    { id: 2, purchased_date: '2024-09-02', reference: 'ORD002', total_price: 200.00, customer_id: 2 }
    // { id: 3, purchased_date: '2024-09-03', reference: 'ORD003', total_price: 150.00, customer_id: 3 }
  ]);
};
