import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";

export async function POST(request: Request) {
  try {
    const { email, wantsFeedback } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.WAITLIST_TO_EMAIL;
    const from = process.env.WAITLIST_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json({ error: "Missing waitlist email configuration." }, { status: 500 });
    }

    const text = [
      "New early access request",
      `Email: ${email}`,
      `Wants feedback: ${wantsFeedback ? "Yes" : "No"}`
    ].join("\n");

    const payload = {
      from,
      to,
      subject: "Evident early access request",
      text
    };

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!resendResponse.ok) {
      return NextResponse.json({ error: "Unable to send email right now." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
