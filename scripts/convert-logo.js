const sharp = require('sharp')
const path = require('path')

const svgPath = path.join(process.cwd(), 'public', 'images', 'logo.svg')
const pngPath = path.join(process.cwd(), 'public', 'images', 'logo.png')

sharp(svgPath)
  .resize(200, 60, {
    fit: 'contain',
    background: { r: 37, g: 99, b: 235, alpha: 1 }
  })
  .png()
  .toFile(pngPath)
  .then(() => console.log('Logo converti avec succès !'))
  .catch(err => console.error('Erreur lors de la conversion du logo:', err)) 