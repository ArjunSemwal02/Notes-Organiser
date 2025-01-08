import app from "./app"
import mongoose from "mongoose"
import env from "./Utilities/validatedEnv"

const port = env.PORT

mongoose.connect(env.CONNECTION_STRING)
    .then(() => {
        console.log("Yup Mongoose got Connected👍")
        app.listen(port, () => {
            console.log(`Yeah Good👍, the server is also connected to the port: ${port}`)
        })
    })
    .catch(console.error)