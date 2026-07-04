import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// GET: returns approved reviews (most recent first).
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ reviews: [] });

  const { data, error } = await supabase
    .from("reviews")
    .select("name, text, stars, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Supabase GET reviews:", error.message);
    return NextResponse.json({ reviews: [] });
  }
  return NextResponse.json({ reviews: data || [] });
}

// POST: submits a new review (stored with approved = false, awaiting moderation).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim().slice(0, 60);
    const text = String(body.text || "").trim().slice(0, 500);
    const stars = Math.min(5, Math.max(1, parseInt(body.stars, 10) || 5));

    if (!name || !text) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      // Not configured — accept without storing so the UI doesn't break.
      return NextResponse.json({ ok: true, stored: false });
    }

    const { error } = await supabase
      .from("reviews")
      .insert({ name, text, stars, approved: false });

    if (error) {
      console.error("Supabase INSERT review:", error.message);
      return NextResponse.json(
        { error: "Impossible d'enregistrer l'avis." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
