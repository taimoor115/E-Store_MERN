import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware.js/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

export default router;
