import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

export const rootPath = dirname(fileURLToPath(import.meta.url))
