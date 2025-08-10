import { FastifyReply, FastifyRequest } from "fastify";

export async function meController(
  request: FastifyRequest,
  reply: FastifyReply
) 
{
  return {
    user: request.user
  }
}