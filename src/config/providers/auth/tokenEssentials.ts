import { FastifyInstance } from "fastify";
import jwt from '@fastify/jwt'

export function RegisterTokenEssentials(app: FastifyInstance){
  app.register(jwt, { secret: process.env.JWT_SECRET! });
}