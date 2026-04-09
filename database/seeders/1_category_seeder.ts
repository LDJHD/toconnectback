import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'

export default class CategorySeeder extends BaseSeeder {
  async run() {
    await Category.updateOrCreateMany('slug', [
      {
        nom: 'Supermarché',
        slug: 'supermarche',
        description: 'Produits de supermarché, courses du quotidien et plus encore.',
        actif: true,
      },
      {
        nom: 'Vêtement',
        slug: 'vetement',
        description: 'Vêtements tendance pour homme, femme et enfant.',
        actif: true,
      },
      {
        nom: 'Chaussure',
        slug: 'chaussure',
        description: 'Chaussures de qualité pour toutes les occasions.',
        actif: true,
      },
      {
        nom: 'Accessoire',
        slug: 'accessoire',
        description: 'Montres, bijoux, sacs et accessoires de mode.',
        actif: true,
      },
      {
        nom: 'Alimentation',
        slug: 'alimentation',
        description: 'Produits alimentaires frais et de qualité. Composez votre pack !',
        actif: true,
      },
      {
        nom: 'Restauration',
        slug: 'restauration',
        description: 'Plats préparés, repas et spécialités culinaires.',
        actif: true,
      },
      {
        nom: 'Cosmétique',
        slug: 'cosmetique',
        description: 'Produits de beauté, soins et cosmétiques.',
        actif: true,
      },
      {
        nom: 'Appartement',
        slug: 'appartement',
        description: 'Appartements et locations immobilières.',
        actif: true,
      },
    ])
  }
}
