import fs from "node:fs/promises"
import path from "node:path"

import { rootPath } from "../utils.mjs"

class User {
  /**
   *
   * @returns {Promise<[]>}
   */
  static async all() {
    try {
      const userFilePath = path.join(rootPath, "data", "userToken.json")
      const userFileContent = await fs.readFile(userFilePath, "utf8")
      return JSON.parse(userFileContent || "[]")
    } catch (error) {
      throw new Error("Can not read user list data")
    }
  }
}

export default User
