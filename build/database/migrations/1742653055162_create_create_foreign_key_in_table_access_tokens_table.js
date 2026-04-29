import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'access_tokens';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('admin_id')
                .unsigned()
                .references('id')
                .inTable('admins')
                .onDelete('CASCADE')
                .nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['admin_id']);
            table.dropColumn('admin_id');
        });
    }
}
//# sourceMappingURL=1742653055162_create_create_foreign_key_in_table_access_tokens_table.js.map