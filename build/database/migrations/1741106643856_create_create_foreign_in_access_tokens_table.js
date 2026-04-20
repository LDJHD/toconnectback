import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'access_tokens';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('utilisateur_id')
                .unsigned()
                .references('id')
                .inTable('utilisateurs')
                .onDelete('CASCADE')
                .nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['utilisateur_id']);
            table.dropColumn('utilisateur_id');
        });
    }
}
//# sourceMappingURL=1741106643856_create_create_foreign_in_access_tokens_table.js.map