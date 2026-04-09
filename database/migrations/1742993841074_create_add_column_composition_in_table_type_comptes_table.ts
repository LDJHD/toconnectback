import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'type_comptes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Clé étrangère vers la table admins
      table.string('composition').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('composition') // Supprimer la colonne
    })
  }
}