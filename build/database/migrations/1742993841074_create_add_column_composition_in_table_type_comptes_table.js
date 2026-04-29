import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'type_comptes';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('composition').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('composition');
        });
    }
}
//# sourceMappingURL=1742993841074_create_add_column_composition_in_table_type_comptes_table.js.map