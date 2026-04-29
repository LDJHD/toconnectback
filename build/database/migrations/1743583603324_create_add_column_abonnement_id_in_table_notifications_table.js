import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'notifications';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('abonnement_id')
                .unsigned()
                .references('id')
                .inTable('abonnements')
                .onDelete('CASCADE')
                .nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['abonnement_id']);
            table.dropColumn('abonnement_id');
        });
    }
}
//# sourceMappingURL=1743583603324_create_add_column_abonnement_id_in_table_notifications_table.js.map