import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Category from '#models/category'
import SousCategory from '#models/sous_category'
import ArticleImage from '#models/article_image'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare description: string | null

  @column()
  declare prix: number

  @column()
  declare prixPromo: number | null

  @column()
  declare categoryId: number

  @column()
  declare sousCategoryId: number | null

  @column()
  declare stock: number

  @column()
  declare actif: boolean

  @column()
  declare enVedette: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => SousCategory)
  declare sousCategory: BelongsTo<typeof SousCategory>

  @hasMany(() => ArticleImage)
  declare images: HasMany<typeof ArticleImage>
}
