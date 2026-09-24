import React from 'react';
import { ArrowUp, Heart, ShieldAlert, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Main 4-column blogger footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: Brand & Editorial info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-base">
                ₹
              </div>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                Digi<span className="text-emerald-600 dark:text-emerald-400">Vyapar</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              An independent merchant banking and digital payments educational resource for Indian retailers, kirana shopkeepers, and e-commerce entrepreneurs.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Accurate for RBI & NPCI 2024-2026 Directives</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400">UPI MDR Calculator</a></li>
              <li><a href="#turnover" className="hover:text-emerald-600 dark:hover:text-emerald-400">Monthly Turnover</a></li>
              <li><a href="#rates" className="hover:text-emerald-600 dark:hover:text-emerald-400">NPCI Category Slabs</a></li>
              <li><a href="#guide" className="hover:text-emerald-600 dark:hover:text-emerald-400">Settlement Guide</a></li>
            </ul>
          </div>

          {/* Col 3: Legal & Regulatory (2 cols) */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Regulations
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><span className="hover:text-emerald-600">Zero MDR Mandate</span></li>
              <li><span className="hover:text-emerald-600">NPCI PPI Circular</span></li>
              <li><span className="hover:text-emerald-600">RuPay CC Guidelines</span></li>
              <li><span className="hover:text-emerald-600">GST on MDR Rules</span></li>
            </ul>
          </div>

          {/* Col 4: Blogger Stats (3 cols) */}
          <div className="md:col-span-3 space-y-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Merchant Trust Badge</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Trusted by 140,000+ merchants and financial advisors across India for accurate net bank payout forecasting.
            </p>
            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> This calculation tool is developed for educational and informational estimation based on public circulars released by the National Payments Corporation of India (NPCI) and the Reserve Bank of India (RBI). Actual settlement amounts may slightly differ depending on your specific acquiring bank, payment gateway agreement, or POS terminal provider agreements. DigiVyapar is an independent publication and is not affiliated with NPCI or RBI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-slate-500">
            <div>
              © {new Date().getFullYear()} DigiVyapar Blogger Edition. Free for Indian Retailers.
            </div>
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>for Digital India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
