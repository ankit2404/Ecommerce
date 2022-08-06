import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { forget_mailer } from "../mailer/user_mailer.js";
import crypto from "crypto";

// desc : aut users and get token
// route : Post /api/users/login
// access : public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// desc : register user
// route : post /api/users
// access : public

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// desc : get user profile
// route : get /api/users/profile
// access : private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      gender: user.gender,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      dob: user.dob,
      isAdmin: user.isAdmin,
      image: user.image,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// desc : update user profile
// route : put /api/users/profile
// access : private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.gender = req.body.gender || user.gender;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.country = req.body.country || user.country;
    user.dob = req.body.dob || user.dob;
    user.email = user.email;
    user.image = req.body.image || user.image;
    // if (req.body.password) {
    //   user.password = req.body.password;
    // }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      gender: updatedUser.gender,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      country: updatedUser.country,
      dob: updatedUser.dob,
      isAdmin: updatedUser.isAdmin,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// desc : get all users
// route : get /api/users
// access : admin only

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// desc : update user profile
// route : put /api/users/updatePassword
// access : private

const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user && (await user.matchPassword(req.body.password))) {
    // user.name = user.name;
    // user.lastName = user.lastName;
    // user.gender = user.gender;
    // user.phone = user.phone;
    // user.address = user.address;
    // user.city = user.city;
    // user.country = user.country;
    // user.dob = user.dob;
    // user.email = user.email;
    user.password = req.body.newPassword;
    const updatedUser = await user.save();
    res.json({ message: "Password Changed" });
  } else {
    res.status(401);
    throw new Error("Incorrect password");
  }
});

const forgot_password = asyncHandler(async (req, res) => {
  try {
    let key = crypto.randomBytes(20).toString("hex");
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      user.auth_key = key;
      user.save();
      forget_mailer(user, key);
    } else {
      console.log(`user not exists`);
      return res.send("User does not exist ");
    }

    return res.send("Email sent successfully");
  } catch (error) {
    console.log(error);

    return res.send("Something went wrong try again");
  }
});

const reset_pass_req = asyncHandler(async (req, res) => {
  try {
    //reset the password and update the auth key

    //check user id and auth key
    if (req.body["userid"] && req.body["authkey"]) {
      const user = await User.findById(req.body["userid"]);
      if (user && user.auth_key === req.body["authkey"]) {
        user.password = req.body.password;
        user.auth_key = crypto.randomBytes(20).toString("hex");
        await user.save();
        console.log("password updated");
      } else {
        console.log("error", "user not exist or authkey expired please retry");
        return res.send("unautharised request");
      }
    } else {
      console.log("error", "user not exist or authkey expired please retry");
      return res.send("user not exist or authkey expired please retry");
    }

    return res.send("Password changed Successfully");
  } catch (error) {
    console.log(error);

    return res.send(`Internal Server error : ${error}`);
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updateUserPassword,
  reset_pass_req,
  forgot_password,
};
