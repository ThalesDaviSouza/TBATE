import { FastifyReply, FastifyRequest } from "fastify";
import { OAuth2Namespace } from "@fastify/oauth2";

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export async function googleCallbackController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fastify = request.server;
  
    const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    console.log(token.token.access_token)

    // Pega os dados do usuário a partir do token
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${token.token.access_token}`,
      },
    }).then((res) => res.json());

    console.log('User info: ', userInfo)

    return reply.redirect('http://localhost:5173');

  } 
  catch (err) {
    console.error('Erro no callback do Google:', err);
    return reply.status(500).send({ error: 'Erro no login com Google' });
  }
}