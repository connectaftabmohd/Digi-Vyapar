import React, { useState } from 'react';
import { 
  TrendingUp, 
  Layers, 
  PiggyBank, 
  HelpCircle,
  Building2,
  Wallet,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Scale
} from 'lucide-react';
import { calculateMonthlyProjections, formatINR, formatCompactINR } from '../utils/calculator';

export const MonthlyTurnoverCalculator: React.FC = () => {
  const [turnover, setTurnover] = useState<number>(350000); // 3.5 Lakhs
  const [avgTicket, setAvgTicket] = useState<number>(1500);
  const [bankRatio, setBankRatio] = useState<number>(80);
  const [ppiRatio, setPpiRatio] = useState<number>(10);
  const [rupayRatio, setRupayRatio] = useState<number>(10);

  const projection = calculateMonthlyProjections({
    monthlyTurnover: turnover,
    avgTicketSize: avgTicket,
    bankUpiRatio: bankRatio,
    ppiRatio: ppiRatio,
    rupayRatio: rupayRatio,
  });

  const isSmallMerchantExempt = turnover <= 100000;
  const isTicketExempt = avgTicket <= 2000;

  return (
    <section id="turnover" className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-300/60 dark:border-blue-800/60 mb-2">
            <Scale className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Store Level Volume & Deduction Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Monthly Turnover & P2M Deduction Audit
          </h2>
          <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Simulate your monthly deductions under the NPCI standard framework. Test if you qualify for the ₹1 Lakh/month small merchant waiver or the ₹2,000 ticket exemption.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Controls Form */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
            
            {/* Monthly Volume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Monthly UPI Volume
                </label>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                    {formatINR(turnover, 0)} ({formatCompactINR(turnover)})
                  </span>
                  {isSmallMerchantExempt && (
                    <span className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      ★ &le; ₹1L Small Merchant Waiver!
                    </span>
                  )}
                </div>
              </div>
              <input
                type="range"
                min="25000"
                max="5000000"
                step="25000"
                value={turnover}
                onChange={(e) => setTurnover(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>₹25k</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹1 Lakh (P2PM Line)</span>
                <span>₹10 Lakh</span>
                <span>₹50 Lakh</span>
              </div>
            </div>

            {/* Average Bill / Transaction Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Average Bill / Ticket Size
                  </label>
                  <span title="Transactions ≤ ₹2,000 are 100% exempt from MDR" className="cursor-help text-slate-400">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </span>
                </div>
                <span className={`text-sm font-bold font-mono ${isTicketExempt ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {formatINR(avgTicket, 0)} {isTicketExempt ? '• (≤₹2k Exempt!)' : '• (>₹2k Charged)'}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>₹100</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹2,000 (Exempt Line)</span>
                <span>₹5,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Payment Mix Distribution */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>Customer Payment Mix (%)</span>
                </label>
                <span className="text-[11px] text-slate-500">Total: {bankRatio + ppiRatio + rupayRatio}%</span>
              </div>

              {/* Slider 1: Bank UPI */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-blue-500" />
                    Standard Bank UPI (P2M)
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {bankRatio}% {isSmallMerchantExempt || isTicketExempt ? '(0% Free)' : '(0.40% MDR)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bankRatio}
                  onChange={(e) => {
                    const newBank = Number(e.target.value);
                    setBankRatio(newBank);
                    const remainder = 100 - newBank;
                    setPpiRatio(Math.round(remainder / 2));
                    setRupayRatio(remainder - Math.round(remainder / 2));
                  }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: PPI Wallets */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Wallet className="w-3.5 h-3.5 text-amber-500" />
                    PPI Wallets (Paytm/Amazon)
                  </span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">
                    {ppiRatio}% {isTicketExempt ? '(0% Free)' : '(1.10%)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={100 - bankRatio}
                  value={ppiRatio}
                  onChange={(e) => {
                    const newPpi = Number(e.target.value);
                    setPpiRatio(newPpi);
                    setRupayRatio(100 - bankRatio - newPpi);
                  }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Slider 3: RuPay CC */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <CreditCard className="w-3.5 h-3.5 text-purple-500" />
                    RuPay Credit Card on UPI
                  </span>
                  <span className="font-mono text-purple-600 dark:text-purple-400">
                    {rupayRatio}% {isTicketExempt ? '(0% Free)' : '(1.99%)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={100 - bankRatio}
                  value={rupayRatio}
                  onChange={(e) => {
                    const newRupay = Number(e.target.value);
                    setRupayRatio(newRupay);
                    setPpiRatio(100 - bankRatio - newRupay);
                  }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Top Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5">
                <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Monthly Bank Payout
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono mt-1">
                  {formatINR(projection.netMonthlySettlement, 0)}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400/90 mt-1 font-medium">
                  {((projection.netMonthlySettlement / projection.monthlyTurnover) * 100).toFixed(2)}% of total turnover retained
                </div>
              </div>

              <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
                <div className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                  Monthly Deductions (MDR + GST)
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 font-mono mt-1">
                  {formatINR(projection.totalMonthlyDeductions, 2)}
                </div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400/90 mt-1 font-medium">
                  Effective rate: {projection.effectiveRate.toFixed(3)}%
                </div>
              </div>
            </div>

            {/* Detailed Monthly Statement */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Monthly NPCI Settlement Statement
                </span>
                <span className="text-xs font-medium text-slate-500 font-mono">
                  ~{projection.totalTransactions.toLocaleString('en-IN')} transactions/mo
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span>Gross Monthly Volume:</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">{formatINR(projection.monthlyTurnover, 0)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Standard Bank UPI Volume ({bankRatio}%):
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">
                    {formatINR(projection.bankUpiVolume, 0)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    PPI Wallets Volume ({ppiRatio}%):
                  </span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{formatINR(projection.ppiVolume, 0)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    RuPay Credit Volume ({rupayRatio}%):
                  </span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{formatINR(projection.rupayVolume, 0)}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-rose-600 dark:text-rose-400">
                  <span>Base MDR Deductions:</span>
                  <span className="font-bold font-mono">-{formatINR(projection.totalMonthlyCharges, 2)}</span>
                </div>

                <div className="flex justify-between items-center text-purple-600 dark:text-purple-400">
                  <span>18% GST on MDR deductions:</span>
                  <span className="font-bold font-mono">-{formatINR(projection.totalMonthlyGst, 2)}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center font-bold text-slate-900 dark:text-white">
                  <span>Annualized Cost (12 Months):</span>
                  <span className="text-base font-mono text-blue-600 dark:text-blue-400">
                    {formatINR(projection.annualDeductions, 0)}/yr
                  </span>
                </div>
              </div>

              {/* Exemption Insight Banner */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-start gap-2.5">
                <PiggyBank className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {isSmallMerchantExempt 
                      ? 'Protected under P2PM Exemption!' 
                      : isTicketExempt 
                      ? 'Small Ticket Exemption Active!' 
                      : 'Regulatory Optimization Insight:'}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                    {isSmallMerchantExempt
                      ? `Your monthly volume is ≤ ₹1,00,000. Under NPCI Circular FAQ Q7, you are protected by the small merchant waiver and pay ₹0.00 MDR fees across all payment modes!`
                      : isTicketExempt
                      ? `Your average bill is ₹${avgTicket} (under the ₹2,000 threshold). All P2M UPI, wallet, and RuPay card payments are completely exempt from MDR!`
                      : `Your turnover exceeds ₹1 Lakh/month and average bill is above ₹2,000. Standard P2M deductions of 0.40% apply. You still benefit from the ₹300 per transaction high-value cap.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
