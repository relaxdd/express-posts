import path from 'path'
import express from 'express'
import { config } from 'dotenv'
import router from './routes/router'
import { __abs_path } from './defines'

const __public = path.resolve(__abs_path, 'public')

config({
  path: path.resolve(__abs_path, '.env.development'),
  debug: true
})

const PORT = process?.env?.['PORT']

function main() {
  const app = express()

  app.use(express.static(__public))
  app.use('/api', router)

  app.listen(PORT, () => {
    console.log(`[express]: Server is running at ${PORT} port`)
  })
}

try {
  main()
} catch (e) {
  console.log((e as Error).message)
  process.exit(0)
}
