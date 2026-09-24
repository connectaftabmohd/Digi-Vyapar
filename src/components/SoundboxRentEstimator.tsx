import React, { useState } from 'react';
import { Volume2, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { formatINR } from '../utils/calculator';

export const SoundboxRentEstimator: React.FC = () => {
  const [monthlyRent, setMonthlyRent] = useState<number>(125); // ₹125/month is common
  const [dailyTxns, setDailyTxns] = useState<number>(40);
  const [avgTicket, setAvgTicket] = useState<number>(180);

  const monthlyTxns = dailyTxns * 30;
  const monthlyTurnover = monthlyTxns * avgTicket;
  const costPerTxn = monthlyTxns > 0 ? (monthlyRent * 1.18) / monthlyTxns : 0;
  const totalRentWithGst = monthlyRent * 1.18; // 18% GST on rental

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Soundbox / Speaker Rent Impact
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paytm Soundbox, PhonePe SmartSpeaker, GPay SoundPod
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
          PRO TIPS
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-700 dark:text-slate-300">Monthly Device Rent:</span>
            <span className="font-mono text-slate-900 dark:text-white">₹{monthlyRent}/mo + 18% GST</span>
          </div>
          <div className="flex gap-2">
            {[99, 125, 149, 199].map((rent) => (
              <button
                key={rent}
                type="button"
                onClick={() => setMonthlyRent(rent)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  monthlyRent === rent
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                ₹{rent}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-700 dark:text-slate-300">Daily Customer Transactions:</span>
            <span className="font-mono text-slate-900 dark:text-white">{dailyTxns} per day (~{monthlyTxns}/mo)</span>
          </div>
          <input
            type="range"
            min="5"
            max="200"
            step="5"
            value={dailyTxns}
            onChange={(e) => setDailyTxns(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg accent-teal-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-700 dark:text-slate-300">Average Bill / Cup of Chai:</span>
            <span className="font-mono text-slate-900 dark:text-white">₹{avgTicket}</span>
          </div>
          <input
            type="range"
            min="20"
            max="1500"
            step="20"
            value={avgTicket}
            onChange={(e) => setAvgTicket(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg accent-teal-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Output Stats */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
          <span>Total Monthly Rental (incl. 18% GST):</span>
          <span className="font-bold text-slate-900 dark:text-white font-mono">{formatINR(totalRentWithGst)}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
          <span>Effective Cost per Voice Alert:</span>
          <span className="font-bold text-teal-600 dark:text-teal-400 font-mono">₹{costPerTxn.toFixed(2)} / txn</span>
        </div>
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
          <span>Soundbox Cost as % of Sales:</span>
          <span className="font-bold text-slate-900 dark:text-white font-mono">
            {monthlyTurnover > 0 ? ((totalRentWithGst / monthlyTurnover) * 100).toFixed(2) : 0}%
          </span>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
        💡 <strong>Merchant Advice:</strong> If you process fewer than 15 transactions a day, switching to a <strong>free Static QR Standee</strong> with instant bank SMS alerts saves you <strong>{formatINR(totalRentWithGst * 12, 0)} per year</strong> with zero hardware maintenance!
      </div>
    </div>
  );
};
