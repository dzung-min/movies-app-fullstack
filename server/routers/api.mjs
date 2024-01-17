import { Router } from "express"

import movieRouter from "./movie.mjs"
import genreRouter from "./genre.mjs"

const router = Router()

router.use("/movies", movieRouter)
router.use("/genres", genreRouter)

export default router
