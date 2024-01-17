import fs from "node:fs/promises"
import path from "node:path"

import { rootPath } from "../utils.mjs"

class Genre {
  /**
   *
   * @returns {Promise<[]>}
   */
  static async all() {
    try {
      const genreFilePath = path.join(rootPath, "data", "genreList.json")
      const genreFileContent = await fs.readFile(genreFilePath, "utf8")
      return JSON.parse(genreFileContent || "[]")
    } catch (error) {
      throw new Error("Can not read genre list data")
    }
  }
}

export default Genre
