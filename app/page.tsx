import { Sparkles, Dumbbell, Clock, Shield } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Athlete with"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-green-400/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Train smarter. Anytime. Anywhere.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-blue-50">
            CallMeSports verbindet dich mit echten Coaches oder einem 24/7 AI-Coach –
            für Training, das wirklich in dein Leben passt.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#pricing" className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-100 transition shadow-lg">
              Start free trial
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full border-2 border-white font-semibold hover:bg-white hover:text-blue-600 transition shadow-lg">
              Book a coach
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900">
            Warum CallMeSports?
          </h2>
          <p className="mt-4 text-lg text-slate-600 text-center max-w-2xl mx-auto">
            Dein smarter Weg zu mehr Fitness – kombiniert die Stärken von
            Künstlicher Intelligenz und echter Coaching-Erfahrung.
          </p>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">24/7 AI-Coach</h3>
              <p className="mt-3 text-slate-600">
                Sofort verfügbar, egal ob du Tipps, Pläne oder Motivation brauchst.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
                <Dumbbell className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">Echte Trainer</h3>
              <p className="mt-3 text-slate-600">
                Persönliche Betreuung durch erfahrene Coaches – individuell und menschlich.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">Flexibles Training</h3>
              <p className="mt-3 text-slate-600">
                Zuhause, im Gym oder unterwegs – CallMeSports passt sich deinem Alltag an.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">Schnelle Erfolge</h3>
              <p className="mt-3 text-slate-600">
                Trainings- und Ernährungspläne, die wirklich Ergebnisse liefern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Flexible Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Wähle den Plan, der zu deinem Leben passt – von AI-Coaching rund um die Uhr bis zur
            persönlichen Betreuung durch echte Trainer.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* AI Coach */}
            <div className="bg-white border rounded-2xl shadow-sm p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-slate-900">AI Coach</h3>
              <p className="mt-4 text-slate-600">24/7 KI-Coach mit sofortigen Tipps & Plänen.</p>
              <div className="mt-6 text-4xl font-bold text-slate-900">€9<span className="text-lg text-slate-500">/mo</span></div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 text-left mx-auto">
                <li>✔ 24/7 Chat mit AI</li>
                <li>✔ Individuelle Wochenpläne</li>
                <li>✔ Übungsdatenbank</li>
                <li>✔ Motivation & Tracking</li>
              </ul>
              <a href="#contact" className="mt-8 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                Start Free Trial
              </a>
            </div>

            {/* Hybrid (highlight) */}
            <div className="bg-white border-2 border-blue-600 rounded-2xl shadow-lg p-8 flex flex-col scale-105">
              <h3 className="text-xl font-semibold text-blue-600">Hybrid (AI + Human)</h3>
              <p className="mt-4 text-slate-600">Die perfekte Mischung: AI plus echte Betreuung.</p>
              <div className="mt-6 text-4xl font-bold text-slate-900">€49<span className="text-lg text-slate-500">/mo</span></div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 text-left mx-auto">
                <li>✔ Alles aus AI Coach</li>
                <li>✔ 1x 30-Min Coach-Call/Monat</li>
                <li>✔ Feedback per WhatsApp/Chat</li>
                <li>✔ Plan-Tuning durch echten Coach</li>
              </ul>
              <a href="#contact" className="mt-8 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                Get Started
              </a>
            </div>

            {/* Pro Human Coach */}
            <div className="bg-white border rounded-2xl shadow-sm p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-slate-900">Pro Human Coach</h3>
              <p className="mt-4 text-slate-600">Individuelle Betreuung durch erfahrene Coaches.</p>
              <div className="mt-6 text-4xl font-bold text-slate-900">€149<span className="text-lg text-slate-500">/mo</span></div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 text-left mx-auto">
                <li>✔ Wöchentliche 1:1 Coaching-Sessions</li>
                <li>✔ Maßgeschneiderte Trainings- & Ernährungspläne</li>
                <li>✔ Video-Form-Korrekturen</li>
                <li>✔ Priorisierte Betreuung</li>
              </ul>
              <a href="#contact" className="mt-8 px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">
                Book a Coach
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center">
            Häufige Fragen
          </h2>
          <p className="mt-4 text-lg text-slate-600 text-center">
            Alles, was du zum Start mit CallMeSports wissen musst.
          </p>

          <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {/* Item */}
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-base font-semibold text-slate-900">
                  Wie funktioniert der 24/7 AI-Coach?
                </span>
                <span className="ml-6 shrink-0 rounded-full border p-1 transition group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </summary>
              <div className="grid overflow-hidden transition-all duration-300 ease-in-out [grid-template-rows:0fr] group-open:[grid-template-rows:1fr]">
                <div className="mt-3 text-slate-600 overflow-hidden">
                  Du beschreibst Ziel, Zeit & verfügbares Equipment. Der AI-Coach erstellt sofort
                  einen Plan, beantwortet Fragen und passt Empfehlungen auf Basis deines Feedbacks an.
                </div>
              </div>
            </details>

            {/* Item */}
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-base font-semibold text-slate-900">
                  Kann ich zwischen AI und Human-Coach wechseln?
                </span>
                <span className="ml-6 shrink-0 rounded-full border p-1 transition group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </summary>
              <div className="grid overflow-hidden transition-all duration-300 ease-in-out [grid-template-rows:0fr] group-open:[grid-template-rows:1fr]">
                <div className="mt-3 text-slate-600 overflow-hidden">
                  Ja. Du kannst jederzeit upgraden/downgraden. Deine Trainingshistorie bleibt erhalten.
                </div>
              </div>
            </details>

            {/* Item */}
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-base font-semibold text-slate-900">
                  Brauche ich spezielles Equipment?
                </span>
                <span className="ml-6 shrink-0 rounded-full border p-1 transition group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </summary>
              <div className="grid overflow-hidden transition-all duration-300 ease-in-out [grid-template-rows:0fr] group-open:[grid-template-rows:1fr]">
                <div className="mt-3 text-slate-600 overflow-hidden">
                  Nein. Wir erstellen Pläne für Zuhause, Gym oder Reisen – mit oder ohne Ausrüstung.
                </div>
              </div>
            </details>

            {/* Item */}
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-base font-semibold text-slate-900">
                  Kann ich jederzeit kündigen?
                </span>
                <span className="ml-6 shrink-0 rounded-full border p-1 transition group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </summary>
              <div className="grid overflow-hidden transition-all duration-300 ease-in-out [grid-template-rows:0fr] group-open:[grid-template-rows:1fr]">
                <div className="mt-3 text-slate-600 overflow-hidden">
                  Ja. Keine Laufzeiten, keine versteckten Gebühren. Du kannst monatlich beenden.
                </div>
              </div>
            </details>

            {/* Item */}
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-base font-semibold text-slate-900">
                  Was passiert mit meinen Daten?
                </span>
                <span className="ml-6 shrink-0 rounded-full border p-1 transition group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </summary>
              <div className="grid overflow-hidden transition-all duration-300 ease-in-out [grid-template-rows:0fr] group-open:[grid-template-rows:1fr]">
                <div className="mt-3 text-slate-600 overflow-hidden">
                  Wir folgen dem Prinzip „Privacy-first“. Du kontrollierst, was du teilst.
                  Details findest du in <a href="/datenschutz" className="underline">Datenschutz</a>.
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          {/* Logo & Claim */}
          <div>
            <h3 className="text-white text-2xl font-bold">CallMeSports</h3>
            <p className="mt-3 text-slate-400 text-sm">
              Your coach on call — human or AI.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/impressum" className="hover:text-white">Impressum</a></li>
              <li><a href="/datenschutz" className="hover:text-white">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* Social / Kontakt */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info@callmesports.com" className="hover:text-white">info@callmesports.com</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} CallMeSports. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
