import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'promo_code_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('promo_code_id').unsigned().nullable().references('id').inTable('promo_codes').onDelete('SET NULL')
      table.string('code', 100).notNullable()
      table.string('action', 30).notNullable()
      table.integer('admin_id').unsigned().nullable().references('id').inTable('admins').onDelete('SET NULL')
      table.integer('utilisateur_id').unsigned().nullable().references('id').inTable('utilisateurs').onDelete('SET NULL')
      table.decimal('points_before', 10, 2).nullable()
      table.decimal('points_added', 10, 2).nullable()
      table.decimal('points_after', 10, 2).nullable()
      table.text('meta').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
