import { Router } from "express"

import movieRouter from "./movie.mjs"

const router = Router()

router.use("/movies", movieRouter)

export default router
