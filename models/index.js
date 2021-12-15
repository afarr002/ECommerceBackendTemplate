// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
// Product.belongsTo(Category, {
//   foreignKey: "product_id",
// });

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Tag.hasMany(Product, {
  foreignKey: "tag_id",
  onDelete: "CASCADE",
});

// Tags belongToMany Products (through ProductTag)
Product.hasMany(Tag, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
