import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'historique_abonnements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('utilisateur_id').unsigned().references('id').inTable('utilisateurs').onDelete('CASCADE')
      table.integer('compte_id').unsigned().references('id').inTable('comptes').onDelete('CASCADE')
      table.integer('profil_id').unsigned().references('id').inTable('profils').onDelete('CASCADE')
      table.integer('type_compte_id').unsigned().references('id').inTable('type_comptes').onDelete('CASCADE')
      table.dateTime('date_debut').notNullable()
      table.dateTime('date_fin').notNullable()
      table.boolean('inactif').defaultTo(false)
      table.boolean('fin').defaultTo(false)
      table.boolean('notification_preventive_envoyee').defaultTo(false)
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}