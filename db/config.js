const Sequelize =  require("sequelize")

const db = new Sequelize("socialplatform", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
