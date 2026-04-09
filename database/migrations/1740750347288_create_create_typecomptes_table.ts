import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'type_comptes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom').notNullable().unique()
      table.integer('prix').notNullable()
      table.integer('nombre_ecran').notNullable()
      table.string('plateforme').notNullable()
      table.text('image').nullable()
      table.text('description').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}