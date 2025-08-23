'use client';
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
    // Exporte für Inline-Handler aus dem generierten HTML:
    handleDayClick?: (d: Date) => void;
    handleActivitySelect?: (a: string) => void;
    handleActivityClick?: (dateKey: string, activity: string) => void;
    handleDeleteActivity?: () => void;
    closeModal?: () => void;
    closeLastActivityInfo?: () => void;
    handleInstallApp?: () => void;
  }
}

export default function LastDaysPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // --- Lucide UMD nachladen (für <i data-lucide="...">) ---
    const ensureLucide = async () => {
      if (typeof window !== 'undefined' && !window.lucide) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.js';
          s.async = true;
          s.onload = () => resolve();
          s.onerror = () => reject(new Error('Lucide load error'));
          document.head.appendChild(s);
        });
      }
    };

    // ----- Dein ursprünglicher App-State (leicht angepasst) -----
    let activities: Record<string, string[]> = {};
    let showActivityModal = false;
    let showDeleteModal = false;
    let selectedDate = '';
    let selectedActivity = '';
    let showLastActivityInfo = true;
    let deferredPrompt: any = null;
    let showInstallButton = false;

    // Load from localStorage
    try {
      const saved = localStorage.getItem('fitness-tracker-activities');
      if (saved) {
        activities = JSON.parse(saved);
        if (Object.keys(activities).length > 0) showLastActivityInfo = true;
      }
    } catch (e) {
      console.error('Error loading activities:', e);
    }

    function saveActivities() {
      try {
        localStorage.setItem('fitness-tracker-activities', JSON.stringify(activities));
      } catch (e) {
        console.error('Error saving activities:', e);
      }
    }

    // PWA-Install (Button bleibt meist ausgeblendet, da kein Manifest)
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
      showInstallButton = true;
      render();
    });
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      showInstallButton = false;
    }
    window.handleInstallApp = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        showInstallButton = false;
        render();
        deferredPrompt = null;
      }
    };

    const activityTypes = [
      'Laufen', 'Sprinten', 'Walken', 'Krafttraining',
      'Kraft-Oberkörper', 'Kraft-Brust', 'Kraft-Rücken',
      'Kraft-Beine', 'Kraft-Arme', 'Biken', 'Hiking',
    ];

    function generateDates() {
      const dates: Date[] = [];
      const today = new Date();
      for (let i = 0; i < 90; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        dates.push(d);
      }
      return dates;
    }

    function formatDate(date: Date) {
      const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
      const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
      const dayName = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth()];
      return `${dayName}, ${day}. ${month}`;
    }

    function getDateKey(date: Date) {
      return date.toISOString().split('T')[0];
    }

    function isWeekend(date: Date) {
      const day = date.getDay();
      return day === 0 || day === 6;
    }

    function getLastActivitiesInfo() {
      const all: { date: Date; activity: string }[] = [];
      Object.entries(activities).forEach(([k, arr]) => {
        arr.forEach((a) => all.push({ date: new Date(k), activity: a }));
      });
      if (all.length === 0) return [];
      const categoryMap: Record<string, string[]> = {
        'Krafttraining': ['Krafttraining', 'Kraft-Oberkörper', 'Kraft-Brust', 'Kraft-Rücken', 'Kraft-Beine', 'Kraft-Arme'],
        'Laufen': ['Laufen'],
        'Sprinten': ['Sprinten'],
        'Walken': ['Walken'],
      };
      const today = new Date();
      const results: { category: string; daysAgo: number }[] = [];
      Object.entries(categoryMap).forEach(([name, types]) => {
        const cat = all.filter((x) => types.includes(x.activity));
        if (cat.length > 0) {
          cat.sort((a, b) => +b.date - +a.date);
          const last = cat[0];
          const diffDays = Math.floor((+today - +last.date) / (1000 * 60 * 60 * 24));
          results.push({ category: name, daysAgo: diffDays });
        }
      });
      return results;
    }

    // Exponiere Handler für Inline-onclicks
    window.handleDayClick = (date: Date) => {
      selectedDate = getDateKey(date);
      showActivityModal = true;
      render();
    };
    window.handleActivitySelect = (activity: string) => {
      const dateKey = selectedDate;
      const current = activities[dateKey] || [];
      if (!current.includes(activity)) {
        activities[dateKey] = [...current, activity];
        saveActivities();
      }
      showActivityModal = false;
      showLastActivityInfo = true;
      render();
    };
    window.handleActivityClick = (dateKey: string, activity: string) => {
      selectedDate = dateKey;
      selectedActivity = activity;
      showDeleteModal = true;
      render();
    };
    window.handleDeleteActivity = () => {
      const cur = activities[selectedDate] || [];
      const next = cur.filter((a) => a !== selectedActivity);
      if (next.length === 0) delete activities[selectedDate];
      else activities[selectedDate] = next;
      saveActivities();
      showDeleteModal = false;
      showLastActivityInfo = true;
      render();
    };
    window.closeModal = () => {
      showActivityModal = false;
      showDeleteModal = false;
      render();
    };
    window.closeLastActivityInfo = () => {
      showLastActivityInfo = false;
      render();
    };

    function html() {
      const dates = generateDates();
      const infos = getLastActivitiesInfo();
      const todayKey = getDateKey(new Date());

      return `
        <div class="min-h-screen bg-gray-50">
          ${showLastActivityInfo && infos.length > 0 ? `
            <div class="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm w-full mx-4">
              <div class="flex justify-between items-start">
                <div class="space-y-1">
                  ${infos.map(i => `
                    <div class="text-sm">
                      <span class="font-medium">${i.category}:</span> vor ${i.daysAgo} Tag${i.daysAgo !== 1 ? 'en' : ''}
                    </div>
                  `).join('')}
                </div>
                <button onclick="closeLastActivityInfo()" class="text-white hover:text-gray-200 ml-3 shrink-0">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          ` : ''}

          <div class="container mx-auto px-4 py-6 max-w-md">
            <div class="text-center mb-6">
              <h1 class="text-2xl font-bold text-gray-800 mb-4">Fitness Tracker</h1>

              <div class="space-y-3 mb-6">
                <div class="flex gap-3">
                  <button
                    onclick="window.open('https://www.longevitypraxisgenaco.de/coaching/', '_blank')"
                    class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                    Longevity Coaching
                  </button>
                  <button
                    onclick="window.open('https://wa.me/4917699102033', '_blank')"
                    class="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                    Deinen Coach fragen
                  </button>
                </div>

                ${showInstallButton ? `
                  <button
                    onclick="handleInstallApp()"
                    class="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <i data-lucide="download" class="w-4 h-4"></i>
                    App installieren
                  </button>
                ` : ''}
              </div>
            </div>

            <div class="space-y-2">
              ${dates.map((date) => {
                const dateKey = date.toISOString().split('T')[0];
                const dayActs = activities[dateKey] || [];
                const isToday = dateKey === todayKey;
                const weekend = [0,6].includes(date.getDay());
                return `
                  <div
                    class="p-4 rounded-lg cursor-pointer border-2 transition-all
                      ${weekend ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' : 'bg-white border-gray-200 hover:bg-gray-50'}
                      ${isToday ? 'ring-2 ring-blue-400' : ''}"
                    onclick="handleDayClick(new Date('${date.toISOString()}'))">
                    <div class="flex justify-between items-start">
                      <div>
                        <div class="font-semibold text-gray-800">
                          ${formatDate(date)}
                          ${isToday ? '<span class="ml-2 text-blue-500 text-sm">(Heute)</span>' : ''}
                        </div>
                        ${dayActs.length > 0 ? `
                          <div class="mt-2">
                            ${dayActs.map((a) => `
                              <span
                                class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-1 cursor-pointer hover:bg-green-200 transition-colors"
                                onclick="event.stopPropagation(); handleActivityClick('${dateKey}', '${a}')">
                                ${a}
                              </span>
                            `).join('')}
                          </div>
                        ` : ''}
                      </div>
                      <i data-lucide="plus" class="w-5 h-5 text-gray-400 mt-1"></i>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          ${showActivityModal ? `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onclick="closeModal()">
              <div class="bg-white rounded-lg p-6 max-w-sm w-full" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-lg font-semibold">Aktivität hinzufügen</h2>
                  <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i data-lucide="x" class="w-6 h-6"></i>
                  </button>
                </div>
                <div class="grid gap-2">
                  ${activityTypes.map(a => `
                    <button
                      onclick="handleActivitySelect('${a}')"
                      class="p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      ${a}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}

          ${showDeleteModal ? `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onclick="closeModal()">
              <div class="bg-white rounded-lg p-6 max-w-sm w-full" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-lg font-semibold">Aktivität löschen?</h2>
                  <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                    <i data-lucide="x" class="w-6 h-6"></i>
                  </button>
                </div>
                <p class="text-gray-600 mb-6">Möchtest du "<strong>${selectedActivity}</strong>" wirklich löschen?</p>
                <div class="flex gap-3">
                  <button
                    onclick="handleDeleteActivity()"
                    class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                    Löschen
                  </button>
                  <button
                    onclick="closeModal()"
                    class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                    Abbrechen
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    async function render() {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = html();
      await ensureLucide();
      try {
        window.lucide?.createIcons();
      } catch {}
    }

    render();

    // Cleanup: Inline-Handler bleiben auf window; hier nichts zu entfernen
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Lokaler Header für die Unterseite */}
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
            <a href="/tracker" className="hover:text-blue-600">Tracker</a>
            <a href="/tracker/last-days" className="text-blue-600 font-semibold">Last Days</a>
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Tracker – letzte Tage
        </h1>
        <p className="text-slate-600 mb-6">
          Deine Aktivitäten der letzten 90 Tage – lokal gespeichert im Browser.
        </p>

        {/* Hier wird das HTML-UI deines Trackers gerendert */}
        <div ref={containerRef} />

        <p className="mt-6 text-xs text-slate-500">
          Hinweis: PWA/Service-Worker & Manifest wurden auf dieser Unterseite bewusst weggelassen.
          Wenn du eine installierbare PWA willst, lege eine statische <code className="bg-slate-100 px-1 rounded">/tracker-sw.js</code> in <code>/public</code> an und registriere sie in einer Client-Komponente.
        </p>
      </main>
    </div>
  );
}
