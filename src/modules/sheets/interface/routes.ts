import { FastifyInstance } from "fastify";
import { getSheetsController } from "./controllers/get-sheets.controller.js";

export async function sheetsRoutes(app: FastifyInstance){
  app.get('/', { preHandler: [ app.authenticate ]}, getSheetsController);
}
 