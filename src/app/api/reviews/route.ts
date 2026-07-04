import { NextRequest, NextResponse } from "next/server";

// Placeholder review endpoint.
// In Lot 2, this will store reviews in a real database (Supabase) and moderate
// them before display. For now it accepts the submission without crashing so
// the front-end flow works. Nothing is persisted yet.
export async function POST(req: NextRequest) {
  try {
    const { name, text, stars } = await req.json();
    if (!name || !text) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }
    // TODO (Lot 2): insert into Supabase `reviews` table with status = "pending".
    console.log("Nouvel avis reçu (non persisté):", { name, stars });
    return NextResponse.json({ ok: true, stored: false });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function GET() {
  // TODO (Lot 2): return approved reviews from Supabase.
  return NextResponse.json({ reviews: [] });
}
