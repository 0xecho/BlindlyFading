import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const port = process.env.PORT ?? '3000'

const environment = {
  port: parseInt(port, 10),
}

z.object({
  port: z.number(),
}).parse(environment)

export default environment