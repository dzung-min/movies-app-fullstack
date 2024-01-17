import httpErrors from "http-errors"

import User from "../models/User.mjs"

/**
 * @type {import("express").Handler}
 */
export const checkUserCredential = async (req, res, next) => {
  try {
    // get token
    const token = req.query.token
    console.log(token)
    if (!token) throw httpErrors.Unauthorized("Unauthorized")
    // get all user
    const users = await User.all()
    // validate user token
    const user = users.find((u) => u.token === token)
    if (!user) throw httpErrors.Unauthorized("Unauthorized")
    next()
  } catch (error) {
    next(error)
  }
}
