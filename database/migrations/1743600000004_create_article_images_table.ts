import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'article_images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE')
      table.string('image_url', 255).notNullable()
      table.boolean('principal').defaultTo(false)
      table.integer('ordre').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
