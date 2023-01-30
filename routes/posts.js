const express = require("express");
const multer = require("multer");
const Postmodal = require("../db/models/Postmodal");
const router = express.Router();
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

//create Post

router.post("/post/add", upload.single("image"), async (req, res) => {
  const { userId, text, location, likes, emoji } = req.body;

  await Postmodal.create({
    userId: userId,
    text: text,
    location: location,
    image: req.file.filename,
    likes: likes,
    emoji: emoji,
  });
  res.json("Post Created Successfully");
});

// get all posts

router.get("/posts", async (req, res) => {
  const allPosts = await Postmodal.findAll();
  return res.status(201).json(allPosts);
});
//get all posts on admin

router.get("/admin/posts/:userId", async (req, res) => {
  const { userId } = req.params;

  const getAdmin = await UserModal.findOne({
    whare: {
      id: userId,
    },
  });

  res.json(getAdmin);

  // const allPosts = await Postmodal.findAll();

  // return res.status(201).json(allPosts);
});

// router.get("/posts/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await UserModal.findOne({
//     where: {
//       id: id,
//     },
//   });

//   if (user?.dataValues?.id == id) {
//     const data = await ProfileModal.findOne({
//       where: {
//         userId: req.params.id,
//       },
//     });
//     res.json(data);
//   } else {
//     res.status(404).json("Not Found");
//   }
// });

//posts based on user id

//edit posts

router.post("/editposts", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserModal.findOne({
      where: {
        id: userId,
      },
    });
    if (user?.dataValues?.id !== userId) {
      res.status(401).json("Not Authorized");
    } else {
      const post = await Postmodal.findOne({
        where: {
          userId: userId,
        },
      });

      if (!post) {
        res.status(404).json("Post not found");
      } else {
        const editPost = await Postmodal.update(req.body, {
          where: {
            userId: post.dataValues.userId,
          },
        });
        res.status(201).json("Post Updated Successfully");
      }

      res.json(post);
    }
  } catch (error) {
    console.log(error);
  }
});

//delete Posts

router.post("/deletePosts", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserModal.findOne({
      where: {
        id: userId,
      },
    });
    if (user?.dataValues?.id !== userId) {
      res.status(401).json("Not Authorized");
    } else {
      const post = await Postmodal.findOne({
        where: {
          userId: userId,
        },
      });

      if (!post) {
        res.json("Post not found");
      } else {
        const deletePost = await Postmodal.destroy({
          where: {
            userId: post.dataValues.userId,
          },
          truncate: true,
        });
        res.json("Post Delete Successfully");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// get users posts

router.get("/getUsersPosts/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModal.findOne({
      where: {
        id: userId,
      },
    });

    const posts = await Postmodal.findAndCountAll({
      where: {
        userId: user?.dataValues?.id,
      },
    });
    if (!posts) {
      return res.status(404).json("No Posts Found");
    } else {
      res.status(201).json({
        posts,
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//comments

//add comment
router.post("/addcomment", async (req, res) => {
  const { postId, comment } = req.body;

  const addComment = await Postmodal.create({
    id: postId,
    comment: comment,
  });

  res.status(201).json("Comment Added");
});

//get posts comments

module.exports = router;
