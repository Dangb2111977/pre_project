/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('test').del();
  // Inserts seed entries
  await knex('test').insert([
    { test_id: 1, test_name: 'Test 1'},
    { test_id: 2, test_name: 'Test 2'}
  ]);
};
