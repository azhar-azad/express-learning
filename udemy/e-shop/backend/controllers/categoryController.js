const Category = require('../models/category');

const createCategory = (req, res) => {
  const categoryData = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  // let category = await categoryData.save();
  //
  // if (!category) {
  //   return res.status(404).send('Failed to create category');
  // }
  //
  // res.send(category);

  categoryData.save()
    .then(createdCategory => res.status(201).json(createdCategory))
    .catch(err => res.status(500).json({
      error: err,
      success: false
    }));
};

const getCategories = async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    res.status(500).json({
      message: 'Failed to fetch categories',
      success: false
    });
  }

  res.status(200).json(categories);
};

const getCategory = (req, res) => {
  Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.status(400).json({
      success: false,
      error: err,
      message: `Failed to fetch category with id ${req.params.id}`
    }));
};

const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id, {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color
    }, { new: true }
  );

  if (!category)
    return res.status(400).send('Failed to update category');

  res.send(category);
};

const deleteCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then(deletedCategory => {
      if (deletedCategory) {
        return res.status(200).json({success: true, message: 'Category is deleted'});
      }
      else {
        return res.status(404).json({success: false, message: 'Category not found'});
      }
    })
    .catch(err => {
      return res.status(400).json({success: false, error: err});
    });
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
};