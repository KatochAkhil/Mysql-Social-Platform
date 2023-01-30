const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/userProfile");
const postsRoute = require("./routes/posts");
const messageRoute = require("./routes/message");
const conversationsRoute = require("./routes/conversations");
const cookieparser = require("cookie-parser");
dotenv.config();

const app = express();
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieparser());

app.get("/", (req, res) => {
  res.json("Api is working");
});

app.use("/uploads", express.static("./uploads"));
app.use("/api/auth", authRoute);
app.use("/api/userProfile", profileRoute);
app.use("/api/posts", postsRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversations", conversationsRoute);

app.listen(process.env.PORT, (req, res) => {
  console.log(`App is working on Port no ${process.env.PORT}`);
});
