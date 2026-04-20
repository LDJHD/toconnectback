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
  declare utilisateurId: number | null

  @column()
  declare montantTotal: number

  @column()
  declare reductionPourcentage: number

  @column()
  declare reductionMontant: number

  @column()
  declare montantFinal: number

  @column()
  declare pointsSnapshot: number

  @column()
  declare pointsPartieEntiereSnapshot: number

  @column()
  declare reductionUsesRestants: number

  @column()
  declare statutClientSnapshot: string

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
