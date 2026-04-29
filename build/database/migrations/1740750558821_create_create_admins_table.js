import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'admins';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('email').unique().notNullable();
            table.string('mot_de_passe').notNullable();
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1740750558821_create_create_admins_table.js.map