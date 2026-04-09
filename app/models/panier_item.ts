import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Panier from '#models/panier'
import Article from '#models/article'
import Pack from '#models/pack'

export default class PanierItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare panierId: number

  @column()
  declare articleId: number | null

  @column()
  declare packId: number | null

  @column()
  declare quantite: number

  @column()
  declare prixUnitaire: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Panier)
  declare panier: BelongsTo<typeof Panier>

  @belongsTo(() => Article)
  declare article: BelongsTo<typeof Article>

  @belongsTo(() => Pack)
  declare pack: BelongsTo<typeof Pack>
}
