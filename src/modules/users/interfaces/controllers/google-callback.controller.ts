import { FastifyReply, FastifyRequest } from "fastify";
import { OAuth2Namespace } from "@fastify/oauth2";
import { getLoginUserFacade } from "../../users.module.js";

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export async function googleCallbackController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  try {
    const fastify = request.server;

    const loginUserFacade = getLoginUserFacade();

    const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)
    
    loginUserFacade.LoginUser(token);

    return reply.redirect('http://localhost:5173');
  } 
  catch (err) {
    console.error('Erro no callback do Google:', err);
    return reply.status(500).send({ error: 'Erro no login com Google' });
  }
}