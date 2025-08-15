import { FastifyReply, FastifyRequest } from "fastify";
import { getLoginUserFacade, getTokenAdapter } from "../../users.module.js";

export async function googleCallbackController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  try {
    const loginUserFacade = getLoginUserFacade();

    const jwt = await loginUserFacade.LoginUser(request);
    loginUserFacade.SetAcessToken(reply, jwt);
    
    return reply.redirect(process.env.FRONT_URL! + process.env.SHEETS_PAGE!);
  } 
  catch (err) {
    request.server.log.error(err);
    throw new Error('Erro no callback do Google:');
  }
}