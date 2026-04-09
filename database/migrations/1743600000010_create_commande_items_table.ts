import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commande_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('commande_id').unsigned().references('id').inTable('commandes').onDelete('CASCADE')
      table.integer('article_id').unsigned().nullable().references('id').inTable('articles').onDelete('SET NULL')
      table.integer('pack_id').unsigned().nullable().references('id').inTable('packs').onDelete('SET NULL')
      table.string('nom_article', 255).notNullable()
      table.integer('quantite').defaultTo(1)
      table.decimal('prix_unitaire', 10, 2).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
