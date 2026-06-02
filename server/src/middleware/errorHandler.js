import { validateENV } from "../utils/validateEnv.js"


export const errorHandler = async (err, req, res, next) => {
    const errStatus = err.statusCode || 500
    const errMessage = err.message || "Internal server error"

    const nodeEnv = validateENV("ENVNODE")

    return res.status(errStatus).json({ success: false, mesage: errMessage, stack: nodeEnv === "development" ? err.stack : null })
}