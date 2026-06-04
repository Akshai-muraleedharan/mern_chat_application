import express from "express"
import { authVerify } from "../../../middleware/authVerify.js"
import { getMessages, getUsersForSideBar, sendMessage } from "../../../controller/messageController.js"

export const messageRouter = express.Router()


messageRouter.get("/users", authVerify, getUsersForSideBar)
messageRouter.get("/:id", authVerify, getMessages)
messageRouter.post("/send/:id", authVerify, sendMessage)