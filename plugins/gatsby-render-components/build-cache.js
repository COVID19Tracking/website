import fs from 'fs-extra'
import path from 'path'
import recursiveReadDir from 'recursive-readdir'

export default class BuildCache {
  constructor(basePath) {
    this.basePath = basePath
  }

  clear() {
    return fs.emptyDir(this.basePath)
  }

  fileExistsSync(cacheDir, filename) {
    return fs.existsSync(this.getPath(cacheDir, filename))
  }

  setSync(cacheDir, filename, data) {
    fs.outputFileSync(this.getPath(cacheDir, filename), JSON.stringify(data))
  }

  async readAll(cacheDir) {
    const filePath = path.join(this.basePath, cacheDir)
    const allFiles = await recursiveReadDir(filePath)
    return Promise.all(allFiles.map(file => fs.readJson(file)))
  }

  async read(cacheDir, filename, defaultValue) {
    const filePath = this.getPath(cacheDir, filename)
    try {
      return await fs.readJson(filePath)
    } catch (err) {
      console.error(err)
      if (err.code === 'ENOENT') {
        return defaultValue
      }
      throw err
    }
  }

  getPath(cacheDir, filename) {
    return path.join(this.basePath, cacheDir, filename)
  }
}
