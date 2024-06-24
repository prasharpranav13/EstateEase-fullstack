import express from "express";
const router = express.Router();
import { verifyToken } from "../../api/middleware/verifyToken.js";
import {
  addPost,
  getPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
