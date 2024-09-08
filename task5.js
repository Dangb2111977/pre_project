const express = require('express');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);

const app = express();

app.use(express.json());

// Update the total price of every order line
app.get('/v2/api/updateTotalPrice', async function (req, res) {
  try {
    // Update the total_price for all rows in the order_line table
    const affectedRows = await knex('order_line')
      .update({
        total_price: knex.raw('unit_price * quantity'),
      });
    
    console.log(`${affectedRows} rows updated with total_price.`);

    res.json({
      status: 'success',
      message: `${affectedRows} rows updated with total_price.`,
    });
  } catch (error) {
    console.error('Error updating total_price:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while updating total_price.',
    });
  }
});

// Retrieve all the order lines with total_price
app.get('/v2/api/orderLines', async function (req, res) {
  try {
    // Fetch all rows from the order_line table
    const orderLines = await knex('order_line').select('*');

    res.json({
      status: 'success',
      data: orderLines,
    });
  } catch (error) {
    console.error('Error fetching order lines:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching order lines.',
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
