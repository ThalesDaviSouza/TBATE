import { FastifyReply, FastifyRequest } from "fastify";
import { usersModule } from "../../users.module.js";

export async function googleCallbackController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  try {
    const jwt = await usersModule.loginUserFacade.LoginUser(request);
    usersModule.loginUserFacade.SetAcessToken(reply, jwt);
    
    return reply.redirect(process.env.FRONT_URL! + process.env.SHEETS_PAGE!);
  } 
  catch (err) {
    request.server.log.error(err);
    throw new Error('Erro no callback do Google:');
  }
}