const Sequelize = require("sequelize");
const db = require("../config");

const { DataTypes } = Sequelize;

const ProfileModal = db.define(
  "profile",
  {
    userId: DataTypes.INTEGER,
    dateOfBirth: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    profession: DataTypes.STRING,
    gender: DataTypes.STRING,
    relationShip: DataTypes.STRING,
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

module.exports = ProfileModal;
