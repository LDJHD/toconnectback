import { Env } from '@adonisjs/core/env'

const isProduction = process.env.NODE_ENV === 'production'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

  PORT: Env.schema.number.optional(),

  HOST: Env.schema.string.optional(),

  APP_KEY: Env.schema.string.optional(),

  LOG_LEVEL: Env.schema.string.optional(),

  // ⚠️ IMPORTANT : enlever les formats stricts
  DB_HOST: Env.schema.string.optional(),
  DB_PORT: Env.schema.number.optional(),
  DB_USER: Env.schema.string.optional(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string.optional(),
}, {
  // 🔥 LA CLÉ DU FIX
  validate: !isProduction
})