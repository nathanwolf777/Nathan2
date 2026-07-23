import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs manquants." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.ORDER_EMAIL_TO || "trophyframespro@gmail.com";

    // If email isn't configured, don't crash — just log and accept.
    if (!apiKey || !to) {
      console.log("Contact reçu mais email non configuré:", { name, email });
      return NextResponse.json({ ok: true, delivered: false });
    }

    const safe = (s: string) =>
      String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
        <h2 style="color:#c9a24b">Nouveau message — TrophyFrames</h2>
        <p><strong>Nom :</strong> ${safe(name)}</p>
        <p><strong>Email :</strong> ${safe(email)}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${safe(
          message
        )}</p>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "TrophyFrames <onboarding@resend.dev>",
        to: [to],
        replyTo: email,
        subject: `✉️ Message de ${name} — TrophyFrames`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend contact erreur:", detail);
      return NextResponse.json(
        { error: "Envoi impossible pour le moment.", detail },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("Contact erreur:", e);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
