import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'abonnements'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Clé étrangère vers la table utilisateurs
      table
        .integer('utilisateur_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('utilisateurs')
        .onDelete('CASCADE')

      // Clé étrangère vers la table comptes
      table
        .integer('compte_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('comptes')
        .onDelete('CASCADE')

      // Clé étrangère vers la table type_comptes
      table
        .integer('type_compte_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('type_comptes')
        .onDelete('CASCADE')

      // Clé étrangère vers la table profils
      table
        .integer('profil_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profils')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['utilisateur_id'])
      table.dropForeign(['compte_id'])
      table.dropForeign(['type_compte_id'])
      table.dropForeign(['profil_id'])
      table.dropColumn('utilisateur_id')
      table.dropColumn('compte_id')
      table.dropColumn('type_compte_id')
      table.dropColumn('profil_id')
    })
  }
}
