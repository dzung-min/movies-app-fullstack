import fs from "node:fs/promises"
import path from "node:path"

import { rootPath } from "../utils.mjs"

class Movie {
  /**
   *
   * @returns {Promise<[]>}
   */
  static async all() {
    const movieDataFilePath = path.join(rootPath, "data", "movieList.json")
    try {
      const fileContent = await fs.readFile(movieDataFilePath, "utf8")
      return JSON.parse(fileContent || "[]")
    } catch (error) {
      throw new Error("Can not read movies list data")
    }
  }
}

export default Movie
