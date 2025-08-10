import { FastifyInstance } from 'fastify';
import OAuth2, { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    GoogleOAuth2: OAuth2Namespace;
  }
}

const CLIENT_ID = process.env.CLIENT_ID!;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET!;
const HOST = process.env.HOST!;
const PORT = process.env.PORT!;

const googleOAuth2Options = {
  name: 'googleOAuth2',
  credentials: {
    client: {
      id: CLIENT_ID,
      secret: GOOGLE_SECRET
    },
    auth: OAuth2.fastifyOauth2.GOOGLE_CONFIGURATION
  },
  // register a fastify url to start the redirect flow
  startRedirectPath: '/users/auth/google',
  // google redirect here after the user login
  callbackUri: `http://${HOST}:${PORT}/users/auth/google/callback`,
  scope: ['email', 'profile']
}

export function registerGoogleOAuth2Provider(app: FastifyInstance): void{
  app.register(OAuth2, googleOAuth2Options);
}