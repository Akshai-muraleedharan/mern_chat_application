import express from "express"
import { login, logout, signup } from "../../../controller/index.js";
import { authVerify } from "../../../middleware/authVerify.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", authVerify, logout)


authRouter.get("/test", authVerify, (req, res, next) => {
    res.send("test")
})

