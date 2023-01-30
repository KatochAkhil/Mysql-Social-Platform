const Sequelize = require("sequelize");
const db = require("../config");

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    isVerfied: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = User;
