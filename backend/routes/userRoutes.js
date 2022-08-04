import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updateUserPassword,
  forgot_password,
  // forget_pass_page,
  // forgot_password_reset_recive,
  reset_pass_req,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/login").post(authUser);

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/changeMyPassword").put(protect, updateUserPassword);

router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);

router.route("/forgot-pass").post(forgot_password);
// router.route("/forgot").get(forget_pass_page);
// router.route("/forgot-password/reset").get(forgot_password_reset_recive);
router.route("/forgot-password/new-password").post(reset_pass_req);

export default router;
