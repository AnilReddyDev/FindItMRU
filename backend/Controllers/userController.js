import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const getUser = asyncHandler(async (req, res) => {
  res.status(200).send("hello world");
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
  // console.log("entered into the login user function");
  const { uid, name, email, picture } = req.user;

  // Find the user in the database
  let user = await User.findOne({ uid });

  // If user does not exist, create a new user
  if (!user) {
    user = new User({ uid, name, email, picture });
    await user.save();
  }

  // Sign the token with the found or newly created user
  jwt.sign(
    {
      username: user.name,
      email: user.email,
      id: user._id,
      uid: user.uid,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY,
    {},
    (err, token) => {
      if (err) {
        res.status(500).json({ message: "Token generation failed" });
      } else {
        res
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .status(200)
          .json(user);
      }
    }
  );
});

export { getUser, loginUser, logoutUser };
