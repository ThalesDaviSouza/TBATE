import { FastifyInstance } from "fastify";
import { googleCallbackController } from "./controllers/google-callback.controller.js";

export async function userRoutes(app: FastifyInstance){
  app.get('/auth/google/callback', googleCallbackController)
}
 