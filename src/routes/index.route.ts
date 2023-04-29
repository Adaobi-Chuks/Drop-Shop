import express from "express";
const router = express.Router();
import upload from "../configs/multer.config";
import UserController from "../controllers/user.controller";
const {
    createUser,
} = new UserController();

router.post("/users", upload.single('imageUrl'), createUser);

export default router;