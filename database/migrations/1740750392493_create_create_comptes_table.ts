import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comptes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email_compte').unique().notNullable()
      table.string('mot_de_passe').notNullable()
      table.string('plateforme').notNullable()
      table.integer('nb_utilisateurs').defaultTo(0)
      table.date('date_expiration').notNullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}