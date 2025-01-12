import "dotenv/config"
import express, {NextFunction, Response, Request} from "express"
import router from "./routes/notesRoute"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors"

const app = express()
const cors = require("cors")

app.use(cors({
    origin: "*",
}))

app.use(morgan("dev"))

app.use(express.json())

app.use("/api/notes", router)

// Namaste🙏 Duniya😊
app.use((req, res, next) => {
    next(createHttpError(404, "Route not found!"))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = "An error showed up!"
    let statusCode = 500
    if(isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({error: errorMessage})
})

export default app
