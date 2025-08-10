import fastify from 'fastify';

// Import Providers
import { registerCorsProvider } from '../providers/cors.js';
import { registerGoogleOAuth2Provider } from '../providers/auth/googleOAuth2.js';
import { userRoutes } from '../../modules/users/Interface/routes.js';
import { RegisterTokenEssentials } from '../providers/auth/tokenEssentials.js';


export async function createServer() {
    const app = fastify({ logger: true });

    registerCorsProvider(app);
    registerGoogleOAuth2Provider(app);
    RegisterTokenEssentials(app);
    
    app.register(userRoutes, { prefix: '/users' });

    return app;
}