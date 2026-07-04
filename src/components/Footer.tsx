import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-20">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <span className="text-lg font-semibold tracking-tight">
              Trophy<span className="gold-text">Frames</span>
            </span>
            <p className="text-sm text-mist mt-4 max-w-xs leading-relaxed">
              Vos performances, immortalisées dans un cadre premium en édition
              unique. Conçu pour celles et ceux qui repoussent leurs limites.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-mist mb-4">
              Navigation
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/configurateur" className="text-pearl/80 hover:text-pearl">
                  Configurateur
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-pearl/80 hover:text-pearl">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-pearl/80 hover:text-pearl">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-mist mb-4">
              Légal
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/cgv" className="text-pearl/80 hover:text-pearl">
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-pearl/80 hover:text-pearl"
                >
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-pearl/80 hover:text-pearl"
                >
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-4 text-xs text-mist">
          <span>© {new Date().getFullYear()} TrophyFrames. Tous droits réservés.</span>
          <span>Livraison gratuite · Paiement sécurisé Stripe</span>
        </div>
      </div>
    </footer>
  );
}
