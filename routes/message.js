const express = require("express");
const multer = require("multer");
const MessageModal = require("../db/models/MessageModal");
const router = express.Router();

//create Message

router.post("/add", async (req, res) => {
  const { senderId, text, conversationsId } = req.body; 
  await MessageModal.create({
    conversationsId: conversationsId,
    senderId: senderId,
    text: text,
  });

  res.status(200).json("Message Sent");
});

// Get Message

router.get("/get/:conversationsId", async (req, res) => {
  const { conversationsId } = req.params;
  const getConversations = await MessageModal.findAll({
    where: {
      conversationsId: conversationsId,
    },
  });

  if (!conversationsId) {
    res.status(401).json("You are not Authorized to view this Messages");
  } else {
    res.status(200).json(getConversations);
  }
});

module.exports = router;
