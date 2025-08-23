// app/api/tracker/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const today = new Date();
  return NextResponse.json({
    meta: { generatedAt: today.toISOString() },
    today: { targetSteps: 10000, steps: 7640, activeMin: 48, kcal: 612, avgHr: 97,
      dateLabel: today.toLocaleDateString(undefined,{ day:'2-digit', month:'short' }) },
    week: { labels: ['Mo','Di','Mi','Do','Fr','Sa','So'], steps: [8123,10442,6530,9877,12034,14560,7340] },
    workouts: [
      { id:'w1', date:'2025-08-21', type:'Run', durationMin:35, kcal:372, notes:'Lockerer DL, RPE 6' },
      { id:'w2', date:'2025-08-20', type:'Strength', durationMin:45, kcal:410, notes:'GK: KB, RDL, Pushups' },
      { id:'w3', date:'2025-08-19', type:'Walk', durationMin:30, kcal:160 },
    ],
  }, { headers: { 'Cache-Control': 'no-store' }});
}
