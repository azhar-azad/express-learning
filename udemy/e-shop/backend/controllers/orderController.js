const Order = require('../models/order');
const OrderItem = require('../models/order-item');

const createOrder = async (req, res) => {
  const orderItemIds = Promise.all(req.body.orderItems.map(async orderItem => {
    let newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product
    });

    // Save the OrderItem
    newOrderItem = await newOrderItem.save();

    // Return just the _id
    return newOrderItem._id;
  }));

  let orderItemIdsResolved = await orderItemIds;

  let totalPrices = await Promise.all(orderItemIdsResolved.map(async orderItemId => {
    const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
    const totalPrice = orderItem.product.price * orderItem.quantity;
    return totalPrice;
  }));

  const totalPrice = totalPrices.reduce((item, sum) => item + sum, 0);

  const orderData = new Order({
    orderItems: orderItemIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user
  });

  let order = await orderData.save();

  if (!order)
    return res.status(400).send('Failed to create new order');

  res.status(201).send(order);
};

const getOrders = (req, res) => {
  Order.find()  // get all orders from collection
    .populate('user', 'name') // populate sub-doc user with only name filed
    .sort({'dateOrdered': -1}) // sort the orders newest to oldest
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(500).json({
      success: false,
      error: err
    }));
};

const getOrder = (req, res) => {
  Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
        path: 'orderItems', populate: {
          path: 'product', populate: 'category'
        }
      }) // for nested object population, use object instead of string as the value of 'populate'
    .then(order => res.json(order))
    .catch(err => res.status(400).json({
      success: false,
      error: err,
      message: `Failed to fetch order with id ${req.params.id}`
    }));
};

const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status
    },
    { new: true }
  );

  if (!order)
    return res.status(400).send('Failed to update order');

  res.send(order);
};

const deleteOrder = (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(deletedOrder => {
      if (deletedOrder) { // order is found and deleted
        deletedOrder.orderItems.map(orderItem => { // loop over the order items of deleted order
          OrderItem.findByIdAndRemove(orderItem) // find each order item
            .then(deletedOrderItem => {
              if (deletedOrderItem) // order item is found and deleted
                return res.status(200).json({success: true, message: 'Order Item is deleted'});
              else // order item is not found and so is not deleted
                return res.status(404).json({success: false, message: 'Order Item not found'});
            })
            .catch(err => { // error while deleting order item
              return res.status(400).json({success: false, error: err});
            });
        });
        return res.status(200).json({success: true, message: 'Order is deleted'});
      }
      else { // error while deleting order
        return res.status(404).json({success: false, message: 'Order not found'});
      }
    })
    .catch(err => {
      return res.status(400).json({success: false, error: err});
    });
};

const getTotalSales = async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }
  ]);

  if (!totalSales) {
    return res.status(400).send('The order sales cannot be generated');
  }

  res.send({totalSales: totalSales.pop().totalSales});
};

const getOrderCount = (req, res) => {
  Order.countDocuments()
    .then(count => res.json({
      orderCount: count
    }))
    .catch(err => res.status(400).json({
      success: false,
      error: err
    }));
};

const getOrdersByUser = (req, res) => {
  Order.find({user: req.params.userid})  // get all orders from collection
    .populate({
      path: 'orderItems', populate: {
        path: 'product', populate: 'category'
      }
    })
    .sort({'dateOrdered': -1}) // sort the orders newest to oldest
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(500).json({
      success: false,
      error: err
    }));
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getOrderCount,
  getOrdersByUser
};