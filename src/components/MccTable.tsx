import React, { useState } from 'react';
import { Search, Info, ShieldCheck, Filter } from 'lucide-react';
import { NPCI_MCC_CATEGORIES } from '../constants/mccData';

export const MccTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRate, setSelectedRate] = useState<number | 'all'>('all');

  const filteredCategories = NPCI_MCC_CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRate = selectedRate === 'all' || cat.interchangeRate === selectedRate;
    return matchesSearch && matchesRate;
  });

  return (
    <section id="rates" className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Official NPCI Interchange Circular</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              NPCI Merchant Category Code (MCC) Slabs
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Interchange rates applicable on Prepaid Payment Instruments (Wallets) on transactions exceeding ₹2,000.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search category or MCC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedRate('all')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${selectedRate === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSelectedRate(0.5)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${selectedRate === 0.5 ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
              >
                0.5%
              </button>
              <button
                type="button"
                onClick={() => setSelectedRate(0.7)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${selectedRate === 0.7 ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
              >
                0.7%
              </button>
              <button
                type="button"
                onClick={() => setSelectedRate(0.9)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${selectedRate === 0.9 ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
              >
                0.9%
              </button>
              <button
                type="button"
                onClick={() => setSelectedRate(1.1)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${selectedRate === 1.1 ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'}`}
              >
                1.1%
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Merchant Category & Scope</th>
                  <th className="py-3.5 px-4">MCC Codes</th>
                  <th className="py-3.5 px-4">Interchange Fee</th>
                  <th className="py-3.5 px-4">Threshold Exemption</th>
                  <th className="py-3.5 px-4 sm:px-6">Special Conditions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCategories.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {item.code}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-mono">
                        {item.interchangeRate}%
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        0% for ≤ ₹2,000
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-400 text-xs">
                      {item.capAmount ? (
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          Hard Cap of ₹{item.capAmount} per txn
                        </span>
                      ) : (
                        <span>+ 18% GST on interchange</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <Info className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
            <p>
              <strong>Important NPCI Clarification:</strong> Direct Bank-to-Bank account UPI transactions (P2M via savings or current accounts) are excluded from all interchange fees and have a strictly mandated <strong>0.00% fee</strong> across all categories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
