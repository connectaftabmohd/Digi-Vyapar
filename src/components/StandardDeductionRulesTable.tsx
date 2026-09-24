import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Train, 
  Radio, 
  Shield, 
  Fuel, 
  Zap, 
  GraduationCap, 
  Wheat, 
  TrendingUp,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  NPCI_STANDARD_DEDUCTION_RULES, 
  SPECIALIZED_SECTORS_FLAT5 
} from '../constants/mccData';

export const StandardDeductionRulesTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'sectors' | 'comparison'>('rules');

  return (
    <section id="deduction-rules" className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-300/60 dark:border-blue-800/60 mb-2">
              <Scale className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>NPCI Circular Guidelines • Effective Oct 15, 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Standard Deduction Rules for UPI P2M Transactions
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Official regulatory framework governing Person-to-Merchant (P2M) MDR, transaction thresholds, high-value caps, and sector exemptions.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'rules'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Standard Slabs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sectors')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'sectors'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Flat ₹5 Sectors
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-2 rounded-lg transition-all ${
                activeTab === 'comparison'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Payment Rail Comparison
            </button>
          </div>
        </div>

        {/* TAB 1: STANDARD SLABS & DEDUCTION RULES */}
        {activeTab === 'rules' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {NPCI_STANDARD_DEDUCTION_RULES.slice(0, 6).map((rule) => {
                const isFree = rule.rateType === 'exempt';
                const isFlat = rule.rateType === 'flat';

                return (
                  <div 
                    key={rule.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Top Accent Strip */}
                    <div className={`absolute top-0 inset-x-0 h-1.5 ${
                      isFree ? 'bg-emerald-500' : isFlat ? 'bg-teal-500' : 'bg-blue-500'
                    }`} />

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {rule.category}
                        </span>
                        {rule.capDisplay && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            {rule.capDisplay}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {rule.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {rule.subtitle}
                      </p>

                      {/* Rate Callout */}
                      <div className="my-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                        <div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Standard MDR Rate</div>
                          <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                            {rule.rateDisplay}
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                          isFree 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}>
                          {rule.thresholdCondition}
                        </span>
                      </div>

                      {/* Exemption Details */}
                      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span><strong>Exemption:</strong> {rule.exemptionRule}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span><strong>Eligible:</strong> {rule.eligibleMerchants}</span>
                        </div>
                      </div>
                    </div>

                    {/* Example Box */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 p-2.5 rounded-lg font-mono leading-relaxed">
                      💡 {rule.exampleCalculation}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Regulatory Notification Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Important: Consumers Continue to Enjoy 100% Free UPI
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    As mandated by NPCI FAQ Q3, MDR is strictly an acquirer/merchant settlement charge and will NOT be passed on to retail consumers.
                  </p>
                </div>
              </div>
              <div className="shrink-0 font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                P2P Transfers: ₹0 Fee
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPECIALIZED ESSENTIAL SECTORS (FLAT ₹5) */}
        {activeTab === 'sectors' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Why Flat ₹5 instead of percentage MDR?</strong>
                To protect public services, national transit, education, and essential utilities, NPCI capped merchant deductions at a fixed flat ₹5 per transaction (+ 18% GST = ₹5.90) above ₹2,000, eliminating large percentage cuts on high-value public bills.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPECIALIZED_SECTORS_FLAT5.map((sector) => {
                return (
                  <div 
                    key={sector.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {sector.mccCodes}
                        </span>
                        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                          Flat ₹5.00
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {sector.name}
                      </h3>
                      
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        <strong>Scope:</strong> {sector.examples}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>✓ {sector.feeStructure}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PAYMENT RAIL COMPARISON */}
        {activeTab === 'comparison' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Payment Method</th>
                    <th className="py-3.5 px-4">Standard MDR</th>
                    <th className="py-3.5 px-4">Cap per Txn</th>
                    <th className="py-3.5 px-4">≤ ₹2,000 Threshold</th>
                    <th className="py-3.5 px-4 sm:px-6">Merchant Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      UPI P2M (Standard)
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      0.40%
                    </td>
                    <td className="py-4 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      ₹300 (at ₹75k+)
                    </td>
                    <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                      100% Free (0%)
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-400 text-xs">
                      Lowest digital cost; small merchants (&lt;₹1L/mo) pay ₹0.
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                      UPI Essential Sectors
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-teal-600 dark:text-teal-400">
                      Flat ₹5.00
                    </td>
                    <td className="py-4 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      Fixed ₹5
                    </td>
                    <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                      100% Free (0%)
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-400 text-xs">
                      Railways, Telecom, Insurance, Fuel, Utilities, Education, Agri.
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      Debit Card (Mastercard / Visa)
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      0.40% - 0.90%
                    </td>
                    <td className="py-4 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      ₹1,000 Cap
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      0.40% applies
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-400 text-xs">
                      Higher fees for small tickets compared to UPI.
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      Credit Card (POS / Gateway)
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">
                      1.50% - 2.50%
                    </td>
                    <td className="py-4 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      No Cap
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      Full fee charged
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-400 text-xs">
                      Substantially costlier than UPI (up to 6x higher MDR).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <Info className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
              <p>
                <strong>NPCI Conclusion:</strong> The 0.40% standard rate (capped at ₹300) and Flat ₹5 utility rate make UPI the most cost-effective merchant payment channel in India.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
