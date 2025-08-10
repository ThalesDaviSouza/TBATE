import { FastifyReply, FastifyRequest } from "fastify";
import { getRefreshTokenFacade } from "../../users.module.js";

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  //TODO: implementar lógica do refresh token
  console.log('REFRESH');
  
  const userId = request.body;
  console.log('user id contrller: ', userId);
  const app = request.server;

  const refreshTokenFacade = getRefreshTokenFacade();
  const canRefresh = refreshTokenFacade.verifyCanGenerateNewToken(userId as string, app);

}