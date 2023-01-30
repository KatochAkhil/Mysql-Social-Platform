const express = require("express");
const db = require("../db/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const UserModal = require("../db/models/UserModal");
const ProfileModal = require("../db/models/ProfileModal");
const { Op, where } = require("sequelize");
const { createToken } = require("./tokens");

const router = express.Router();

//register

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/register", async (req, res) => {
  let { name, email, password, phone } = req.body;

  const checkUser = await UserModal.findOne({
    where: { email },
  });

  if (checkUser) {
    return res.status(400).send({ msg: "Email Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const newUser = await UserModal.create({
    name,
    email,
    password,
    phone,
  });

  // const msg = {
  //   to: email,
  //   from: process.env.SMTP_EMAIL,
  //   subject: "verify your Email",
  //   text: `THANK YOU FOR  SIGN-UP IN SOCIAL PLATFORM`,
  //   html: `<h1>Hi' ${name}!</h1>
  //   <p>Thank you for Sign-up in SOCIAL PLATFORM</p>
  //   <p>This is a social PlatForm which is By Akhil Katoch.</p>
  //  <p> I encourage you to use my Social Platform and let me Know the Experience<p>
  //  <p>Please reach out to us at <a href=mailto:${process.env.MYMAIL}>${process.env.MYMAIL}</a></p>
  //   <button> <a href=${process.env.BASE_URL}>Verify</button>
  //   </div>`,
  // };

  return res
    .status(201)
    .json({ msg: "User Created Successfully", data: newUser });
});
//login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModal.findOne({
    where: {
      email,
      password: { [Op.ne]: null },
    },
  });

  if (!user) {
    return res.status(404).json("User Not Found");
  } else {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).send("Invalid Email or Password!");
    } else {
      const profileData = await ProfileModal.findOne({
        where: {
          userId: user.id,
        },
      });
      const token = createToken(user.id, user.email);
      return res.header("authorization", token).status(200).json({
        userId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: token,
        profileData,
      });
    }
  }
});

//admin login

router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await UserModal.findOne({
    where: {
      email,
      password: { [Op.ne]: null },
    },
  });

  const getAdmin = await UserModal.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json("User Not Found");
  } else {
    if (getAdmin?.dataValues?.isAdmin === false) {
      res.status(401).json("You are not Authrozied to Login");
    } else {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        res.status(401).send("Invalid Email or Password!");
      } else {
        const profileData = await ProfileModal.findOne({
          where: {
            userId: user.id,
          },
        });
        const token = createToken(user.id, user.email);
        return res.header("authorization", token).status(200).json({
          userId: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          token: token,
          profileData,
        });
      }
    }
  }
});

// get User

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  let user = await UserModal.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json("User Not Found");
  }

  const profileData = await ProfileModal.findOne({
    where: {
      userId: user.id,
    },
  });

  return res.status(200).json({
    userId: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    profileData,
  });
});

// Get All Users

router.post("/users", async (req, res) => {
  const { userId } = req.body;
  const users = await UserModal.findAll();

  const getAdmin = await UserModal.findOne({
    where: {
      id: userId,
    },
  });

  if (getAdmin?.dataValues?.isAdmin === true) {
    res.status(200).json(users);
  } else {
    res.status(401).json("You are not Authorized to view the List");
  }
});

//search Users

router.get("/search", async (req, res) => {
  const { search } = req.query;
  const getUsers = await UserModal.findAll({
    where: {
      name: { [Op.like]: `%${search}%` },
    },
  });
  res.status(200).json(getUsers);
});

module.exports = router;
