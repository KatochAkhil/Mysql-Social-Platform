const express = require("express");
const multer = require("multer");
const router = express.Router();
const monent = require("moment");
const ProfileModal = require("../db/models/ProfileModal");
const UserModal = require("../db/models/UserModal");

// create profile

// image storage

const imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// filter

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Only Image is Allowed"));
  }
};

let upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});

router.post("/userProfile", upload.single("image"), async (req, res) => {
  const { userId, gender, dateOfBirth, relationShip, profession } = req.body;

  if (!userId || !gender || !dateOfBirth || !relationShip || !profession) {
    return console.log(error);
  } else {
    await ProfileModal.create({
      userId: userId,
      gender: gender,
      dateOfBirth: dateOfBirth,
      relationShip: relationShip,
      profession: profession,
      profilePicture: req.file.filename,
    });
    res.json("Created Successfully");
  }
});

//get user profile

router.get("/getProfile/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModal.findOne({
    where: {
      id: id,
    },
  });

  if (user?.dataValues?.id == id) {
    const data = await ProfileModal.findOne({
      where: {
        userId: req.params.id,
      },
    });
    res.json(data);
  } else {
    res.status(404).json("Not Found");
  }
});

//edit profile

router.post("/editProfile/:id", async (req, res) => {
  const user = await UserModal.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (user?.dataValues?.id == req.params.id) {
    const data = await ProfileModal.update(req.body, {
      where: {
        userId: req.params.id,
      },
    });
    res.json({ ...data });
    console.log(data);
  } else {
    res.status(404).json("Not Found");
  }
});

module.exports = router;
