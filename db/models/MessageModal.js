const Sequelize = require("sequelize");
const db = require("../config");

const { DataTypes } = Sequelize;

const MessageModal = db.define(
  "messages",
  {
    conversationsId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    text: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = MessageModal;
