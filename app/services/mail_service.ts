import nodemailer from 'nodemailer'
import env from '#start/env'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.get('GMAIL_USER'),
    pass: env.get('GMAIL_APP_PASSWORD')
  }
})

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: `"TO CONNECT" <${env.get('GMAIL_USER')}>`,
      to,
      subject,
      html
    })
    console.log('Email envoyé avec succès à:', to)
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    throw error
  }
}