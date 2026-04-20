import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'paniers';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('session_id', 255).notNullable().unique();
            table.integer('utilisateur_id').unsigned().nullable().references('id').inTable('utilisateurs').onDelete('SET NULL');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1743600000005_create_paniers_table.js.map