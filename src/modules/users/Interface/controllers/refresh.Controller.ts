import { FastifyReply, FastifyRequest } from "fastify";
import { getRefreshTokenFacade } from "../../users.module.js";

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply
) {  
  const userId = request.body as string;
  const app = request.server;

  const refreshTokenFacade = getRefreshTokenFacade();
  refreshTokenFacade.generateNewToken(app, reply, userId);

  return { message: 'Access token refreshed' }
}