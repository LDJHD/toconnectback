import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'abonnements';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('utilisateur_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('utilisateurs')
                .onDelete('CASCADE');
            table
                .integer('compte_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('comptes')
                .onDelete('CASCADE');
            table
                .integer('type_compte_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('type_comptes')
                .onDelete('CASCADE');
            table
                .integer('profil_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('profils')
                .onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['utilisateur_id']);
            table.dropForeign(['compte_id']);
            table.dropForeign(['type_compte_id']);
            table.dropForeign(['profil_id']);
            table.dropColumn('utilisateur_id');
            table.dropColumn('compte_id');
            table.dropColumn('type_compte_id');
            table.dropColumn('profil_id');
        });
    }
}
//# sourceMappingURL=1740760739273_create_create_foreign_in_abonnements_table.js.map