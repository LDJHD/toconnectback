import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Commande from '#models/commande'
import Article from '#models/article'
import Pack from '#models/pack'

export default class CommandeItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare commandeId: number

  @column()
  declare articleId: number | null

  @column()
  declare packId: number | null

  @column()
  declare nomArticle: string

  @column()
  declare quantite: number

  @column()
  declare prixUnitaire: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Commande)
  declare commande: BelongsTo<typeof Commande>

  @belongsTo(() => Article)
  declare article: BelongsTo<typeof Article>

  @belongsTo(() => Pack)
  declare pack: BelongsTo<typeof Pack>
}
