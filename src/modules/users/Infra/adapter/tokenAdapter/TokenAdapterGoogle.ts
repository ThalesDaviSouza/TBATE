import { OAuth2Namespace, OAuth2Token } from "@fastify/oauth2";
import { FastifyRequest } from "fastify";
import { TokenAdapter } from "../TokenAdapter.js";

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export class TokenADapterGoogle extends TokenAdapter {
  
  static async getOAth2Token(request: FastifyRequest): Promise<OAuth2Token> {
    const fastify = request.server;
    return await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
  }

}