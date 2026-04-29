import { DateTime } from 'luxon';
import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';
export async function generatePdf(utilisateur, comptes, profils, abonnements) {
    const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
    if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
    }
    const comptesArray = Array.isArray(comptes) ? comptes : [comptes];
    const profilsArray = Array.isArray(profils) ? profils : [profils];
    const abonnementsArray = Array.isArray(abonnements) ? abonnements : [abonnements];
    const fileName = `abonnement_${utilisateur.id}_${DateTime.now().toFormat('yyyyMMddHHmmss')}.pdf`;
    const filePath = path.join(pdfDir, fileName);
    const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        info: {
            Title: 'Détails de l\'abonnement TOCONNECT',
            Author: 'TOCONNECT'
        }
    });
    doc.registerFont('Poppins', path.join(process.cwd(), 'public', 'fonts', 'Poppins-Regular.ttf'));
    doc.registerFont('Poppins-Bold', path.join(process.cwd(), 'public', 'fonts', 'Poppins-Bold.ttf'));
    doc.pipe(fs.createWriteStream(filePath));
    function drawRoundedRect(x, y, width, height, radius) {
        doc.moveTo(x + radius, y);
        doc.lineTo(x + width - radius, y);
        doc.quadraticCurveTo(x + width, y, x + width, y + radius);
        doc.lineTo(x + width, y + height - radius);
        doc.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        doc.lineTo(x + radius, y + height);
        doc.quadraticCurveTo(x, y + height, x, y + height - radius);
        doc.lineTo(x, y + radius);
        doc.quadraticCurveTo(x, y, x + radius, y);
    }
    function drawSeparator(y) {
        doc
            .moveTo(50, y)
            .lineTo(545, y)
            .strokeColor('#E5E7EB')
            .stroke();
    }
    const logoPath = path.join(process.cwd(), 'public', 'images', 'toconnect.png');
    if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 50, { width: 100 });
    }
    doc
        .font('Poppins-Bold')
        .fontSize(20)
        .fillColor('#707070')
        .text('Abonnement depuis votre site : ', 160, 50)
        .fontSize(16)
        .fillColor('#1F2937')
        .text('TO-CONNECT', 160, 70)
        .font('Poppins')
        .fontSize(12)
        .fillColor('#6B7280')
        .text(`Document généré le ${DateTime.now().toFormat('dd/MM/yyyy à HH:mm')}`, 160, 90)
        .moveDown(2);
    drawSeparator(140);
    doc
        .font('Poppins-Bold')
        .fontSize(16)
        .fillColor('#1F2937')
        .text('Informations personnelles', 50, 160)
        .font('Poppins')
        .fontSize(12)
        .fillColor('#374151')
        .text(`Nom: ${utilisateur.nom}`, 50, 190)
        .text(`Email: ${utilisateur.email}`, 50, 210)
        .text(`Téléphone: ${utilisateur.telephone}`, 50, 230)
        .moveDown();
    drawSeparator(250);
    let currentY = 280;
    const cardHeight = 180;
    const cardSpacing = 20;
    for (let i = 0; i < comptesArray.length; i++) {
        const compte = comptesArray[i];
        const profil = profilsArray[i];
        const abonnement = abonnementsArray[i];
        if (currentY + cardHeight > 700) {
            doc.addPage();
            currentY = 50;
        }
        doc.save();
        doc.fillColor('#F3F4F6');
        drawRoundedRect(50, currentY, 495, cardHeight, 10);
        doc.fill();
        doc.strokeColor('#E5E7EB');
        doc.stroke();
        doc.restore();
        doc
            .font('Poppins-Bold')
            .fontSize(18)
            .fillColor('#707070')
            .text(compte.plateforme, 70, currentY + 20);
        doc
            .font('Poppins')
            .fontSize(12)
            .fillColor('#374151')
            .text('Email du compte:', 70, currentY + 50)
            .font('Poppins-Bold')
            .text(compte.emailCompte, 200, currentY + 50)
            .font('Poppins')
            .text('Mot de passe:', 70, currentY + 70)
            .font('Poppins-Bold')
            .text(compte.motDePasse, 200, currentY + 70)
            .font('Poppins')
            .text('Profil:', 70, currentY + 90)
            .font('Poppins-Bold')
            .text(profil.nomProfil, 200, currentY + 90)
            .font('Poppins')
            .text('PIN:', 70, currentY + 110)
            .font('Poppins-Bold')
            .text(profil.pin, 200, currentY + 110);
        doc
            .font('Poppins')
            .fontSize(11)
            .fillColor('#6B7280')
            .text('Période d\'abonnement:', 70, currentY + 140)
            .text(`${abonnement.dateDebut.toFormat('dd/MM/yyyy')} - ${abonnement.dateFin.toFormat('dd/MM/yyyy')}`, 200, currentY + 140);
        currentY += cardHeight + cardSpacing;
    }
    if (currentY > 700) {
        doc.addPage();
    }
    const footerY = 725;
    doc
        .font('Poppins')
        .fontSize(10)
        .fillColor('#6B7280')
        .text('TOCONNECT - Votre partenaire de confiance.Pour toute assistance, contactez notre service client au contacttoconnect01@gmail.com', 50, footerY, { align: 'left' })
        .text('Merci de votre confiance !', 50, footerY + 25, { align: 'left' })
        .font('Poppins-Bold')
        .fillColor('#1E40AF');
    doc.end();
    return `/pdfs/${fileName}`;
}
export async function sendEmail(email, sujet, contenuHtml) {
    console.log(`Envoi d'email à ${email}`);
    console.log(`Sujet: ${sujet}`);
    console.log(`Contenu: ${contenuHtml}`);
    return true;
}
export async function sendSms(telephone, compte, profil) {
    console.log(`Envoi de SMS à ${telephone}`);
    console.log(`Compte: ${compte.emailCompte}`);
    console.log(`Profil: ${profil.nomProfil}`);
    console.log(`PIN: ${profil.pin}`);
    return true;
}
//# sourceMappingURL=helpers.js.map