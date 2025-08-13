import 'dotenv/config';
import { createServer } from "./config/core/createServer.js";

async function startServer() {
  let server = await createServer();

  await server.listen({
    port: parseInt(process.env.PORT!),
    host: process.env.HOST!
  }, 
  (err) => {
    if(err)
      server.log.error(err);
  });

  server.log.info(`App is running on http://${process.env.HOST}:${process.env.PORT}`);

}

(async () => {
  await startServer();
})();
