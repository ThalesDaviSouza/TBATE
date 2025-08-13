import { FastifyInstance } from "fastify";

export function setErrorHandler(app: FastifyInstance){
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);

    reply.status(error.statusCode ?? 500).send({
      success: false,
      message: error.message || "Erro interno no servidor"
    });
  });
}