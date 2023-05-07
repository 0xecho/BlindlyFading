import { AppDataSource } from "./data-source";

export async function initializeDb () {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
}

export { AppDataSource } from "./data-source";