import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profils'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Clé étrangère vers la table comptes
      table
        .integer('compte_id')
        .unsigned()
        .references('id')
        .inTable('comptes') // Table comptes
        .onDelete('CASCADE') // Supprime les profils liés si le compte est supprimé
        .notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['compte_id']) // Supprimer la contrainte
      table.dropColumn('compte_id') // Supprimer la colonne
    })
  }
}
