import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'promo_codes';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('code', 100).notNullable().unique();
            table.decimal('points_value', 10, 2).notNullable().defaultTo(0.05);
            table.integer('generated_by_admin_id').unsigned().nullable().references('id').inTable('admins').onDelete('SET NULL');
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1760000000002_create_promo_codes_table.js.map