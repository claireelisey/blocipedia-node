'use strict';

const faker = require("faker");

let users = [
    {
        username: "danielle",
        email: "danielle@gmail.com",
        password: "Test1234",
        role: "standard",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        username: "matthew",
        email: "matthew@gmail.com",
        password: "Test4567",
        role: "standard",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        username: "emmyjane",
        email: "emmy@gmail.com",
        password: "Test8910",
        role: "standard",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

module.exports = {

    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", users, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    }

};