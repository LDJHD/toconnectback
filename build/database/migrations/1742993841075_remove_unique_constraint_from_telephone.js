import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'utilisateurs';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropUnique(['telephone']);
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.unique(['telephone']);
        });
    }
}
//# sourceMappingURL=1742993841075_remove_unique_constraint_from_telephone.js.map