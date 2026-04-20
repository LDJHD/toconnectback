var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import Compte from '#models/compte';
import Utilisateur from '#models/utilisateur';
import TypeCompte from '#models/type_compte';
import Profil from '#models/profil';
export default class Abonnement extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Abonnement.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Abonnement.prototype, "utilisateurId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Abonnement.prototype, "compteId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Abonnement.prototype, "typeCompteId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Abonnement.prototype, "profilId", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], Abonnement.prototype, "dateDebut", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], Abonnement.prototype, "dateFin", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Abonnement.prototype, "inactif", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Abonnement.prototype, "fin", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Abonnement.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Abonnement.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Compte),
    __metadata("design:type", Object)
], Abonnement.prototype, "compte", void 0);
__decorate([
    belongsTo(() => Utilisateur),
    __metadata("design:type", Object)
], Abonnement.prototype, "utilisateur", void 0);
__decorate([
    belongsTo(() => TypeCompte),
    __metadata("design:type", Object)
], Abonnement.prototype, "typecompte", void 0);
__decorate([
    belongsTo(() => Profil),
    __metadata("design:type", Object)
], Abonnement.prototype, "profil", void 0);
//# sourceMappingURL=abonnement.js.map