import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js"
import { validateENV } from "../utils/validateEnv.js"


export const authVerify = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(400).json({ success: false, message: "Unauthorized - No Token Provided" })
        }

        const jwtSecret = validateENV("JWTSECRET")

        const decoded = await jwt.verify(token, jwtSecret)

        if (!decoded) {
            return res.status(400).json({ success: false, message: "Unauthorized - Invalid Token" })
        }


        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }

        req.user = user

        next()

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ success: false, message: "Unauthorized - Invalid Token" })
        }

        next(error)
    }
}