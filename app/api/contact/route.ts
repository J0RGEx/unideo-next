import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
    }
  );

  const data = await res.json();
  return data.success === true;
}

function buildEmailHtml(fields: {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  mensaje: string;
}): string {
  const { nombre, apellidos, email, telefono, mensaje } = fields;
  const ahora = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo mensaje de contacto — UNIDEO</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a3a6e 0%,#2563eb 100%);padding:36px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;color:#93c5fd;text-transform:uppercase;">Centro Universitario de Especialidades Odontológicas</p>
                    <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">UNIDEO</h1>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <div style="background:rgba(255,255,255,0.15);border-radius:50%;width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;">
                      <!-- Envelope icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0;font-size:15px;color:#bfdbfe;font-weight:500;">Nuevo mensaje de contacto desde el sitio web</p>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background:#eff6ff;border-left:4px solid #2563eb;padding:14px 40px;">
              <p style="margin:0;font-size:13px;color:#1d4ed8;font-weight:600;">
                📅 Recibido el ${ahora}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">

              <h2 style="margin:0 0 24px;font-size:16px;font-weight:700;color:#1e293b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e2e8f0;padding-bottom:10px;">
                Datos del solicitante
              </h2>

              <!-- Fields table -->
              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Nombre completo -->
                <tr>
                  <td style="padding:0 0 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;overflow:hidden;">
                      <tr>
                        <td style="background:#e0e7ff;padding:8px 16px;width:140px;vertical-align:middle;">
                          <p style="margin:0;font-size:10px;font-weight:700;color:#4338ca;text-transform:uppercase;letter-spacing:1px;">Nombre</p>
                        </td>
                        <td style="padding:12px 16px;vertical-align:middle;">
                          <p style="margin:0;font-size:15px;font-weight:600;color:#1e293b;">${nombre} ${apellidos}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding:0 0 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;overflow:hidden;">
                      <tr>
                        <td style="background:#dcfce7;padding:8px 16px;width:140px;vertical-align:middle;">
                          <p style="margin:0;font-size:10px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:1px;">Correo</p>
                        </td>
                        <td style="padding:12px 16px;vertical-align:middle;">
                          <a href="mailto:${email}" style="font-size:15px;font-weight:600;color:#2563eb;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Teléfono -->
                <tr>
                  <td style="padding:0 0 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;overflow:hidden;">
                      <tr>
                        <td style="background:#fef9c3;padding:8px 16px;width:140px;vertical-align:middle;">
                          <p style="margin:0;font-size:10px;font-weight:700;color:#a16207;text-transform:uppercase;letter-spacing:1px;">Teléfono</p>
                        </td>
                        <td style="padding:12px 16px;vertical-align:middle;">
                          <p style="margin:0;font-size:15px;font-weight:600;color:#1e293b;">${telefono || "—"}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Mensaje -->
              <h2 style="margin:0 0 14px;font-size:16px;font-weight:700;color:#1e293b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e2e8f0;padding-bottom:10px;">
                Mensaje
              </h2>
              <div style="background:#f8fafc;border-left:4px solid #2563eb;border-radius:0 10px 10px 0;padding:20px 22px;">
                <p style="margin:0;font-size:15px;color:#334155;line-height:1.75;white-space:pre-wrap;">${mensaje.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td>
                    <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#1a3a6e,#2563eb);color:#ffffff;font-size:14px;font-weight:700;padding:13px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
                      Responder a ${nombre}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#1a3a6e;">UNIDEO</p>
                    <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">
                      Av Guadalupe 4354-int.4, Camino Real, 45040 Zapopan, Jal.<br/>
                      +52 (33) 3122-9017 &nbsp;·&nbsp; gorthocenter@gmail.com
                    </p>
                  </td>
                  <td align="right" style="vertical-align:bottom;">
                    <p style="margin:0;font-size:10px;color:#cbd5e1;">Este mensaje fue generado automáticamente.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, apellidos, email, telefono, mensaje, turnstileToken } = body;

    // Validación básica
    if (!nombre || !apellidos || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    // Verificar Turnstile
    const turnstileOk = await verifyTurnstile(turnstileToken ?? "");
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Verificación de seguridad fallida. Inténtalo de nuevo." },
        { status: 400 }
      );
    }

    // Enviar correo con Resend
    const { error } = await resend.emails.send({
      from: "UNIDEO <contacto@resend.dev>",
      to: ["gorthocenter@gmail.com"],
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${nombre} ${apellidos}`,
      html: buildEmailHtml({ nombre, apellidos, email, telefono, mensaje }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el correo. Inténtalo más tarde." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
