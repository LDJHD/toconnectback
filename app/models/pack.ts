import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Utilisateur from '#models/utilisateur'
import PackItem from '#models/pack_item'

export default class Pack extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare description: string | null

  @column()
  declare prixTotal: number

  @column()
  declare sessionId: string | null

  @column()
  declare utilisateurId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Utilisateur)
  declare utilisateur: BelongsTo<typeof Utilisateur>

  @hasMany(() => PackItem)
  declare items: HasMany<typeof PackItem>
}
