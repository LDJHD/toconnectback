import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'notifications';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('utilisateur_id')
                .unsigned()
                .references('id')
                .inTable('utilisateurs')
                .onDelete('CASCADE')
                .nullable();
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
            table.dropForeign(['utilisateur_id']);
            table.dropForeign(['admin_id']);
            table.dropColumn('utilisateur_id');
            table.dropColumn('admin_id');
        });
    }
}
//# sourceMappingURL=1740761410513_create_create_foreign_in_notifications_table.js.map