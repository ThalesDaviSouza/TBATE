import fastify from 'fastify';

// Import Providers
import { registerCorsProvider } from '../providers/cors.js';
import { registerGoogleOAuth2Provider } from '../providers/auth/googleOAuth2.js';
import { registerTokenEssentials } from '../providers/auth/tokenEssentials.js';
import { registerAuthenticate } from '../providers/auth/authenticate.js';

// Import Routes
import { userRoutes } from '../../modules/users/Interface/routes.js';
import { setErrorHandler } from './errorHandler.js';

export async function createServer() {
    const app = fastify({ logger: true });

    registerCorsProvider(app);
    registerGoogleOAuth2Provider(app);
    registerTokenEssentials(app);
    registerAuthenticate(app);
    setErrorHandler(app);
    
    app.register(userRoutes, { prefix: '/users' });

    return app;
}