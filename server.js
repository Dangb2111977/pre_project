const express = require('express');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);

const app = express();

app.use(express.json());

// Endpoint v2/api/customers
app.use('/v2/api/customers', async function (req, res) {
  try {
    // Lấy các tham số truy vấn từ URL
    const { page = 1, pageSize = 10, sortBy = 'first_name', sortOrder = 'asc' } = req.query;

    // Phân trang và sắp xếp dữ liệu
    const customers = await knex('customer')
      .orderBy(sortBy, sortOrder)
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .select('*');

    // Tính tổng số khách hàng để hỗ trợ phân trang
    const totalCustomers = await knex('customer').count('id as count').first();

    // Trả về dữ liệu khách hàng và thông tin phân trang dưới dạng JSON
    res.json({
      status: 'success',
      data: {
        customers,
        pagination: {
          total: totalCustomers.count,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          totalPages: Math.ceil(totalCustomers.count / pageSize),
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching customers',
    });
  }
});

// Endpoint v1/api/orders
app.use('/v1/api/orders', async function (req, res) {
  try {
    let orders = await knex('order').select('*');

    const customerIds = orders
      .map((order) => order.customer_id)
      .filter((customerId) => customerId !== null);

    const customers = await knex('customer').whereIn('id', customerIds).select('*');

    const customersMap = customers.reduce((map, customer) => {
      map[customer.id] = customer;
      return map;
    }, {});

    orders = orders.map((order) => {
      return {
        ...order,
        customer: order.customer_id ? customersMap[order.customer_id] : null,
      };
    });

    res.json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching orders',
    });
  }
});

// Endpoint v2/api/orders
app.use('/v2/api/orders', async function (req, res) {
  try {
    const query = knex('order')
      .leftJoin('customer', 'order.customer_id', 'customer.id')
      .select(
        'order.id',
        'order.purchased_date',
        'order.reference',
        'order.total_price',
        knex.raw(`
          CASE
            WHEN order.customer_id IS NULL THEN NULL
            ELSE JSON_OBJECT(
              'id', customer.id,
              'first_name', customer.first_name,
              'last_name', customer.last_name,
              'email', customer.email,
              'city', customer.city
            )
          END AS customer`)
      );

    console.log(query.toSQL().toNative());

    const orders = await query;
    res.json({
      status: 'success',
      data: {
        orders: orders.map((order) => {
          try {
            return {
              ...order,
              customer: order.customer ? JSON.parse(order.customer) : null,
            };
          } catch (e) {
            console.error('Error parsing JSON for order:', order);
            return {
              ...order,
              customer: null,
            };
          }
        }),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching orders',
    });
  }
});

// Endpoint xóa đơn hàng theo ID
app.delete('/v2/api/orders/:id', async function (req, res) {
  try {
    const { id } = req.params;

    await knex('order').where('id', id).del();

    res.json({
      status: 'success',
      data: {
        message: 'Order deleted successfully',
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while deleting the order',
    });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
