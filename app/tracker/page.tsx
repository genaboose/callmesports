'use client';
import React, { useEffect, useMemo, useState } from 'react';

type Workout = {
  id: string;
  date: string;
  type: 'Run' | 'Ride' | 'Walk' | 'Strength' | 'HIIT' | 'Swim' | 'Yoga';
  durationMin: number;
  kcal: number;
  notes?: string;
};

type ApiPayload = {
  meta: { generatedAt: string; unit: any };
  today: { targetSteps: number; steps: number; activeMin: number; kcal: number; avgHr: number; dateLabel: string };
  week: { labels: string[]; steps: number[] };
  workouts: Workout[];
};

export default function TrackerPage() {
  const [data, setData] = useState<ApiPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/tracker', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiPayload = await res.json();
        setData(json);
      } catch (e: any) {
        setErr(e?.message || 'Fehler beim Laden');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-slate-600">
        Lädt Tracker-Daten…
      </div>
    );
  }

  if (err || !data) {
    return (
      <div className="min-h-screen grid place-items-center text-red-600">
        Fehler: {err ?? 'Unbekannt'}
      </div>
    );
  }

  const { today, week, workouts } = data;

  // Ring-Berechnung
  const stepsPct = Math.min(1, today.steps / today.targetSteps);
  const ring = { size: 120, stroke: 12 };
  const radius = (ring.size - ring.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * stepsPct;

  const weekMax = Math.max(...week.steps, today.targetSteps);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header lokal */}
      <div className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-128.png" alt="CallMeSports" className="h-8 w-8" />
            <span className="font-semibold">CallMeSports</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/#features" className="hover:text-blue-600">Features</a>
            <a href="/#pricing" className="hover:text-blue-600">Pricing</a>
            <a href="/#faq" className="hover:text-blue-600">FAQ</a>
            <a href="/tracker" className="text-blue-600 font-semibold">Tracker</a>
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Titelzeile */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Fitness-Tracker</h1>
            <p className="mt-2 text-slate-600">
              Übersicht für <span className="font-medium">{today.dateLabel}</span> • Ziel: {today.targetSteps.toLocaleString()} Schritte
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border px-4 py-2 hover:bg-slate-50">Heute</button>
            <button className="rounded-xl border px-4 py-2 hover:bg-slate-50">Diese Woche</button>
            <button className="rounded-xl border px-4 py-2 hover:bg-slate-50">Dieser Monat</button>
          </div>
        </div>

        {/* Top-Grid */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Ring */}
          <div className="rounded-2xl border p-6">
            <div className="flex items-center gap-6">
              <svg width={ring.size} height={ring.size} className="-rotate-90">
                <circle cx={ring.size / 2} cy={ring.size / 2} r={radius} stroke="#e5e7eb" strokeWidth={ring.stroke} fill="none" />
                <circle
                  cx={ring.size / 2}
                  cy={ring.size / 2}
                  r={radius}
                  stroke="#3B82F6"
                  strokeWidth={ring.stroke}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference - dash}`}
                />
              </svg>
              <div>
                <div className="text-4xl font-extrabold leading-tight">
                  {(stepsPct * 100).toFixed(0)}%
                </div>
                <div className="text-slate-600">
                  {today.steps.toLocaleString()} / {today.targetSteps.toLocaleString()} Schritte
                </div>
                <div className="mt-3 text-xs text-slate-500">
                  Tipp: 5–10 Min flotter Spaziergang nach dem Essen hilft, das Ziel zu knacken.
                </div>
              </div>
            </div>
          </div>

          {/* Kennzahlen */}
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl border p-6">
              <div className="text-sm text-slate-500">Aktive Minuten (heute)</div>
              <div className="mt-2 text-3xl font-bold">{today.activeMin} min</div>
              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, (today.activeMin / 45) * 100)}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border p-6">
              <div className="text-sm text-slate-500">Kalorien (heute)</div>
              <div className="mt-2 text-3xl font-bold">{today.kcal} kcal</div>
              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-orange-500" style={{ width: `${Math.min(100, (today.kcal / 700) * 100)}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border p-6">
              <div className="text-sm text-slate-500">Durchschn. Puls</div>
              <div className="mt-2 text-3xl font-bold">{today.avgHr} bpm</div>
              <div className="mt-3 text-xs text-slate-500">Ruhepuls + Aktivität im Tagesmix</div>
            </div>

            <div className="rounded-2xl border p-6">
              <div className="text-sm text-slate-500">Letztes Update</div>
              <div className="mt-2 text-3xl font-bold">
                {new Date(data.meta.generatedAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="mt-3 text-xs text-slate-500">Automatische Synchronisierung aktiv</div>
            </div>
          </div>
        </section>

        {/* Woche (Balken) */}
        <section className="mt-8 rounded-2xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Schritte – diese Woche</h2>
            <div className="text-sm text-slate-500">Ziel: {today.targetSteps.toLocaleString()} / Tag</div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-3 items-end">
            {week.steps.map((val, i) => {
              const pct = Math.min(100, (val / Math.max(weekMax, 1)) * 100);
              const hit = val >= today.targetSteps;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-8 md:w-10 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400"
                       style={{ height: `calc(${pct}% + 24px)` }} />
                  <div className="text-xs text-slate-600">{week.labels[i]}</div>
                  <div className={`text-[10px] ${hit ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {val.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Workouts */}
        <section className="mt-8 rounded-2xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Aktivitäten</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">Alle anzeigen</a>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b">
                  <th className="py-3 pr-3">Datum</th>
                  <th className="py-3 pr-3">Typ</th>
                  <th className="py-3 pr-3">Dauer</th>
                  <th className="py-3 pr-3">kcal</th>
                  <th className="py-3 pr-3">Notizen</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map(w => (
                  <tr key={w.id} className="border-b last:border-0">
                    <td className="py-3 pr-3">{new Date(w.date).toLocaleDateString()}</td>
                    <td className="py-3 pr-3">{w.type}</td>
                    <td className="py-3 pr-3">{w.durationMin} min</td>
                    <td className="py-3 pr-3">{w.kcal}</td>
                    <td className="py-3 pr-3 text-slate-600">{w.notes ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Verbinde deinen Tracker (Apple Health, Garmin, Polar, Fitbit), um Daten automatisch zu synchronisieren.
            </p>
            <a href="#" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Tracker verbinden
            </a>
          </div>
        </section>

        <p className="mt-6 text-xs text-slate-500">
          Demo-Daten von <code className="bg-slate-100 px-1 rounded">/api/tracker</code>. Später hier echte Provider anbinden (OAuth + Webhooks).
        </p>
      </main>
    </div>
  );
}
