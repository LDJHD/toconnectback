import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'abonnements';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.boolean('inactif');
            table.boolean('fin');
            table.date('date_debut').notNullable();
            table.date('date_fin').notNullable();
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1740750499069_create_create_abonnements_table.js.map