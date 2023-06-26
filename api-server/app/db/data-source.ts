import { DataSource } from "typeorm"

import environment from "../../config/env"
import { User } from "../models/User"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: environment.dbHost,
  port: environment.dbPort,
  username: environment.dbUser,
  password: environment.dbPass,
  database: environment.dbName,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
})
