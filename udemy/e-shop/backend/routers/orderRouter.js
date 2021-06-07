/**
 * @Path: /orders
 * @Description:
 * */
const orderRouter = require('express').Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getOrderCount,
  getOrdersByUser
} = require('../controllers/orderController');

/**
 * @URL: http://localhost:5000/api/{version}/orders
 * @Description: Create a new Order entity
 * @Method: POST
* */
orderRouter.post('/', createOrder);

/**
 * @URL: http://localhost:5000/api/{version}/orders
 * @Description: Get all Order entities
 * @Method: GET
 * */
orderRouter.get('/', getOrders);

/**
 * @URL: http://localhost:5000/api/{version}/orders/{orderId}
 * @Description: Get a Order entity by id
 * @Method: GET
 * */
orderRouter.get('/:id', getOrder);

/**
 * @URL: http://localhost:5000/api/{version}/orders/{orderId}
 * @Description: Update a Order entity by id
 * @Method: PUT
 * */
orderRouter.put('/:id', updateOrder);

/**
 * @URL: http://localhost:5000/api/{version}/orders/{orderId}
 * @Description: Delete a Order entity by id
 * @Method: DELETE
 * */
orderRouter.delete('/:id', deleteOrder);

/**
 * @URL: http://localhost:5000/api/{version}/orders/get/totalSales
 * @Description: Get total sales
 * @Method: GET
 * */
orderRouter.get('/get/totalSales', getTotalSales);

/**
 * @URL: http://localhost:5000/api/{version}/orders/get/count
 * @Description: Get count of Order entities
 * @Method: GET
 * */
orderRouter.get('/get/count', getOrderCount);

/**
 * @URL: http://localhost:5000/api/{version}/get/userOrders/{userId}
 * @Description: Get all Order entities by user id
 * @Method: GET
 * */
orderRouter.get('/get/userOrders/:userid', getOrdersByUser);

module.exports = orderRouter;