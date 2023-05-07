import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const port = process.env.PORT ?? '3000'

const environment = {
  port: parseInt(port, 10),
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: parseInt(process.env.DB_PORT ?? '5432', 10),
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
}

z.object({
  port: z.number(),
  dbHost: z.string(),
  dbPort: z.number(),
  dbUser: z.string().optional(),
  dbPass: z.string().optional(),
  dbName: z.string(),
}).parse(environment)

export default environment