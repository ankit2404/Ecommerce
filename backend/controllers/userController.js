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
    console.log(req.body.email);
    let key = crypto.randomBytes(20).toString("hex");
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      user.auth_key = key;
      user.save();
      forget_mailer(user, key);
    } else {
      console.log(`user not exists`);
      return res.redirect("/");
    }

    return res.redirect("/user/sign-in");
  } catch (error) {
    console.log(error);
    console.log("error", `Internal Server error : ${error}`);
    return res.redirect("back");
  }
});

const forgot_password_reset_recive = asyncHandler(async (req, res) => {
  try {
    console.log(`entered in forgot pass reset recive`);
    let user = await User.findById(req.query.userid);
    console.log(
      `auth key link ${req.query.authkey} auth key real ${user.auth_key} `
    );
    console.log(
      `user key link ${req.query.userid} user key real ${user.auth_key} `
    );

    if (user && user.auth_key == req.query.authkey) {
      //change auth key and send to password redirect page
      return res.render("password_reset_forgot", {
        user: user.id,
        auth_key: user.auth_key,
        keyword: "",
      });
    } else {
      //noty needed
      console.log("user not exist or authkey expired");
      console.log("error", "user not exist or authkey expired please retry");
      res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    console.log("error", `Internal Server error : ${error}`);
    return res.redirect("back");
  }
});

const reset_pass_req = asyncHandler(async (req, res) => {
  try {
    //reset the password and update the auth key
    console.log(req.body);
    //check user id and auth key
    if (req.body.password == req.body["cn-password"]) {
      if (req.body["user-id"] && req.body["auth_key"]) {
        let user = await User.findById(req.body["user-id"]);

        if (user && user.auth_key == req.body["auth_key"]) {
          await User.findByIdAndUpdate(req.body["user-id"], {
            password: req.body["password"],
            auth_key: crypto.randomBytes(20).toString("hex"),
          });
          console.log("password updated");
          console.log(
            "sucess",
            "user password updated please Login with new credentials"
          );
        } else {
          console.log(`unautharised request`);
          console.log(
            "error",
            "user not exist or authkey expired please retry"
          );
          return res.redirect("back");
        }
      } else {
        console.log(`unautharised request`);
        console.log("error", "user not exist or authkey expired please retry");
        return res.redirect("back");
      }
    } else {
      console.log(`password and confirm password did not match`);
      console.log("error", "password and confirm password did not match retry");
      return res.redirect("back");
    }

    return res.redirect("/user/sign-in");
  } catch (error) {
    console.log(error);
    console.log("error", `Internal Server error : ${error}`);
    return res.redirect("back");
  }
});
const forget_pass_page = asyncHandler(async (req, res) => {
  return res.render("forgot_pass", {
    keyword: "",
  });
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
  forget_pass_page,
  reset_pass_req,
  forgot_password_reset_recive,
  forgot_password,
};
