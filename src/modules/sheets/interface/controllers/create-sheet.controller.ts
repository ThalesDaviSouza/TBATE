import { FastifyReply, FastifyRequest } from "fastify";
import { getCreateSheetFacade } from "../../sheets.module.js";

export async function createSheetController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  const characterName = request.body as string;
  const createSheetFacade = getCreateSheetFacade();
  await createSheetFacade.createSheet(
    request, 
    characterName
  );
  return reply
    .code(201)
    .send(true)
}