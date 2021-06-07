const Product = require('../models/product');
const Category = require('../models/category');
const mongoose = require('mongoose');

const createProduct = (req, res) => {

  Category.findById(req.body.category)
    .then()
    .catch(err => res.status(400).json({
      success: false,
      error: err
    }));

  const productData = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    category: req.body.category
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
  let categoryIds = {};
  if (req.query.categories) {
    let categories = req.query.categories.split(',');
    categoryIds = {category: categories}; // key of the object has to be the name of the column in db, in this case category
  }

  // If category IDs are sent via query params, return products by cateory.
  // Else categoryIds is an empty object, so, return all products
  const products = await Product.find(categoryIds)
    .populate('category');

  if (!products) {
    res.status(500).json({
      message: 'Failed to fetch products',
      success: false
    });
  }

  res.json(products);
};

const getProductsSelectiveFields = async (req, res) => {
  // only returns the name and image fields excluding _id
  const products = await Product.find().select('name image -_id');

  if (!products) {
    res.status(500).json({
      message: 'Failed to fetch products',
      success: false
    });
  }

  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category'); // populate will return Category data, not just the category id

  if (!product) {
    res.status(500).json({
      message: 'Failed to fetch products',
      success: false
    });
  }

  res.json(product);
};

const updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) { // validating id
    res.status(400).send('Invalid Product id');
  }

  Category.findById(req.body.category)
    .then()
    .catch(err => res.status(400).json({
      success: false,
      error: err
    }));

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      category: req.body.category
    }, { new: true }
  );

  if (!product)
    return res.status(500).send('Failed to update product');

  res.send(product);
};

const deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(deletedProduct => {
      if (deletedProduct) {
        return res.status(200).json({success: true, message: 'Product is deleted'});
      }
      else {
        return res.status(404).json({success: false, message: 'Product not found'});
      }
    })
    .catch(err => {
      return res.status(400).json({success: false, error: err});
    });
};

const getProductCount = (req, res) => {

  Product.countDocuments()
    .then(count => res.json({
      productCount: count
    }))
    .catch(err => res.status(400).json({
      success: false,
      error: err
    }));
};

const getProductFeatured = (req, res) => {

  Product.find({isFeatured: true})
    .then(products => res.json(products))
    .catch(err => res.status(400).json({
      success: false,
      error: err
    }));
};

const getProductFeaturedLimited = (req, res) => {

  const count = req.params.count ? parseInt(req.params.count) : 0;

  Product.find({isFeatured: true}).limit(count) // count is string, + is to convert it to number
    .then(products => res.json(products))
    .catch(err => res.status(400).json({
      success: false,
      error: err
    }));
};

module.exports = {
  createProduct,
  getProducts,
  getProductsSelectiveFields,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getProductFeatured,
  getProductFeaturedLimited
};