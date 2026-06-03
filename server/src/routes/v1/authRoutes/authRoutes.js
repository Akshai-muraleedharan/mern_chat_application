import express from "express"
import { login, logout, signup } from "../../../controller/index.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logout)

