import nodemailer from "nodemailer";
import { Resend } from "resend";

interface SendInterviewEmailParams {
  to: string;
  studentName: string;
  interviewDate: string;
  interviewTime: string;
  locationOrLink: string;
  notes?: string;
}

interface SendAcceptanceEmailParams {
  to: string;
  studentName: string;
  team?: string;
  welcomeMessage?: string;
  whatsappLink?: string;
}

// Transporteur SMTP réutilisable si variables définies
function getSmtpTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return null;
}

export async function sendInterviewInvitationEmail({
  to,
  studentName,
  interviewDate,
  interviewTime,
  locationOrLink,
  notes,
}: SendInterviewEmailParams): Promise<{ success: boolean; message: string; simulated?: boolean }> {
  const subject = "Robotics Club UPF — Convocation à votre entretien de sélection";

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>${subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9; margin: 0; padding: 24px; }
        .container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #0e7490, #1d4ed8); padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; color: #ffffff; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; color: #e0f2fe; font-size: 13px; }
        .content { padding: 32px 24px; color: #cbd5e1; font-size: 14px; line-height: 1.6; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 20px; margin: 24px 0; }
        .card-row { margin: 8px 0; font-size: 14px; }
        .card-label { color: #38bdf8; font-weight: bold; }
        .footer { padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ROBOTICS CLUB UPF</h1>
          <p>Université Privée de Fès • Recrutement Officiel</p>
        </div>
        <div class="content">
          <p>Bonjour <strong>${studentName}</strong>,</p>
          <p>Nous avons le plaisir de vous informer que votre candidature pour rejoindre le <strong>Robotics Club de l'Université Privée de Fès</strong> a été retenue pour la phase d'entretiens.</p>
          
          <div class="card">
            <div class="card-row"><span class="card-label">📅 Date :</span> ${interviewDate}</div>
            <div class="card-row"><span class="card-label">⏰ Heure :</span> ${interviewTime}</div>
            <div class="card-row"><span class="card-label">📍 Lieu / Lien :</span> ${locationOrLink}</div>
          </div>

          ${notes ? `<p><strong>Consignes particulières :</strong><br/>${notes}</p>` : ""}

          <p>Cet entretien de 15 à 20 minutes sera l'occasion d'échanger sur vos motivations, vos passions technologiques (mécanique, électronique, IA, embarqué) et votre engagement au sein du club.</p>

          <p>En cas d'empêchement majeur, veuillez nous répondre immédiatement par retour d'email.</p>

          <p style="margin-top: 24px;">À très bientôt,<br/><strong>Le Bureau du Robotics Club UPF</strong><br/>Université Privée de Fès</p>
        </div>
        <div class="footer">
          Robotics Club • Université Privée de Fès • Route d'Imouzzer, Fès
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.EMAIL_FROM || "Robotics Club UPF <onboarding@resend.dev>";
      await resend.emails.send({
        from: fromEmail,
        to: [to],
        subject,
        html,
      });
      return { success: true, message: `Email de convocation envoyé à ${to} via Resend !` };
    } catch (err: any) {
      console.error("Erreur Resend interview:", err);
    }
  }

  // 2. SMTP
  const smtp = getSmtpTransporter();
  if (smtp) {
    try {
      const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || "robotics.club@upf.ac.ma";
      await smtp.sendMail({
        from: `"Robotics Club UPF" <${fromEmail}>`,
        to,
        subject,
        html,
      });
      return { success: true, message: `Email de convocation envoyé à ${to} via SMTP !` };
    } catch (err: any) {
      console.error("Erreur SMTP interview:", err);
    }
  }

  // 3. Fallback / Mode test
  console.log(`[SIMULATION EMAIL CONVOCATION]
À : ${to}
Objet : ${subject}
Date : ${interviewDate} à ${interviewTime}
Lieu : ${locationOrLink}`);

  return {
    success: true,
    simulated: true,
    message: `Convocation enregistrée pour ${studentName}. (Email simulé : configurez SMTP ou RESEND_API_KEY dans .env.local pour l'envoi automatique direct).`,
  };
}

export async function sendAcceptanceEmail({
  to,
  studentName,
  team = "Systèmes Autonomes & Robotique",
  welcomeMessage,
  whatsappLink = "https://chat.whatsapp.com/RoboticsClubUPF",
}: SendAcceptanceEmailParams): Promise<{ success: boolean; message: string; simulated?: boolean }> {
  const subject = "🎉 Félicitations ! Bienvenue au Robotics Club de l'UPF";

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>${subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9; margin: 0; padding: 24px; }
        .container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #10b981, #06b6d4); padding: 36px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; color: #ffffff; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; color: #ecfdf5; font-size: 13px; }
        .content { padding: 32px 24px; color: #cbd5e1; font-size: 14px; line-height: 1.6; }
        .badge { display: inline-block; padding: 6px 14px; border-radius: 9999px; background: rgba(16, 185, 129, 0.2); color: #34d399; font-weight: bold; border: 1px solid rgba(16, 185, 129, 0.4); margin-bottom: 16px; font-size: 12px; }
        .button { display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 14px; margin: 20px 0; }
        .footer { padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 FÉLICITATIONS & BIENVENUE !</h1>
          <p>Robotics Club • Université Privée de Fès</p>
        </div>
        <div class="content">
          <div class="badge">ADMISSION VALIDÉE</div>
          <p>Bonjour <strong>${studentName}</strong>,</p>
          <p>Suite à votre entretien, nous avons l'immense plaisir de vous confirmer votre <strong>admission officielle au sein du Robotics Club de l'Université Privée de Fès</strong> !</p>
          
          <p>Votre motivation, votre vision et vos compétences font de vous un atout précieux pour notre communauté d'ingénieurs et de passionnés.</p>

          <p><strong>Cellule / Équipe assignée :</strong> ${team}</p>

          ${welcomeMessage ? `<p>${welcomeMessage}</p>` : ""}

          <p style="text-align: center;">
            <a href="${whatsappLink}" class="button">Rejoindre le Groupe Officiel du Club</a>
          </p>

          <p>Vous recevrez très prochainement les détails relatifs à la réunion d'intégration générale et au démarrage des projets techniques et compétitions.</p>

          <p style="margin-top: 24px;">Encore toutes nos félicitations et bienvenue dans l'aventure !<br/><strong>Le Bureau Exécutif du Robotics Club UPF</strong><br/>Université Privée de Fès</p>
        </div>
        <div class="footer">
          Robotics Club • Université Privée de Fès • Route d'Imouzzer, Fès
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.EMAIL_FROM || "Robotics Club UPF <onboarding@resend.dev>";
      await resend.emails.send({
        from: fromEmail,
        to: [to],
        subject,
        html,
      });
      return { success: true, message: `Email d'acceptation envoyé à ${to} via Resend !` };
    } catch (err: any) {
      console.error("Erreur Resend acceptance:", err);
    }
  }

  // 2. SMTP
  const smtp = getSmtpTransporter();
  if (smtp) {
    try {
      const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || "robotics.club@upf.ac.ma";
      await smtp.sendMail({
        from: `"Robotics Club UPF" <${fromEmail}>`,
        to,
        subject,
        html,
      });
      return { success: true, message: `Email d'acceptation envoyé à ${to} via SMTP !` };
    } catch (err: any) {
      console.error("Erreur SMTP acceptance:", err);
    }
  }

  // 3. Fallback
  console.log(`[SIMULATION EMAIL ACCEPTATION]
À : ${to}
Objet : ${subject}
Équipe : ${team}`);

  return {
    success: true,
    simulated: true,
    message: `Acceptation confirmée pour ${studentName} ! (Email consigné : configurez SMTP ou RESEND_API_KEY dans .env.local pour l'envoi automatique direct).`,
  };
}
