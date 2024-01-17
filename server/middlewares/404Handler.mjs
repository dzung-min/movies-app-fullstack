import httpErrors from "http-errors"

/**
 * Middleware for handling wrong endpoints
 * @type {import("express").Handler}
 */
export default function (req, res, next) {
  next(httpErrors.NotFound("Route not found"))
}
