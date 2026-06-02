import jwt from "jsonwebtoken"
import { validateENV } from "./validateEnv.js"


export const generateToken = (userId, res) => {

    const jwtSecret = validateENV("JWTSECRET")
    const nodeEnv = validateENV("ENVNODE")

    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" })

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: nodeEnv !== "development",
    })

    return token
}