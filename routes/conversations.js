const express = require("express");
const ConversationModal = require("../db/models/Conversations");
const router = express.Router();

//Create Message

router.post("/add", async (req, res) => {
  const { senderId, reciverId } = req.body;

  const conversations = await ConversationModal.create({
    reciverId: reciverId,
    senderId: senderId,
  });

  res.status(200).json(conversations);
});

// Get Message

router.get("/get/:senderId", async (req, res) => {
  const { senderId } = req.params;
  const getConversations = await ConversationModal.findAndCountAll({
    where: {
      senderId: senderId,
    },
  });
  if (!senderId) {
    res.status(401).json("You are Not Authorized to view this Messages");
  } else {
    res.status(200).json(getConversations);
  }
});

module.exports = router;
