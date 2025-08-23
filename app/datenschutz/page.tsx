export const metadata = {
  title: "Datenschutzerklärung – CallMeSports",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>

        <p className="mb-4">
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir
          behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der
          gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Allgemeine Hinweise</h2>
        <p className="mb-4 text-slate-600">
          Diese Website nutzt ausschließlich technisch notwendige Cookies und speichert
          Aktivitäten lokal im Browser (LocalStorage). Es findet keine Weitergabe Ihrer
          Daten an Dritte ohne Ihre ausdrückliche Zustimmung statt.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Kontaktformular</h2>
        <p className="mb-4 text-slate-600">
          Wenn Sie uns über das Formular kontaktieren, werden Ihre Angaben über den
          Dienst Formspree an uns weitergeleitet. Die Daten werden ausschließlich zur
          Bearbeitung Ihrer Anfrage verwendet.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Ihre Rechte</h2>
        <p className="mb-4 text-slate-600">
          Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten Daten sowie
          deren Berichtigung oder Löschung. Hierzu können Sie sich jederzeit unter der
          im Impressum angegebenen Adresse an uns wenden.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Hosting</h2>
        <p className="mb-4 text-slate-600">
          Diese Website wird über Vercel gehostet. Dabei können technische Daten wie
          IP-Adressen in Server-Logs verarbeitet werden, um den sicheren Betrieb der
          Website zu gewährleisten.
        </p>
      </div>
    </div>
  );
}
