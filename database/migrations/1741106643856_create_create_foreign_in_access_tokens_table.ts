import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'access_tokens'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Clé étrangère vers la table utilisateurs
      table
        .integer('utilisateur_id')
        .unsigned()
        .references('id')
        .inTable('utilisateurs') // Table utilisateurs
        .onDelete('CASCADE') // Supprime les tokens si l'utilisateur est supprimé
        .nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['utilisateur_id']) // Supprimer la contrainte
      table.dropColumn('utilisateur_id') // Supprimer la colonne
    })
  }
}
