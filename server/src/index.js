import express from "express"
import http from "node:http"
import { Server } from "socket.io"
import { validateENV } from "./utils/validateEnv.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import { apiRouter } from "./routes/index.js"
import { app, server } from "./lib/socket.js"
import cors from "cors"


app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


const port = validateENV("PORT")

app.use("/api", apiRouter)


async function startServer() {
    await connectDB()

    server.listen(port, () => {
        console.log("Server connected on port", port)
    })
}


startServer()

app.use(errorHandler)