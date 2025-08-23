export const metadata = {
  title: "Impressum – CallMeSports",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Impressum</h1>

        <p className="mb-2">Angaben gemäß § 5 TMG</p>

        <p className="mb-4">
          <strong>CallMeSports</strong><br />
          Operativ geleitet durch die GENACO UG<br />
          in Unterstützung der GNC Georg Nauerz Consulting GmbH<br />
          Kinderlehre 14<br />
          Deutschland
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Kontakt</h2>
        <p className="mb-4">
          E-Mail: <a href="mailto:info@callmesports.com" className="text-blue-600 underline">info@callmesports.com</a>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Vertretungsberechtigt</h2>
        <p className="mb-4">
          Geschäftsführer: Georg Nauerz
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Haftungsausschluss</h2>
        <p className="text-slate-600 mb-2">
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch
          keine Gewähr.
        </p>
      </div>
    </div>
  );
}
