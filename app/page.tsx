'use client';
import React from 'react';
import { Sparkles, Dumbbell, Clock, Shield } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo-banner.png"
              alt="CallMeSports Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-white">
            <a href="#features" className="hover:text-blue-200">Features</a>
            <a href="#pricing" className="hover:text-blue-200">Pricing</a>
            <a href="#faq" className="hover:text-blue-200">FAQ</a>
            <a href="#contact" className="hover:text-blue-200">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Athlete with rope"
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

      {/* FEATURES (optional – füge deinen bestehenden Block hier ein) */}
      {/* PRICING / FAQ / FOOTER (wie zuvor) */}
    </div>
  );
}
