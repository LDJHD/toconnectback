import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'packs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom', 255).notNullable()
      table.text('description').nullable()
      table.decimal('prix_total', 10, 2).defaultTo(0)
      table.string('session_id', 255).nullable()
      table.integer('utilisateur_id').unsigned().nullable().references('id').inTable('utilisateurs').onDelete('SET NULL')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
