var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
export default class Verification extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Verification.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Verification.prototype, "email", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Verification.prototype, "code", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Verification.prototype, "utilise", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], Verification.prototype, "expireA", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Verification.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Verification.prototype, "updatedAt", void 0);
//# sourceMappingURL=verification.js.map