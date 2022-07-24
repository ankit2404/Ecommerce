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

export default router;
