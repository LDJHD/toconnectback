import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'pack_items';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('pack_id').unsigned().references('id').inTable('packs').onDelete('CASCADE');
            table.integer('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE');
            table.integer('quantite').defaultTo(1);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1743600000007_create_pack_items_table.js.map