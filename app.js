var Sequelize = require("sequelize");

var connection = new Sequelize('whealthDB', 'root', 'YES', {
    dialect: 'mysql'
});

var Users = connection.define('insertUser', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING
});

connection.sync();