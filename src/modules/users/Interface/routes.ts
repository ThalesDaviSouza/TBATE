import { FastifyInstance } from "fastify";
import { googleCallbackController } from "./controllers/google-callback.controller.js";
import { meController } from "./controllers/me.Controller.js";
import { refreshController } from "./controllers/refresh.Controller.js";

export async function userRoutes(app: FastifyInstance){
  app.get('/auth/google/callback', googleCallbackController);

  app.get('/me', { preHandler: [ app.authenticate ]}, meController);

  app.post('/refresh', {
    schema: {
      body: {
        type: 'string'
      }
    }  
  }, refreshController);
}
 