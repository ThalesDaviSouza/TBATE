import { FastifyInstance } from "fastify";
import jwt from '@fastify/jwt'

export function registerTokenEssentials(app: FastifyInstance){
  app.register(
    jwt, 
    { 
      secret: process.env.JWT_SECRET!,
      cookie: {
        cookieName: 'token',
        signed: false
      }
    }
  );
}