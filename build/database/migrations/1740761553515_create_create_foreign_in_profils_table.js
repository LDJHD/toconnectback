import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'profils';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('compte_id')
                .unsigned()
                .references('id')
                .inTable('comptes')
                .onDelete('CASCADE')
                .notNullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['compte_id']);
            table.dropColumn('compte_id');
        });
    }
}
//# sourceMappingURL=1740761553515_create_create_foreign_in_profils_table.js.map