import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import CommandeItem from '#models/commande_item'

export default class Commande extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero: string

  @column()
  declare utilisateurNom: string

  @column()
  declare utilisateurEmail: string

  @column()
  declare utilisateurTelephone: string

  @column()
  declare montantTotal: number

  @column()
  declare statut: 'en_attente' | 'confirmee' | 'en_preparation' | 'livree' | 'annulee'

  @column()
  declare notes: string | null

  @column()
  declare adresseLivraison: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => CommandeItem)
  declare items: HasMany<typeof CommandeItem>
}
