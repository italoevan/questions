const Sequelize = require('sequelize');

const connection = new Sequelize("guiaperguntas", "root", "italo445", {
    host : "localhost",
    dialect: "mysql"
});



module.exports = connection;