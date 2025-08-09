import { OAuth2Token } from "@fastify/oauth2";
import { error } from "console";
import { FastifyRequest } from "fastify";

export abstract class ITokenAdapter {
  static async getOAth2Token(request: FastifyRequest) : Promise<OAuth2Token> {
    throw error("Deve implementar o metódo")
  }; 
}