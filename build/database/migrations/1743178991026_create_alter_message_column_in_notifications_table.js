import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'notifications';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.text('message').alter();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('message').alter();
        });
    }
}
//# sourceMappingURL=1743178991026_create_alter_message_column_in_notifications_table.js.map