import { mkdir, writeFile, readFile } from 'fs/promises'
import findCacheDirectory from 'find-cache-dir'
import { existsSync } from 'fs'
import path from 'path'

export const createCache = () => {
  const cacheDir = findCacheDirectory({ name: 'vercel-open' })

  if (cacheDir === undefined) {
    return {
      read: async () => {},
      write: async () => {}
    }
  }

  const cachePath = path.resolve(cacheDir, 'cache.json')

  const cacheFilePromise = (async () => {
    try {
      return JSON.parse(await readFile(cachePath, 'utf-8'))
    } catch (error) {
      return {}
    }
  })()

  return {
    read: () => cacheFilePromise,
    write: async (data: any) => {
      const cache = await cacheFilePromise
      const newData = { ...cache, ...data }
      if (!existsSync(cacheDir!)) {
        await mkdir(cacheDir!, { recursive: true })
      }
      await writeFile(cachePath, JSON.stringify(newData, null, 2), 'utf-8')
    }
  }
}
