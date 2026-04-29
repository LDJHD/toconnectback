import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'panier_items';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('panier_id').unsigned().references('id').inTable('paniers').onDelete('CASCADE');
            table.integer('article_id').unsigned().nullable().references('id').inTable('articles').onDelete('CASCADE');
            table.integer('pack_id').unsigned().nullable().references('id').inTable('packs').onDelete('CASCADE');
            table.integer('quantite').defaultTo(1);
            table.decimal('prix_unitaire', 10, 2).notNullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1743600000008_create_panier_items_table.js.map