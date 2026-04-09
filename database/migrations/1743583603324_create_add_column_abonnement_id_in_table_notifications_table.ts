import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Clé étrangère vers la table utilisateurs
      table
        .integer('abonnement_id')
        .unsigned()
        .references('id')
        .inTable('abonnements') // Table utilisateurs
        .onDelete('CASCADE') // Supprimer les notifications si l'utilisateur est supprimé
        .nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['abonnement_id'])
      table.dropColumn('abonnement_id')
    })
  }
}