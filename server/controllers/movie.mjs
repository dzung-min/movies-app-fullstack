import httpErrors from "http-errors"

import Movie from "../models/Movie.mjs"
import Genre from "../models/Genre.mjs"
import Video from "../models/Video.mjs"

export const getTrendingMovies = getSortedMovies("popularity")

export const getTopRateMovies = getSortedMovies("vote_average")

/**
 * @type {import("express").Handler}
 */
export const getMoviesByGenre = async (req, res, next) => {
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
 *
 * @type {import("express").Handler}
 */
export const getVideoByMovieId = async (req, res, next) => {
  try {
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
 *
 * @type {import("express").Handler}
 */
export const getMoviesByKeyword = async (req, res, next) => {
  try {
    // check and get the query string "keyword"
    const keyword = req.query.keyword?.toLowerCase()
    const page = +req.query.page || 1
    if (!keyword) throw httpErrors.NotFound("Not found keyword parram")
    // get all movies
    const movies = await Movie.all()
    // filter movie which had the keyword in its title or overview
    const searchedMovies = movies.filter((movie) => {
      return (
        movie.title?.toLowerCase().includes(keyword) ||
        movie.overview?.toLowerCase().includes(keyword)
      )
    })
    const offset = (page - 1) * 20
    res.json({
      results: searchedMovies.slice(offset, offset + 20),
      page,
      totalPage: Math.floor(searchedMovies.length / 20) + 1,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * get the movies which are sorted by "sortField"
 * @param {string} sortField
 * @returns {import("express").Handler}
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
