# Diseño — Envío real de mails con EmailJS

**Fecha:** 2026-06-21
**Rama:** reposicionamiento-pyme
**Estado:** aprobado para implementar

## Contexto y objetivo

El sitio es **static export** (`output: "export"`, sin backend). Hoy los dos
formularios arman un cuerpo de texto y hacen `window.location.href = mailto:...`,
es decir **abren el cliente de correo del visitante** en vez de enviar de verdad.
Eso pierde leads (mucha gente no tiene cliente de correo configurado) y se siente
poco profesional.

Objetivo: que los formularios **envíen el mail de verdad** al inbox del usuario,
manteniendo el sitio 100% estático. Solución elegida (sobre Resend): **EmailJS**,
client-side, sin backend — encaja con el export estático y el usuario ya lo
configuró. Free: 200 mails/mes (suficiente para los leads de una landing PyME).

## Decisiones (cerradas con el usuario)

| Decisión | Resultado |
|----------|-----------|
| Proveedor | **EmailJS** (client-side, sin backend) |
| Formularios a cablear | **Los dos**: `contact.tsx` e `iniciar-proyecto` (`project-brief.tsx`) |
| Config | Vars `NEXT_PUBLIC_EMAILJS_*` en `.env.local` (gitignored) + `.env.example` |
| Plantilla | **Una sola** compartida (variables `subject`, `from_name`, `reply_to`, `message`, `to_email`) |
| Footer | Email queda **mailto estándar**, pero tomado del constante central `lib/site.ts` |
| Fuente única del mail | Todo apunta a `EMAIL` de `lib/site.ts` |
| Anti-spam | Honeypot oculto + (manual) domain whitelist en el panel de EmailJS |
| Fallback | Si faltan claves o EmailJS falla → alternativas directas, sin dead-end |

## Arquitectura

### `lib/email.ts` (nuevo)

Envuelve `@emailjs/browser`. Lee la config de las vars públicas y expone:

```ts
export const emailConfigured: boolean; // true si están las 3 vars
export async function sendEmail(p: {
  subject: string;
  fromName: string;
  replyTo: string;
  message: string;   // cuerpo multilínea ya formateado (el mismo de hoy)
}): Promise<void>;     // resuelve si EmailJS responde OK, throw si falla
```

- IDs desde `process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
  `…_TEMPLATE_ID`, `…_PUBLIC_KEY` (se inyectan en el build).
- La Public Key es pública por diseño (viaja en el bundle igual) → no es un
  secreto "filtrado".
- Manda también `to_email: EMAIL` para que la plantilla pueda usar `{{to_email}}`
  o una dirección estática indistintamente.

### Plantilla en EmailJS (la configura el usuario)

Variables que el código envía: `{{subject}}`, `{{from_name}}`, `{{reply_to}}`,
`{{message}}`, `{{to_email}}`. El "To" de la plantilla = el mail del usuario
(estático o `{{to_email}}`). Reply-To = `{{reply_to}}` (el correo del visitante,
para responder directo).

## Flujo en cada formulario

```
submit
  ├─ honeypot lleno → fingir éxito (bot), no enviar
  ├─ armar subject + message (lógica de cuerpo actual, intacta)
  ├─ estado "sending" (botón deshabilitado, label "Enviando…")
  ├─ emailConfigured?
  │     sí → await sendEmail(...)
  │            éxito → SentModal + reset
  │            error → estado "error": alerta con WhatsApp + mailto directos
  │     no  → fallback mailto: (comportamiento actual) + SentModal
  └─ fin
```

- **Sin regresión:** mientras no existan las claves, el form sigue andando con
  `mailto:` como hoy. Al cargar `.env.local`, pasa a enviar de verdad.
- **Error visible y con salida:** si EmailJS falla, el usuario ve una alerta con
  WhatsApp y mail directos (no queda sin poder contactar).
- **Estado de envío:** botón deshabilitado + texto "Enviando…" para evitar doble
  submit.

## Copy (corrección de honestidad)

Hoy ambos forms dicen variantes de *"el formulario abre tu correo y los enviás
vos"* y `contact.tsx` afirma *"No guardamos tus datos en ningún servidor"*. Con
EmailJS eso deja de ser cierto. Cambios:

- Línea de pie de los dos forms → *"Tu mensaje nos llega directo. Te respondemos
  en menos de 24 h."*
- Panel de confianza de `contact.tsx`: reemplazar la afirmación de "no
  guardamos…/abre tu correo" por una veraz (mensaje directo, datos solo para
  responder, sin spam).
- Mensaje de `SentModal` → confirmación de envío real (no "abrimos tu correo").

## Centralización del mail ("todo apunta al mail")

Reemplazar el literal `aquilesdiaz335@gmail.com` por `EMAIL` de `lib/site.ts` en:
`contact.tsx`, `footer.tsx`, `exit-offer-modal.tsx`, `contact-drawer.tsx`
(`project-brief.tsx` ya lo importa). Los deep links de WhatsApp/teléfono quedan
fuera de alcance (la instrucción fue sobre el email).

## Cambios de archivos

| Archivo | Cambio |
|---------|--------|
| `lib/email.ts` | **Nuevo** — wrapper EmailJS + `sendEmail` + `emailConfigured`. |
| `.env.example` | **Nuevo** — plantilla de las 3 vars `NEXT_PUBLIC_EMAILJS_*`. |
| `components/sections/contact.tsx` | submit async, estados sending/error, honeypot, copy, `EMAIL` central. |
| `components/sections/project-brief.tsx` | ídem (sin honeypot duplicado de lógica: mismo patrón). |
| `components/sections/footer.tsx` | email mailto desde `EMAIL` central. |
| `components/ui/exit-offer-modal.tsx` | `EMAIL` central (mailto). |
| `components/ui/contact-drawer.tsx` | `EMAIL` central (mailto). |
| `package.json` | dep `@emailjs/browser`. |

## Pasos manuales del usuario (una vez)

1. EmailJS → conectar Gmail como *Email Service* (Service ID).
2. Crear *Template* con las variables de arriba y "To" = su mail (Template ID).
3. Copiar Service ID / Template ID / Public Key.
4. `cp .env.example .env.local` y pegar los 3 valores.

## Fuera de alcance

- reCAPTCHA (YAGNI; el honeypot + whitelist alcanzan para empezar).
- Migración a Resend / cambio de hosting.
- Centralizar WhatsApp/teléfono (solo se pidió el email).

## Criterios de aceptación

1. Con `.env.local` cargado, enviar cualquiera de los dos forms hace que llegue
   un mail al inbox del usuario (vía EmailJS), con reply-to = correo del visitante.
2. El botón se deshabilita y muestra "Enviando…" durante el envío.
3. Éxito → `SentModal` con copy de envío real. Error → alerta con WhatsApp + mail.
4. Sin `.env.local` (claves ausentes) el form cae a `mailto:` sin romperse.
5. Honeypot: un submit con el campo oculto lleno no dispara envío.
6. El email mostrado/usado en footer, drawer, exit-offer y contact sale de
   `lib/site.ts`.
7. Copy actualizado: ya no afirma "abre tu correo" ni "no guardamos datos".
8. `.env.local` queda gitignored; `.env.example` versionado.
9. `npx eslint .` limpio y `npm run build` (export estático) compila sin error.
