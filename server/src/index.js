import express from "express"
import http from "node:http"
import { Server } from "socket.io"
import { validateENV } from "./utils/validateEnv.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import { apiRouter } from "./routes/index.js"


const app = express()

app.use(express.json())
app.use(cookieParser())

const server = http.createServer(app)

const port = validateENV("PORT")

const io = new Server(server,
    {
        cors:
        {
            origin: "*"
        }
    }
)

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    const userId = socket.handshake.query.userId

    if (userId) userSocketMap[userId] = socket.id
    console.log(userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

app.use("/api", apiRouter)

app.use(errorHandler)

async function startServer() {
    await connectDB()

    server.listen(port, () => {
        console.log("Server connected on port", port)
    })
}


startServer()