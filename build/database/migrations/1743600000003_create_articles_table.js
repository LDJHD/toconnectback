import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'articles';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('nom', 255).notNullable();
            table.text('description').nullable();
            table.decimal('prix', 10, 2).notNullable();
            table.decimal('prix_promo', 10, 2).nullable();
            table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
            table.integer('sous_category_id').unsigned().nullable().references('id').inTable('sous_categories').onDelete('SET NULL');
            table.integer('stock').defaultTo(0);
            table.boolean('actif').defaultTo(true);
            table.boolean('en_vedette').defaultTo(false);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1743600000003_create_articles_table.js.map