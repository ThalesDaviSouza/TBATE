import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function registerAuthenticate(app: FastifyInstance){
  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try{
      await request.jwtVerify();
    }
    catch{
      reply.status(401).send({ error: 'Not Authenticated' });
    }
  })
}