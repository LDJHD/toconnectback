import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'notifications';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('message').notNullable();
            table.boolean('lue').defaultTo(false);
            table.boolean('tous').defaultTo(false);
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1740750448840_create_create_notifications_table.js.map