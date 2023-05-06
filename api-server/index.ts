import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import cors from 'cors';

import { db } from './db';
import environment from './config/env';
import { publicProcedure, router } from './config/trpc';

const appRouter = router({
  userList: publicProcedure.query(
    async () => {
      const users = await db.users.list();
      return users;
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
        const user = await db.users.byId(input);
        return user;
      }),
  userCreate: publicProcedure.
    input(
      z.object({ name: z.string().nonempty('name must not be empty') })
    ).mutation(
      async (opts) => {
        const { input } = opts;
        const user = await db.users.create(input);
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

server.listen(
  environment.port
);

console.log(`Listening on port ${environment.port}`);

export type AppRouter = typeof appRouter;
