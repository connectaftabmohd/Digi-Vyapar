import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  ShieldAlert, 
  ArrowDownRight, 
  ReceiptText, 
  Info, 
  Clock, 
  Sparkles,
  Scale
} from 'lucide-react';
import { CalculationResult } from '../types';
import { formatINR, formatNumberOnly } from '../utils/calculator';

interface ResultCardProps {
  result: CalculationResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyBreakdown = () => {
    const text = `📊 Merchant UPI Charges Breakdown
━━━━━━━━━━━━━━━━━━━━
💰 Transaction Amount: ${formatINR(result.amount)}
🏷️ Rule Applied: ${result.categoryName} (${result.ruleBadge})
${result.isExempt ? `✅ Exemption: Zero Deductions (100% Free)` : `📉 Base MDR: ${result.rateType === 'flat' ? `Flat ${formatINR(result.mdrAmount)}` : `${result.baseRatePercent}% (${formatINR(result.mdrAmount)})`}
🏛️ 18% GST: ${formatINR(result.gstAmount)}
🔻 Total Deductions: ${formatINR(result.totalDeduction)} (${result.effectiveRatePercent.toFixed(2)}%)`}
━━━━━━━━━━━━━━━━━━━━
💵 Net Bank Settlement: ${formatINR(result.netSettlement)}
📜 Regulatory Ref: ${result.circularRef}
⏱️ Calculated via DigiVyapar Merchant UPI Tool`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const netPercent = result.amount > 0 ? (result.netSettlement / result.amount) * 100 : 100;
  const mdrPercent = result.amount > 0 ? (result.mdrAmount / result.amount) * 100 : 0;
  const gstPercent = result.amount > 0 ? (result.gstAmount / result.amount) * 100 : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      {/* Header banner */}
      <div className={`px-5 py-4 border-b ${
        result.isExempt 
          ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border-emerald-500/20' 
          : 'bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ReceiptText className={`w-5 h-5 ${result.isExempt ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`} />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300">
              Calculation Breakdown
            </span>
          </div>

          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            result.isExempt
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              : 'bg-blue-100 text-blue-900 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
          }`}>
            {result.isExempt ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>0% Zero Fee</span>
              </>
            ) : (
              <span>{result.ruleBadge}</span>
            )}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5 flex-1 flex flex-col justify-between">
        
        {/* Main Settlement Hero Box */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-center gap-1.5">
            <span>Net Bank Settlement (In Hand)</span>
            <span title="Net amount credited to your bank account after regulatory deductions" className="cursor-help">
              <Info className="w-3.5 h-3.5 opacity-60" />
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
            {formatINR(result.netSettlement)}
          </div>

          {result.isExempt ? (
            <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4 inline" />
              <span>Full ₹{formatNumberOnly(result.amount)} credited with ₹0 deductions!</span>
            </div>
          ) : (
            <div className="mt-2 text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center justify-center gap-1">
              <ArrowDownRight className="w-4 h-4 inline" />
              <span>Total deduction of {formatINR(result.totalDeduction)} (incl. 18% GST)</span>
            </div>
          )}

          {result.capApplied && (
            <div className="mt-2.5 inline-block px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              ★ NPCI High-Value Cap Applied: Max ₹{result.capAmount} fee enforced
            </div>
          )}
        </div>

        {/* Visual Proportion Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Settlement Payout Share</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{netPercent.toFixed(1)}% to Bank</span>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${netPercent}%` }} 
              className="bg-emerald-500 h-full transition-all duration-300" 
              title={`Net Settlement: ${netPercent.toFixed(1)}%`}
            />
            {mdrPercent > 0 && (
              <div 
                style={{ width: `${mdrPercent}%` }} 
                className="bg-amber-500 h-full transition-all duration-300" 
                title={`Base MDR: ${mdrPercent.toFixed(2)}%`}
              />
            )}
            {gstPercent > 0 && (
              <div 
                style={{ width: `${gstPercent}%` }} 
                className="bg-purple-500 h-full transition-all duration-300" 
                title={`GST: ${gstPercent.toFixed(2)}%`}
              />
            )}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Net ({netPercent.toFixed(1)}%)
            </span>
            {!result.isExempt && (
              <>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  MDR {result.rateType === 'flat' ? `Flat ${formatINR(result.mdrAmount)}` : `(${result.baseRatePercent}%)`}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  18% GST
                </span>
              </>
            )}
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden text-xs sm:text-sm">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-800/30">
              <span className="text-slate-600 dark:text-slate-400">Gross Transaction</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">{formatINR(result.amount)}</span>
            </div>

            <div className="flex items-center justify-between px-3.5 py-2.5">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span>Base MDR Fee</span>
                {result.rateType === 'flat' ? (
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-medium">
                    Flat Rule
                  </span>
                ) : result.baseRatePercent > 0 ? (
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-medium">
                    {result.baseRatePercent}%
                  </span>
                ) : null}
              </div>
              <span className={`font-semibold font-mono ${result.mdrAmount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`}>
                {result.mdrAmount > 0 ? `-${formatINR(result.mdrAmount)}` : '₹0.00'}
              </span>
            </div>

            <div className="flex items-center justify-between px-3.5 py-2.5">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span>18% GST on MDR</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 rounded font-medium">
                  Tax Rule
                </span>
              </div>
              <span className={`font-semibold font-mono ${result.gstAmount > 0 ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500'}`}>
                {result.gstAmount > 0 ? `-${formatINR(result.gstAmount)}` : '₹0.00'}
              </span>
            </div>

            <div className="flex items-center justify-between px-3.5 py-2.5 bg-rose-50/40 dark:bg-rose-950/20">
              <span className="font-semibold text-rose-700 dark:text-rose-300">Total Deductions</span>
              <span className="font-bold text-rose-700 dark:text-rose-400 font-mono">
                {result.totalDeduction > 0 ? `-${formatINR(result.totalDeduction)}` : '₹0.00'}
              </span>
            </div>

            <div className="flex items-center justify-between px-3.5 py-3 bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold">
              <span className="text-emerald-800 dark:text-emerald-300">Final Payout Credited</span>
              <span className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                {formatINR(result.netSettlement)}
              </span>
            </div>
          </div>
        </div>

        {/* Exemption Note or Rule Alert */}
        {result.isExempt ? (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Merchant Benefit:</strong> {result.exemptionReason}
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <Scale className="w-4 h-4 shrink-0 text-blue-500 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Regulatory Reference:</strong> {result.circularRef}
            </p>
          </div>
        )}

        {/* Settlement Timing */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Settlement: Instant (T+0 QR) / T+1 (PG)</span>
          </span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">Direct Bank Credit</span>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
          <button
            onClick={handleCopyBreakdown}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Slip'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4 text-blue-500" />
            <span>Print Slip</span>
          </button>

          <button
            onClick={onReset}
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
