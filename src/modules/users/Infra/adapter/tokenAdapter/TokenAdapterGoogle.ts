import { OAuth2Namespace, OAuth2Token } from "@fastify/oauth2";
import { ITokenAdapter } from "../ITokenAdapter.js";
import { FastifyRequest } from "fastify";

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export class TokenADapterGoogle extends ITokenAdapter {
  
  static async getOAth2Token(request: FastifyRequest): Promise<OAuth2Token> {
    const fastify = request.server;
    return await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
  }

}