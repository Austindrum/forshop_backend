'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: "ProductId",
        as: "Orders"
      })
    }
  };
  Product.init({
    title: DataTypes.STRING,
    category: DataTypes.INTEGER,
    sub_category: DataTypes.INTEGER,
    item_num: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    origin_price: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size_s: DataTypes.BOOLEAN,
    size_m: DataTypes.BOOLEAN,
    size_l: DataTypes.BOOLEAN,
    size_xl: DataTypes.BOOLEAN,
    content: DataTypes.TEXT,
    description: DataTypes.TEXT,
    enabled: DataTypes.BOOLEAN,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};