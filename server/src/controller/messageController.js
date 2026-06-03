import { getReceiverSocketId, io } from "../lib/socket.js"
import { Message } from "../model/message.model.js"

export const sendMessage = async (req, res, next) => {
    try {
        const { text } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const newMessage = Message({
            senderId,
            receiverId,
            text
        })

        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json({ success: true, message: newMessage })

    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json({ success: true, message: "Data fetched successfully", data: messages })

    } catch (error) {
        next(error)
    }
}