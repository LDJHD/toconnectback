import { Env } from '@adonisjs/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

  PORT: Env.schema.number.optional(),
  HOST: Env.schema.string.optional({ format: 'host' }),

  APP_KEY: Env.schema.string.optional(),

  LOG_LEVEL: Env.schema.enum.optional([
    'fatal',
    'error',
    'warn',
    'info',
    'debug',
    'trace',
  ] as const),

  DB_HOST: Env.schema.string.optional({ format: 'host' }),
  DB_PORT: Env.schema.number.optional(),
  DB_USER: Env.schema.string.optional(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string.optional(),
})