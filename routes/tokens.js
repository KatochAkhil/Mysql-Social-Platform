const jwt = require("jsonwebtoken");

const createToken = (userId, email) => {
  const maxAge = 3 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      userId,
      email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: maxAge,
    }
  );
  return token;
};

module.exports = {
  createToken,
};
