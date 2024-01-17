import express from "express"

import Genre from "../models/Genre.mjs"

/**
 *
 * @type {express.Handler}
 */
export const getGenres = async (req, res, next) => {
  try {
    const genres = await Genre.all()
    res.json(genres)
  } catch (error) {
    next(error)
  }
}
