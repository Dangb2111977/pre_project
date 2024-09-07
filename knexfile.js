// Update with your config settings.

/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    database: 'example',
    user: 'root',
    // password: 'Hdang123@',
  },
  pool: {
    min: 2,
    max: 10,
  },
};
