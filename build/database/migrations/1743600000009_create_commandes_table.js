import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'commandes';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('numero', 50).notNullable().unique();
            table.string('utilisateur_nom', 255).notNullable();
            table.string('utilisateur_email', 255).notNullable();
            table.string('utilisateur_telephone', 50).notNullable();
            table.decimal('montant_total', 10, 2).notNullable();
            table.enum('statut', ['en_attente', 'confirmee', 'en_preparation', 'livree', 'annulee']).defaultTo('en_attente');
            table.text('notes').nullable();
            table.text('adresse_livraison').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1743600000009_create_commandes_table.js.map