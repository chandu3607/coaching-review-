import { NextResponse } from "next/server";
import { INST } from "@/lib/coaching";

/**
 * Receives review submissions.
 * TODO: persist somewhere real — e.g. a database (Supabase/Postgres), a Google Sheet,
 * or an email via Resend/Nodemailer. For now it validates and logs to the server console.
 */
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const inst = String(b.inst ?? "");
  const valid = inst === "other" || INST.some((I) => I.id === inst);
  const overall = Number(b.overall);
  const text = `${b.best ?? ""} ${b.worse ?? ""}`.trim();

  if (!valid) return NextResponse.json({ error: "Unknown coaching." }, { status: 400 });
  if (!(overall >= 1 && overall <= 10)) return NextResponse.json({ error: "Overall rating must be 1–10." }, { status: 400 });
  if (text.length < 60 || text.length > 3100) return NextResponse.json({ error: "Review text must be at least 60 characters." }, { status: 400 });

  console.log("[review]", JSON.stringify({ ...b, at: new Date().toISOString() }));
  return NextResponse.json({ ok: true });
}
