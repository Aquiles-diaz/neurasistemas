import emailjs from "@emailjs/browser";
import { EMAIL } from "@/lib/site";

/**
 * Envío de formularios sin backend (sitio static export) vía EmailJS.
 * Las 3 claves viajan en el bundle — son públicas por diseño. Aun así se leen
 * de variables NEXT_PUBLIC_* para no hardcodearlas y poder rotarlas.
 */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/** true cuando están cargadas las 3 variables (si no, los forms caen a mailto). */
export const emailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export type ContactPayload = {
  subject: string;
  fromName: string;
  replyTo: string;
  /** Cuerpo multilínea ya formateado (el mismo que se armaba para el mailto). */
  message: string;
};

/** Envía un mail vía EmailJS. Resuelve si la API responde OK; throw si falla. */
export async function sendEmail({
  subject,
  fromName,
  replyTo,
  message,
}: ContactPayload): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "EmailJS no está configurado (faltan variables NEXT_PUBLIC_EMAILJS_*)."
    );
  }
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      // Se envían alias comunes para que el template funcione sin importar qué
      // nombres de variable haya usado: {{subject}}/{{title}},
      // {{from_name}}/{{name}}, {{reply_to}}/{{email}}, {{message}}.
      subject,
      title: subject,
      from_name: fromName,
      name: fromName,
      reply_to: replyTo,
      email: replyTo,
      to_email: EMAIL,
      message,
    },
    { publicKey: PUBLIC_KEY }
  );
}
