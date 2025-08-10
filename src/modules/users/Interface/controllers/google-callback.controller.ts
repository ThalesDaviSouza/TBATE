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
    loginUserFacade.SetCookie(reply, jwt);

    console.log('jwt', jwt)

    return reply.redirect(process.env.FRONT_URL!);
  } 
  catch (err) {
    console.error('Erro no callback do Google:', err);
    return reply.status(500).send({ error: 'Erro no login com Google' });
  }
}