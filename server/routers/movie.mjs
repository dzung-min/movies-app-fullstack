import { Router } from "express"

import * as movieControllers from "../controllers/movie.mjs"
import * as authMiddlewares from "../middlewares/authenticate.mjs"

const router = Router()

router.use(authMiddlewares.checkUserCredential)

router.get("/trending", movieControllers.getTrendingMovies)
router.get("/top-rate", movieControllers.getTopRateMovies)
router.get("/discover/:genreId?", movieControllers.getMoviesByGenreId)
router.get("/video/:film_id?", movieControllers.getVideoByMovieId)
router.get(
  "/search",
  movieControllers.getMoviesByKeyword,
  movieControllers.getMoviesByGenreName,
  movieControllers.getMoviesByMediaType,
  movieControllers.getMoviesByLanguage,
  movieControllers.getMoviesByYear,
  movieControllers.returnSearchedMovies
)

export default router
