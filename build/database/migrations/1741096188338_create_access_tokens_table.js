import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'access_tokens';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('token', 255).notNullable().unique();
            table.string('type').notNullable();
            table.timestamp('expires_at').nullable();
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1741096188338_create_access_tokens_table.js.map