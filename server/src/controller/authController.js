import { User } from "../model/userModel.js"
import bcryptjs from "bcryptjs"
import { generateToken } from "../utils/tokengenerate.js"


export const signup = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "All field required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
        }

        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(409).json({ success: false, message: "Account Already Exist" })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)

            await newUser.save()

            res.status(201).json({ success: true, message: "Account Registered successfully" })
        } else {
            return res.status(400).josn({ success: false, message: "Invalid user Data" })
        }

    } catch (error) {
        next(error)
    }
}