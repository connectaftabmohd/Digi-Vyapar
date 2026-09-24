/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Calculator } from './components/Calculator';
import { StandardDeductionRulesTable } from './components/StandardDeductionRulesTable';
import { MonthlyTurnoverCalculator } from './components/MonthlyTurnoverCalculator';
import { MccTable } from './components/MccTable';
import { SoundboxRentEstimator } from './components/SoundboxRentEstimator';
import { ArticleSection } from './components/ArticleSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Volume2 } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('digivyapar_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('digivyapar_dark_mode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('digivyapar_dark_mode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors selection:bg-blue-500 selection:text-white">
      {/* Blogger Navigation */}
      <Navbar 
        darkMode={darkMode} 
        onToggleDarkMode={toggleDarkMode} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Core Calculation Tool */}
        <Calculator />

        {/* NPCI Standard Deduction Rules (October 15, 2026 Circular) */}
        <StandardDeductionRulesTable />

        {/* Mid-page Widget: Soundbox Rent vs Zero-MDR Static QR */}
        <section className="py-6 sm:py-8 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-300/60 dark:border-teal-800/60">
                <Volume2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Shopkeeper Cost Audit</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Are You Overpaying for Soundbox Voice Alerts?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Many retail shopkeepers pay monthly speaker rentals (₹125 - ₹199/month + 18% GST) even when standard QR codes have zero device maintenance overhead. Test if your store transaction volume justifies the ongoing rental cost.
              </p>

              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <span><strong>Static QR Standee:</strong> ₹0 setup, ₹0 monthly rent, 100% free for ≤ ₹2,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-xs">
                    !
                  </div>
                  <span><strong>Soundbox Device:</strong> ₹1,500 - ₹2,400 yearly recurring rental + 18% GST</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <SoundboxRentEstimator />
            </div>
          </div>
        </section>

        {/* Monthly Turnover & Slabs Estimator */}
        <MonthlyTurnoverCalculator />

        {/* NPCI Interchange Fee Slabs Table */}
        <MccTable />

        {/* Comprehensive Editorial Blog Post */}
        <ArticleSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Blogger Footer */}
      <Footer />
    </div>
  );
}
