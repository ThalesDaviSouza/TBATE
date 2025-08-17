import { FastifyReply, FastifyRequest } from "fastify";
import { usersModule } from "../../users.module.js";

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply
) {  
  const userId = request.body as string;
  const app = request.server;
  
  const jwt = await usersModule.refreshTokenFacade.generateNewToken(app, reply, userId);
  
  return reply.send({
    success: true,
    message: "Novo token gerado!",
    token: jwt
  });
}