import { z } from 'zod';

import { EnvironmentVariables } from './types';

const environment: EnvironmentVariables = {
  trpcUrl: import.meta.env.VITE_TRPC_API_URL
}

z.object({ trpcUrl: z.string().url("must be a valid url") }).parse(environment); // TODO: if missing, track and report

export default environment;