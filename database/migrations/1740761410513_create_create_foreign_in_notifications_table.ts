import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Clé étrangère vers la table utilisateurs
      table
        .integer('utilisateur_id')
        .unsigned()
        .references('id')
        .inTable('utilisateurs') // Table utilisateurs
        .onDelete('CASCADE') // Supprimer les notifications si l'utilisateur est supprimé
        .nullable()

      // Clé étrangère vers la table admins
      table
        .integer('admin_id')
        .unsigned()
        .references('id')
        .inTable('admins') // Table admins
        .onDelete('CASCADE') // Supprimer les notifications si l'admin est supprimé
        .nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['utilisateur_id'])
      table.dropForeign(['admin_id'])
      table.dropColumn('utilisateur_id')
      table.dropColumn('admin_id')
    })
  }
}
