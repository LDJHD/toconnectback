import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import SousCategory from '#models/sous_category'
import Article from '#models/article'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare slug: string

  @column()
  declare image: string | null

  @column()
  declare description: string | null

  @column()
  declare actif: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => SousCategory)
  declare sousCategories: HasMany<typeof SousCategory>

  @hasMany(() => Article)
  declare articles: HasMany<typeof Article>
}
