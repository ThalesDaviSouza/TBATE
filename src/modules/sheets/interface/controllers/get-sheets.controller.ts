import { FastifyReply, FastifyRequest } from "fastify";
import { getGetSheetsFacade } from "../../sheets.module.js";

export async function getSheetsController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  const getSheetsFacade = getGetSheetsFacade();
  const sheets = await getSheetsFacade.getSheets(request);   

  return reply.send({
    sheets: sheets
  })
}