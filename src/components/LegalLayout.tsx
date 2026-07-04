import Reveal from "@/components/Reveal";

export default function LegalLayout({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <div className="pt-28 pb-20 px-5">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight mb-2">{title}</h1>
          <p className="text-mist text-sm mb-12">Dernière mise à jour : {updated}</p>
        </Reveal>
        <div className="space-y-8">
          {sections.map((s, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <section>
                <h2 className="text-lg font-semibold mb-2">{s.h}</h2>
                <p className="text-mist text-sm leading-relaxed">{s.p}</p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
