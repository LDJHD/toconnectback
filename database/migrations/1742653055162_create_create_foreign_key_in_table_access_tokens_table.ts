import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'access_tokens'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Clé étrangère vers la table admins
      table
        .integer('admin_id')
        .unsigned()
        .references('id')
        .inTable('admins') // Table admins
        .onDelete('CASCADE') // Action lors de la suppression de l'admin
        .nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['admin_id']) // Supprimer la contrainte de clé étrangère
      table.dropColumn('admin_id') // Supprimer la colonne
    })
  }
}
