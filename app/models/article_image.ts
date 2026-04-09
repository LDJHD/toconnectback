import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Article from '#models/article'

export default class ArticleImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare articleId: number

  @column()
  declare imageUrl: string

  @column()
  declare principal: boolean

  @column()
  declare ordre: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Article)
  declare article: BelongsTo<typeof Article>
}
