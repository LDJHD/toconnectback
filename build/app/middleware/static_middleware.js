import { join } from 'path';
import { createReadStream, statSync } from 'fs';
import { lookup } from 'mime-types';
export default class StaticMiddleware {
    async handle({ request, response }, next) {
        if (request.method() !== 'GET') {
            return next();
        }
        if (!request.url().startsWith('/pdfs/')) {
            return next();
        }
        try {
            const filePath = join(process.cwd(), 'public', request.url());
            try {
                const stats = statSync(filePath);
                if (!stats.isFile()) {
                    return next();
                }
            }
            catch (error) {
                return next();
            }
            const mimeType = lookup(filePath) || 'application/octet-stream';
            response.header('Content-Type', mimeType);
            return response.stream(createReadStream(filePath));
        }
        catch (error) {
            console.error('Erreur lors de la lecture du fichier:', error);
            return next();
        }
    }
}
//# sourceMappingURL=static_middleware.js.map