import fs from "node:fs/promises"
import path from "node:path"

import { rootPath } from "../utils.mjs"

class Video {
  /**
   *
   * @returns {Promise<[]>}
   */
  static async all() {
    try {
      const videoDataFilePath = path.join(rootPath, "data", "videoList.json")
      const fileContent = await fs.readFile(videoDataFilePath, "utf8")
      return JSON.parse(fileContent || "[]")
    } catch (error) {
      throw new Error("Can not read video list data")
    }
  }
}

export default Video
