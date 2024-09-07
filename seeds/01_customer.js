const crypto = require('crypto');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear existing entries and reset auto-increment
  await knex('customer').del();
  await knex.raw('ALTER TABLE customer AUTO_INCREMENT = 1;');

  // Define a function to hash passwords
  function hashPassword(password) {
    return crypto.createHash('sha1').update(password).digest('hex');
  }

  // Insert new customer data with hashed passwords
  await knex('customer').insert([
    {
      first_name: 'Bao',
      last_name: 'Bui',
      email: 'baobui@example.com',
      city: 'Can Tho',
      password: hashPassword('12345'),
    },
    {
      first_name: 'Nghi',
      last_name: 'Do',
      email: 'nghido@example.com',
      city: 'Can Tho',
      password: hashPassword('12345'),
    },
  ]);
};
