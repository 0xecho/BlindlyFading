import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import cors from 'cors';

import "reflect-metadata"
import { initializeDb, AppDataSource } from './app/db';
import { User } from './app/models/User';
import environment from './config/env';
import { publicProcedure, router } from './config/trpc';

const appRouter = router({
  userList: publicProcedure.query(
    async () => {
      // TODO: Properly organize logic and db methods
      const userRepository = AppDataSource.getRepository(User);
      const userList = await userRepository.find();
      return userList;
    }
  ),
  userById: publicProcedure.
    input(
      z.string().
        nonempty('id must not be empty')
    ).
    query(
      async (opts) => {
        const { input } = opts;
        const userRepository = AppDataSource.getRepository(User);
        try {

          const user = await userRepository.findOneOrFail(
            {
              where: { id: input }
            }
          );
          return user;
        } catch (e) {
          throw new Error(`Could not find user with id ${input} -> ${e instanceof Error ? e.message : e}`);
        }
      }),
  userCreate: publicProcedure.
    input(
      z.object({ name: z.string().nonempty('name must not be empty') })
    ).mutation(
      async (opts) => {
        const { input } = opts;
        const userRepository = AppDataSource.getRepository(User);
        const user = new User();
        user.name = input.name;
        await userRepository.save(user);
        return user;
      }
    )
});

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(
    // TODO: Configure based on env
  )
});

initializeDb().then(
  () => {
    server.listen(
      environment.port
    )

    console.log(`Listening on port ${environment.port}`);
  }
);



export type AppRouter = typeof appRouter;
