/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { createApp } from './app/app';

const app = createApp();

const port = process.env.NX_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
