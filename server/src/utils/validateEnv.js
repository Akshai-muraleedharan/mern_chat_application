import dotenv from "dotenv"

dotenv.config()

export const validateENV = (envName) => {
    const validatedEnv = process.env[envName]

    if (!validatedEnv) {
        throw new Error(`Invalid env:  ${envName}`);
    }
    return validatedEnv
}