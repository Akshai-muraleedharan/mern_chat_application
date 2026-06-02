import { validateENV } from "../utils/validateEnv.js"
import mongoose from "mongoose"

export const connectDB = async () => {

    const mongodbUrl = validateENV("MONGOURI")

    try {
        await mongoose.connect(mongodbUrl)
        console.log("DB connected successfully")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}