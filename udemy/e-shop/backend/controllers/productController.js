const Product = require('../models/product');

const createProduct = async (req, res) => {
  const productData = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  // const product = await productData.save();
  //
  // if (!product) {
  //   res.status(500).json({
  //     message: 'Failed to save product',
  //     success: false
  //   });
  // }
  //
  // res.status(201).json(product);

  productData.save()
    .then(createdProduct => res.status(201).json(createdProduct))
    .catch(err => res.status(500).json({
      error: err,
      success: false
    }));
};

const getProducts = async (req, res) => {
  const products = await Product.find();

  if (!products) {
    res.status(500).json({
      message: 'Failed to fetch products',
      success: false
    });
  }

  res.json(products);
};

module.exports = {
  createProduct,
  getProducts
};