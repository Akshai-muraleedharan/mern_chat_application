import express from "express"
import { authRouter } from "./authRoutes/authRoutes.js"


export const v1Router = express.Router()

v1Router.use("/user", authRouter)