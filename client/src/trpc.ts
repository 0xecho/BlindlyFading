import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "api-server";

import environment from "./config/env";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: environment.trpcUrl
    }),
  ]
});

export default trpc;