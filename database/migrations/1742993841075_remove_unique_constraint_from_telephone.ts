import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'utilisateurs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Supprimer la contrainte unique sur le numéro de téléphone
      table.dropUnique(['telephone'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Restaurer la contrainte unique sur le numéro de téléphone
      table.unique(['telephone'])
    })
  }
} 