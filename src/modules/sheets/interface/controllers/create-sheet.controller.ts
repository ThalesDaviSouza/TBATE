import { FastifyReply, FastifyRequest } from "fastify";
import { sheetsModule } from "../../sheets.module.js";

export async function createSheetController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  const characterName = request.body as string;
  await sheetsModule.createSheetFacade.createSheet(
    request, 
    characterName
  );
  return reply
    .code(201)
    .send(true)
}