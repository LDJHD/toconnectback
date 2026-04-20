var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import Category from '#models/category';
import SousCategory from '#models/sous_category';
import ArticleImage from '#models/article_image';
export default class Article extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Article.prototype, "nom", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Article.prototype, "prix", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "prixPromo", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Article.prototype, "categoryId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "sousCategoryId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Article.prototype, "stock", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Article.prototype, "actif", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Article.prototype, "enVedette", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Article.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Article.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Category),
    __metadata("design:type", Object)
], Article.prototype, "category", void 0);
__decorate([
    belongsTo(() => SousCategory),
    __metadata("design:type", Object)
], Article.prototype, "sousCategory", void 0);
__decorate([
    hasMany(() => ArticleImage),
    __metadata("design:type", Object)
], Article.prototype, "images", void 0);
//# sourceMappingURL=article.js.map