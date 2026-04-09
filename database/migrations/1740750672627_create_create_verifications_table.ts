import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'verifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').notNullable()
      table.string('code').notNullable()
      table.boolean('utilise').defaultTo(false)
      table.timestamp('expire_a').notNullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}