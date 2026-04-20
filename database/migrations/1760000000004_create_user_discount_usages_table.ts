import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_discount_usages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('utilisateur_id').unsigned().notNullable().references('id').inTable('utilisateurs').onDelete('CASCADE')
      table.integer('percentage_level').notNullable()
      table.integer('usage_count').notNullable().defaultTo(0)
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()

      table.unique(['utilisateur_id', 'percentage_level'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
