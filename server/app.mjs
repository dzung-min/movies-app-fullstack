import express from "express"
import cors from "cors"
import logger from "morgan"
import bodyParser from "body-parser"

import apiRouter from "./routers/api.mjs"
import NotFoundHandler from "./middlewares/404Handler.mjs"

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api", apiRouter)
// 404 handler
app.use(NotFoundHandler)

// Errors handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Something went wrong"
  res.status(statusCode).json({ message })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
