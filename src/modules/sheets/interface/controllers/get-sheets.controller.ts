import { FastifyReply, FastifyRequest } from "fastify";
import { sheetsModule } from "../../sheets.module.js";

export async function getSheetsController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  const sheets = await sheetsModule.getSheetsFacade.getSheets(request);   

  return reply.send({
    sheets: sheets
  })
}