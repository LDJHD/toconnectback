var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import Utilisateur from '#models/utilisateur';
export default class AccessToken extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], AccessToken.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AccessToken.prototype, "utilisateur_id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AccessToken.prototype, "admin_id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AccessToken.prototype, "token", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AccessToken.prototype, "type", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], AccessToken.prototype, "expires_at", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], AccessToken.prototype, "created_at", void 0);
__decorate([
    column.dateTime({ autoUpdate: true }),
    __metadata("design:type", DateTime)
], AccessToken.prototype, "updated_at", void 0);
__decorate([
    belongsTo(() => Utilisateur),
    __metadata("design:type", Object)
], AccessToken.prototype, "utilisateur", void 0);
//# sourceMappingURL=access_token.js.map