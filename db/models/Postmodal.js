const Sequelize = require("sequelize");
const db = require("../config");

const { DataTypes } = Sequelize;

const Postmodal = db.define(
  "posts",
  {
    userId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    likes: DataTypes.STRING,
    emoji: DataTypes.STRING,
    comment: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = Postmodal;
