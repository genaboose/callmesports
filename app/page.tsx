import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="sticky top-0 border-b bg-white h-16 flex items-center px-6">
        <h1 className="font-bold text-xl">CallMeSports</h1>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" /> Sports • Fitness • Health
        </span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight">
          Your coach on call — human or AI
        </h2>
        <p className="mt-4 text-slate-600 text-lg">
          Book a real trainer when you want accountability, or chat with an AI coach 24/7 for instant plans, tips, and motivation.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 rounded-2xl bg-blue-600 text-white">Start free trial</button>
          <button className="px-6 py-3 rounded-2xl border border-slate-300">Book a human coach</button>
        </div>
        <div className="mt-12 text-left">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5"/> Talk to the AI Coach (Demo)
          </h3>
          <pre className="mt-3 whitespace-pre-wrap rounded-xl border bg-slate-50 p-3 text-sm">
            Example workout: 20-min kettlebell circuit (swings, goblet squats, push-ups, rows, mountain climbers)
          </pre>
        </div>
      </main>
      <footer className="border-t py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} CallMeSports. All rights reserved.
      </footer>
    </div>
  );
}
