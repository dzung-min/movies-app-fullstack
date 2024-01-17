import fs from "node:fs/promises"
import path from "node:path"

import { rootPath } from "../utils.mjs"

class MediaType {
  /**
   *
   * @returns {Promise<[]>}
   */
  static async all() {
    try {
      const mediaTypeFilePath = path.join(
        rootPath,
        "data",
        "mediaTypeList.json"
      )
      const mediaTypeFileContent = await fs.readFile(mediaTypeFilePath, "utf8")
      return JSON.parse(mediaTypeFileContent || "[]")
    } catch (error) {
      throw new Error("Can not read mediaType list data")
    }
  }
}

export default MediaType
