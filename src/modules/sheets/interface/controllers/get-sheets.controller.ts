import { FastifyReply, FastifyRequest } from "fastify";
import { getSheetsService, getTokenService } from "../../sheets.module.js";

export async function getSheetsController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  const sheetsService = getSheetsService();
  const tokenService = getTokenService();
  const userId = tokenService.getUserIdFromToken(request);

  const sheets = await sheetsService.getByUser(userId);

  return reply.send({
    sheets: sheets
  })
}