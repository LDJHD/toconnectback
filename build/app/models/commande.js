var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import CommandeItem from '#models/commande_item';
export default class Commande extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Commande.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Commande.prototype, "numero", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Commande.prototype, "utilisateurNom", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Commande.prototype, "utilisateurEmail", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Commande.prototype, "utilisateurTelephone", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Commande.prototype, "utilisateurId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Commande.prototype, "montantTotal", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Commande.prototype, "reductionPourcentage", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Commande.prototype, "reductionMontant", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Commande.prototype, "montantFinal", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Commande.prototype, "pointsSnapshot", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Commande.prototype, "pointsPartieEntiereSnapshot", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Commande.prototype, "reductionUsesRestants", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Commande.prototype, "statutClientSnapshot", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Commande.prototype, "statut", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Commande.prototype, "notes", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Commande.prototype, "adresseLivraison", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Commande.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Commande.prototype, "updatedAt", void 0);
__decorate([
    hasMany(() => CommandeItem),
    __metadata("design:type", Object)
], Commande.prototype, "items", void 0);
//# sourceMappingURL=commande.js.map