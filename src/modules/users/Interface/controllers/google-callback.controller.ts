import { FastifyReply, FastifyRequest } from "fastify";
import { getLoginUserFacade } from "../../users.module.js";
import { TokenADapterGoogle } from "../../Infra/adapter/tokenAdapter/TokenAdapterGoogle.js";

export async function googleCallbackController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  try {
    const loginUserFacade = getLoginUserFacade();

    const token = await TokenADapterGoogle.getOAth2Token(request);
    
    loginUserFacade.LoginUser(token);

    return reply.redirect(process.env.FRONT_URL!);
  } 
  catch (err) {
    console.error('Erro no callback do Google:', err);
    return reply.status(500).send({ error: 'Erro no login com Google' });
  }
}