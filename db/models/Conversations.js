const Sequelize = require("sequelize");
const db = require("../config");

const { DataTypes } = Sequelize;

const ConversationModal = db.define(
  "conversations",
  {
    senderId: DataTypes.INTEGER,
    reciverId: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = ConversationModal;
