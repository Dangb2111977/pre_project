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
    { id: 3, first_name: 'Jim', last_name: 'Beam', email: 'jim@example.com', city: 'Chicago', password: 'password3' },
    { id: 4, first_name: 'Jack', last_name: 'Daniels', email: 'jack@example.com', city: 'Houston', password: 'password4' },
    { id: 5, first_name: 'Jill', last_name: 'Valentine', email: 'jill@example.com', city: 'Phoenix', password: 'password5' },
    { id: 6, first_name: 'Chris', last_name: 'Redfield', email: 'chris@example.com', city: 'Philadelphia', password: 'password6' },
    { id: 7, first_name: 'Leon', last_name: 'Kennedy', email: 'leon@example.com', city: 'San Antonio', password: 'password7' },
    { id: 8, first_name: 'Claire', last_name: 'Redfield', email: 'claire@example.com', city: 'San Diego', password: 'password8' },
    { id: 9, first_name: 'Ada', last_name: 'Wong', email: 'ada@example.com', city: 'Dallas', password: 'password9' }    
  ]);
};
