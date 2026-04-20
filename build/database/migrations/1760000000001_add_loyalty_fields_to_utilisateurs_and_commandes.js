import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        this.schema.alterTable('utilisateurs', (table) => {
            table.decimal('points', 10, 2).notNullable().defaultTo(0);
            table.string('statut').notNullable().defaultTo('normal');
        });
        this.schema.alterTable('commandes', (table) => {
            table.integer('utilisateur_id').unsigned().nullable().references('id').inTable('utilisateurs').onDelete('SET NULL');
            table.integer('reduction_pourcentage').notNullable().defaultTo(0);
            table.decimal('reduction_montant', 14, 2).notNullable().defaultTo(0);
            table.decimal('montant_final', 14, 2).notNullable().defaultTo(0);
            table.decimal('points_snapshot', 10, 2).notNullable().defaultTo(0);
            table.integer('points_partie_entiere_snapshot').notNullable().defaultTo(0);
            table.integer('reduction_uses_restants').notNullable().defaultTo(5);
            table.string('statut_client_snapshot').notNullable().defaultTo('normal');
        });
    }
    async down() {
        this.schema.alterTable('commandes', (table) => {
            table.dropForeign(['utilisateur_id']);
            table.dropColumn('utilisateur_id');
            table.dropColumn('reduction_pourcentage');
            table.dropColumn('reduction_montant');
            table.dropColumn('montant_final');
            table.dropColumn('points_snapshot');
            table.dropColumn('points_partie_entiere_snapshot');
            table.dropColumn('reduction_uses_restants');
            table.dropColumn('statut_client_snapshot');
        });
        this.schema.alterTable('utilisateurs', (table) => {
            table.dropColumn('points');
            table.dropColumn('statut');
        });
    }
}
//# sourceMappingURL=1760000000001_add_loyalty_fields_to_utilisateurs_and_commandes.js.map