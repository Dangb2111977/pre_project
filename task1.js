const express = require('express');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);
const crypto = require('crypto');

const app = express();

app.use(express.json());
// Middleware for verifying user with URL parameters
app.use('/v2/api/verifyUser/:name/:password', async function (req, res) {
  try {
    const { name, password } = req.params;

    if (!name || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and password are required',
      });
    }

    // Hash the password using SHA1
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    // Query to verify the user
    const user = await knex('customer')
      .where({
        first_name: name,
        password: hashedPassword
      })
      .first();

    if (user) {
      res.json({
        status: 'success',
        message: 'User found and password matches.',
      });
    } else {
      res.status(401).json({
        status: 'error',
        message: 'User not found or password does not match.',
      });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while verifying the user',
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
