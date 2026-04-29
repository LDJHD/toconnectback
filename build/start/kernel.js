import '#start/cron';
import router from '@adonisjs/core/services/router';
import server from '@adonisjs/core/services/server';
server.errorHandler(() => import('#exceptions/handler'));
server.use([
    () => import('@adonisjs/static/static_middleware'),
    () => import('#middleware/container_bindings_middleware'),
    () => import('#middleware/force_json_response_middleware'),
    () => import('@adonisjs/cors/cors_middleware'),
    () => import('#middleware/static_middleware'),
]);
router.use([
    () => import('@adonisjs/core/bodyparser_middleware'),
]);
export const middleware = router.named({
    auth: () => import('#middleware/auth'),
    checktokenvalidity: () => import('#middleware/checktokenvalidity'),
});
//# sourceMappingURL=kernel.js.map