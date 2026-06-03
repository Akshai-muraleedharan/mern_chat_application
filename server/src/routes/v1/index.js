import express from "express"
import { authRouter } from "./authRoutes/authRoutes.js"
import { messageRouter } from "./messageRoutes/messageRoutes.js"


export const v1Router = express.Router()

v1Router.use("/user", authRouter)
v1Router.use("/message", messageRouter)