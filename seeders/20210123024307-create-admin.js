'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const slat = bcrypt.genSaltSync(10);
    return queryInterface.bulkInsert('Users', 
    Array.from({length: 1}).map((item, index) =>
      ({
        id: index,
        email: "admin@test.com",
        password: bcrypt.hashSync('123', slat),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ), {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
