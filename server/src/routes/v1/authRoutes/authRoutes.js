import express from "express"
import { signup } from "../../../controller/index.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup)

