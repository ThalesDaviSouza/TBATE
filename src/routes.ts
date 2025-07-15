import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";


export async function routes(fastify: FastifyInstance, option: FastifyPluginOptions){

  fastify.get('/test', async (res: FastifyRequest, rep: FastifyReply) => {
    return { ok: true }  
  })
  
}