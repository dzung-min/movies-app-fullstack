import httpErrors from "http-errors"
import express from "express"

import Movie from "../models/Movie.mjs"
import Genre from "../models/Genre.mjs"
import Video from "../models/Video.mjs"
import MediaType from "../models/MediaType.mjs"

/**
 * route handler for GET /api/movies/trending
 */
export const getTrendingMovies = getSortedMovies("popularity")

/**
 * route handler for GET /api/movies/top-rate
 */
export const getTopRateMovies = getSortedMovies("vote_average")

/**
 * route handler for GET /api/movies/:genreId
 * @type {express.Handler}
 */
export const getMoviesByGenreId = async (req, res, next) => {
  try {
    // get genre id throught params
    const genreId = +req.params.genreId
    if (!genreId) throw httpErrors.NotFound("Not found gerne parram")

    // get page throught params (default = 1)
    let page = +req.query.page || 1

    // find genre name
    const genreList = await Genre.all()
    const genre_name = genreList.find((n) => n.id === genreId)?.name
    if (!genre_name) throw httpErrors.NotFound("Not found that gerne id")

    // find movies with the provided genre
    const movies = await Movie.all()
    const moviesByGenre = movies.filter((movie) =>
      movie.genre_ids.includes(genreId)
    )

    const offset = (page - 1) * 20

    res.json({
      results: moviesByGenre.slice(offset, offset + 20),
      page,
      totalPage: Math.floor(moviesByGenre.length / 20) + 1,
      genre_name,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * route handler for GET "/api/movies/video/:film_id"
 * @type {express.Handler}
 */
export const getVideoByMovieId = async (req, res, next) => {
  try {
    // get and check for film_id
    const film_id = +req.params.film_id
    if (!film_id) throw httpErrors.NotFound("Not found film_id parram")

    // get all videos from file data
    const videos = await Video.all()

    // find the video with the film id
    const videosByFilmId = videos.find((video) => video.id === film_id)?.videos
    if (!videosByFilmId) throw httpErrors.NotFound("Not found video")

    // select official videos from YouTube
    const officialVideosFromYouTube = videosByFilmId.filter(
      (video) => video.official && video.site === "YouTube"
    )
    if (officialVideosFromYouTube.length === 0)
      throw httpErrors.NotFound("Not found video")

    // select and return the newest Trailer video if available
    const trailerVideo = officialVideosFromYouTube
      .filter((video) => video.type === "Trailer")
      .sort((a, b) => a.published_at - b.published_at)[0]
    if (trailerVideo) return res.json(trailerVideo)

    // if no trailer video, find and return the newest Teaser video
    const teaserVideo = officialVideosFromYouTube
      .filter((video) => video.type === "Teaser")
      .sort((a, b) => a.published_at - b.published_at)[0]
    res.json(teaserVideo)
  } catch (error) {
    // pass error to error handler
    next(error)
  }
}

/**
 * handler for searching movies by keyword
 * @type {express.Handler}
 */
export const getMoviesByKeyword = async (req, res, next) => {
  try {
    // check and get the query string "keyword"
    const keyword = req.query.keyword?.toLowerCase()
    const page = +req.query.page || 1
    if (!keyword) throw httpErrors.NotFound("Not found keyword parram")

    // get all movies
    const movies = await Movie.all()

    // filter movies which has the keyword in their title or overview
    const searchedMovies = movies.filter((movie) => {
      return (
        movie.title?.toLowerCase().includes(keyword) ||
        movie.overview?.toLowerCase().includes(keyword)
      )
    })

    // return the searchedMovies (basic requirement)
    // const offset = (page - 1) * 20

    // res.json({
    //   results: searchedMovies.slice(offset, offset + 20),
    //   page,
    //   totalPage: Math.floor(searchedMovies.length / 20) + 1,
    // })

    // advance requirement
    // put searchedMovies in to request object and pass them to the next handler
    req.movies = searchedMovies
    next()
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @type {express.Handler}
 */
export const getMoviesByGenreName = async (req, res, next) => {
  try {
    const genre = req.query.genre?.toLowerCase()
    if (!genre) return next()

    const genres = await Genre.all()
    const genre_id = genres.find(
      (item) => item.name.toLowerCase() === genre
    )?.id
    if (!genre_id) throw httpErrors.NotFound("Not found genre")
    const filteredMovies = req.movies.filter((movie) =>
      movie.genre_ids.includes(genre_id)
    )
    req.movies = filteredMovies
    next()
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @type {express.Handler}
 */
export const getMoviesByMediaType = async (req, res, next) => {
  const mediaType = req.query.media_type?.toLowerCase()
  if (!mediaType) return next()
  try {
    const mediaTypes = await MediaType.all()
    const isNotValidMediaType = !mediaTypes.includes(mediaType)
    if (isNotValidMediaType) throw httpErrors.NotFound("Not found media type")
    if (mediaType === "all") return next()
    const filteredMovies = req.movies.filter(
      (movie) => movie.media_type === mediaType
    )
    req.movies = filteredMovies
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * @type {express.Handler}
 */
export const getMoviesByLanguage = async (req, res, next) => {
  const language = req.query.language?.toLowerCase()
  if (!language) return next()
  try {
    if (language !== "en" && language !== "ja" && language !== "ko")
      throw httpErrors.BadRequest("Invalid language")
    const filteredMovies = req.movies.filter(
      (movie) => movie.original_language === language
    )
    req.movies = filteredMovies
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * @type {express.Handler}
 */
export const getMoviesByYear = async (req, res, next) => {
  const year = +req.query.year
  if (!year) return next()
  const filteredMovies = req.movies.filter(
    (movie) =>
      new Date(movie.release_date || movie.first_air_date).getFullYear() ===
      year
  )
  req.movies = filteredMovies
  next()
}

/**
 * handler for returning searched movies
 * @type {express.Handler}
 */
export const returnSearchedMovies = async (req, res, next) => {
  const page = +req.query.page || 1
  const offset = (page - 1) * 20
  const movies = req.movies.slice(offset, offset + 20)
  res.json({
    results: movies,
    page,
    totalPage: Math.floor(req.movies.length / 20) + 1,
  })
}

/**
 * Get the movies which are sorted by "sortField"
 * @param {string} sortField
 * @returns {express.Handler}
 */
function getSortedMovies(sortField) {
  return async function (req, res, next) {
    const page = +req.query.page || 1
    try {
      const movies = await Movie.all()
      const sortedMovies = movies.sort((a, b) => {
        if (a[sortField] < b[sortField]) return 1
        if (a[sortField] > b[sortField]) return -1
        else return 0
      })
      const offset = (page - 1) * 20
      res.json({
        results: sortedMovies.slice(offset, offset + 20),
        page,
        totalPage: Math.floor(sortedMovies.length / 20) + 1,
      })
    } catch (error) {
      next(error)
    }
  }
}
