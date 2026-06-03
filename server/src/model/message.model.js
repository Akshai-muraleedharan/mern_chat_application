import mongoose from "mongoose"


const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String
    }
}, { timeStamps: true })

export const Message = mongoose.model("Message", messageSchema)