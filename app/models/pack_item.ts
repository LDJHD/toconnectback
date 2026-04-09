import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Pack from '#models/pack'
import Article from '#models/article'

export default class PackItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare packId: number

  @column()
  declare articleId: number

  @column()
  declare quantite: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Pack)
  declare pack: BelongsTo<typeof Pack>

  @belongsTo(() => Article)
  declare article: BelongsTo<typeof Article>
}
