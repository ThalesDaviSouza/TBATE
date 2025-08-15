import { FastifyReply, FastifyRequest } from "fastify";
import { getRefreshTokenFacade } from "../../users.module.js";

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply
) {  
  const userId = request.body as string;
  const app = request.server;
  
  const refreshTokenFacade = getRefreshTokenFacade();
  const jwt = await refreshTokenFacade.generateNewToken(app, reply, userId);
  
  return reply.send({
    success: true,
    message: "Novo token gerado!",
    token: jwt
  });
}