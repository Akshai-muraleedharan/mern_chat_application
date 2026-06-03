import express from "express"
import { authVerify } from "../../../middleware/authVerify.js"
import { getMessages, sendMessage } from "../../../controller/messageController.js"

export const messageRouter = express.Router()


messageRouter.get("/:id", authVerify, getMessages)
messageRouter.post("/send/:id", authVerify, sendMessage)