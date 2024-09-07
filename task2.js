const express = require('express');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);

const app = express();

app.use(express.json());

// Middleware to find products that appear in more than one order
app.use('/v2/api/products/multipleOrders', async function (req, res) {
  try {
    // Query to find products that appear in more than one order
    const products = await knex('order_line')
      .select('name')
      .count('order_id as order_count')
      .groupBy('name')
      .having('order_count', '>', 1);

    if (products.length > 0) {
      res.json({
        status: 'success',
        data: products,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'No products found in multiple orders.',
      });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching the products.',
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
