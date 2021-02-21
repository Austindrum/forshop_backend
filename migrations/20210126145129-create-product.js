'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.INTEGER
      },
      sub_category: {
        type: Sequelize.INTEGER
      },
      item_num: {
        type: Sequelize.INTEGER
      },
      unit: {
        type: Sequelize.STRING
      },
      origin_price: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      size_s: {
        type: Sequelize.BOOLEAN
      },
      size_m: {
        type: Sequelize.BOOLEAN
      },
      size_l: {
        type: Sequelize.BOOLEAN
      },
      size_xl: {
        type: Sequelize.BOOLEAN
      },
      content: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      enabled: {
        type: Sequelize.BOOLEAN
      },
      image1: {
        type: Sequelize.STRING
      },
      image2: {
        type: Sequelize.STRING
      },
      image3: {
        type: Sequelize.STRING
      },
      image4: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};