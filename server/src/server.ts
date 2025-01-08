import express from "express"

const app = express()

const PORT = 5999

app.get('/', (req, res) => {
    res.send("Namaste🙏 Duniya😊")
})

app.listen(PORT, () => {
    console.log("Good👍")
})