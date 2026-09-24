import React from 'react';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Lightbulb, 
  Scale, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Zap 
} from 'lucide-react';

export const ArticleSection: React.FC = () => {
  return (
    <article id="guide" className="py-8 sm:py-14 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <a href="#calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</a>
          <span>/</span>
          <a href="#deduction-rules" className="hover:text-emerald-600 dark:hover:text-emerald-400">Merchant Banking</a>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">NPCI Standard Deduction Rules</span>
        </nav>

        {/* Blogger Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Regulatory Deep-Dive
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>8 min read</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Understanding Merchant Discount Rate (MDR) on Select UPI (P2M) Transactions: The Complete NPCI Rulebook
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-b border-slate-200 dark:border-slate-800 py-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                AS
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Fintech Regulatory Desk</span>
                  <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="text-[11px] text-slate-500">
                  Reviewed under NPCI Circular Guidelines
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Effective Oct 15, 2026</span>
              </span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Official Circular Analysis
              </span>
            </div>
          </div>
        </header>

        {/* Key Takeaways Box (Blogger style) */}
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20 space-y-3">
          <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 text-sm">
            <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Core Deductions Summary at a Glance:</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Consumers Pay 0% (Always Free):</strong> UPI remains completely free for retail customers. MDR is an internal acquirer settlement fee paid by merchants.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>The ₹2,000 Threshold:</strong> Any UPI transaction ≤ ₹2,000 has <strong>ZERO (0%) MDR</strong> across standard retail, essential sectors, and capital markets.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Standard Rate of 0.40% with ₹300 Cap:</strong> For transactions &gt; ₹2,000, standard P2M MDR is 0.40%, with a hard cap of ₹300 for payments of ₹75,000 and above.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Specialized Essential Sectors (Flat ₹5):</strong> Railways, telecom, fuel, utilities, insurance, education, and agriculture pay a flat ₹5 fee above ₹2,000 (+ 18% GST = ₹5.90).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Small Merchant Protection (&le; ₹1 Lakh/month):</strong> Micro-merchants receiving up to ₹1 Lakh monthly into personal bank accounts (P2PM) pay <strong>0% fee</strong>.</span>
            </li>
          </ul>
        </div>

        {/* Editorial Body Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-2">
            1. Why Did NPCI Introduce Standard MDR on Select UPI P2M Transactions?
          </h3>
          <p>
            With Unified Payments Interface (UPI) clocking tens of billions of monthly transactions, sustaining the underlying banking rails, cybersecurity defenses, server hardware, and high-uptime settlement switches required a long-term economic model.
          </p>
          <p>
            To fund infrastructure resiliency, fraud-prevention mechanisms, and ecosystem innovation without impacting common citizens, the National Payments Corporation of India (NPCI) formulated the standard deduction framework on <strong>select Person-to-Merchant (P2M) transactions</strong> effective October 15, 2026.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4">
            2. The Four Pillars of the NPCI Deduction Framework
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>Pillar 1: Standard P2M Slabs (0.40%)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                Applies to general retail, supermarkets, dining, and commercial merchants. Transactions ≤ ₹2,000 are 0% free. Transactions &gt; ₹2,000 attract 0.40% MDR, capped at a maximum of ₹300 for payments of ₹75,000+.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span>Pillar 2: Essential Sectors (Flat ₹5)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                To prevent heavy percentage fees on public utility bills, school fees, and train tickets, seven essential sectors have a flat fee of ₹5 (+ 18% GST = ₹5.90) above ₹2,000.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <span>Pillar 3: Capital Markets (0.02%)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                Stockbrokers, mutual fund platforms, and securities dealers operate under a razor-thin 0.02% MDR, also capped at ₹300 per transaction. Free ≤ ₹2,000.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <ShieldCheck className="w-4 h-4 text-teal-500" />
                <span>Pillar 4: Small Merchant (P2PM) Protection</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                Street vendors, roadside chai stalls, and local kiranas receiving up to ₹1,00,000 per month into personal accounts pay <strong>0% MDR</strong>. If monthly collections exceed ₹1 Lakh for 3 consecutive months, they transition to standard P2M.
              </p>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4">
            3. Step-by-Step Deduction Calculation Examples
          </h3>
          <p>
            Here is how standard deductions work in real-world retail scenarios with 18% GST:
          </p>

          <div className="space-y-4 not-prose font-mono text-xs sm:text-sm">
            {/* Example 1: General Retail ₹10,000 */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-sans font-bold text-xs uppercase text-blue-600 dark:text-blue-400">
                Example A: Clothing Store Bill of ₹10,000 (Standard 0.40% MDR)
              </div>
              <div className="flex justify-between">
                <span>Transaction Value:</span>
                <span className="font-bold">₹10,000.00</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>MDR @ 0.40%:</span>
                <span>- ₹40.00</span>
              </div>
              <div className="flex justify-between text-purple-600 dark:text-purple-400">
                <span>18% GST on MDR (18% of ₹40):</span>
                <span>- ₹7.20</span>
              </div>
              <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                <span>Net Credited to Merchant:</span>
                <span className="font-mono text-base">₹9,952.80 (99.53%)</span>
              </div>
            </div>

            {/* Example 2: High Value ₹1,00,000 with Cap */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-sans font-bold text-xs uppercase text-blue-600 dark:text-blue-400">
                Example B: Electronics Store Bill of ₹1,00,000 (₹300 High-Value Cap)
              </div>
              <div className="flex justify-between">
                <span>Transaction Value:</span>
                <span className="font-bold">₹1,00,000.00</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>Raw 0.4% MDR (₹400) &rarr; Capped at:</span>
                <span className="font-bold">- ₹300.00 (Max Cap)</span>
              </div>
              <div className="flex justify-between text-purple-600 dark:text-purple-400">
                <span>18% GST on Capped MDR (18% of ₹300):</span>
                <span>- ₹54.00</span>
              </div>
              <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                <span>Net Credited to Merchant:</span>
                <span className="font-mono text-base">₹99,646.00 (99.65%)</span>
              </div>
            </div>

            {/* Example 3: Electricity Bill or University Fee */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-sans font-bold text-xs uppercase text-emerald-600 dark:text-emerald-400">
                Example C: College Tuition Fee of ₹45,000 (Essential Sector Flat ₹5)
              </div>
              <div className="flex justify-between">
                <span>Transaction Value:</span>
                <span className="font-bold">₹45,000.00</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>Fixed Sector MDR:</span>
                <span className="font-bold">- ₹5.00</span>
              </div>
              <div className="flex justify-between text-purple-600 dark:text-purple-400">
                <span>18% GST on ₹5:</span>
                <span>- ₹0.90</span>
              </div>
              <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                <span>Net Credited to College:</span>
                <span className="font-mono text-base">₹44,994.10 (99.99%)</span>
              </div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4">
            4. Why UPI MDR is Significantly Cheaper than Debit & Credit Cards
          </h3>
          <p>
            Even under the updated framework, UPI remains by far the most merchant-friendly payment method in the country:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Standard Credit Cards:</strong> Deduct between <strong>1.50% and 2.50%</strong> per swipe with no upper rupee cap. On a ₹50,000 sale, a credit card swipe costs ₹750 to ₹1,250 in fees. Under UPI, that same ₹50,000 transaction costs just ₹200 (at 0.40%).
            </li>
            <li>
              <strong>Debit Cards:</strong> Capped up to 0.90% for transactions over ₹2,000, which is more than double the 0.40% baseline rate of UPI.
            </li>
            <li>
              <strong>Instant Real-Time Settlement:</strong> While cards typically settle after 24 to 48 hours (T+1 or T+2), UPI transactions settle instantly or same-day into merchant bank accounts.
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};
