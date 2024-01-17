import { Router } from "express"

import * as genreControllers from "../controllers/genre.mjs"

const router = Router()

router.get("/", genreControllers.getGenres)

export default router
