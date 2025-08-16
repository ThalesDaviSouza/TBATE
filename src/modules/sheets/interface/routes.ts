import { FastifyInstance } from "fastify";
import { getSheetsController } from "./controllers/get-sheets.controller.js";
import { createSheetController } from "./controllers/create-sheet.controller.js";

export async function sheetsRoutes(app: FastifyInstance){
  app.get('/', { preHandler: [ app.authenticate ]}, getSheetsController);
  app.post('/', { 
    preHandler: [ app.authenticate ],
    schema: {
      body: {
        type: 'string'
      }
    }
  }, createSheetController);
}
 