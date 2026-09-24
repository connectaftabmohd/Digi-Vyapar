import React, { useState, useId } from 'react';
import { 
  Building2, 
  Wallet, 
  CreditCard, 
  Globe, 
  Sliders, 
  Sparkles, 
  IndianRupee, 
  Info,
  CheckCircle2,
  AlertCircle,
  Zap,
  TrendingUp,
  Scale,
  Store
} from 'lucide-react';
import { PaymentMode, SpecialSectorId } from '../types';
import { 
  NPCI_MCC_CATEGORIES, 
  PAYMENT_MODES_INFO, 
  SPECIALIZED_SECTORS_FLAT5 
} from '../constants/mccData';
import { calculateUpiCharges, formatINR } from '../utils/calculator';
import { ResultCard } from './ResultCard';

const PRESET_AMOUNTS = [500, 1999, 2000, 5000, 25000, 75000, 100000];

export const Calculator: React.FC = () => {
  const [amountStr, setAmountStr] = useState<string>('5000');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('upi_p2m_standard');
  const [specialSectorId, setSpecialSectorId] = useState<SpecialSectorId>('utilities');
  const [mccCategoryId, setMccCategoryId] = useState<string>('general_retail');
  const [rupayRate, setRupayRate] = useState<number>(1.99);
  const [customRate, setCustomRate] = useState<number>(1.75);
  const [customFixedFee, setCustomFixedFee] = useState<number>(0);
  const [customGstEnabled, setCustomGstEnabled] = useState<boolean>(true);

  const amountInputId = useId();
  const sectorSelectId = useId();
  const categorySelectId = useId();

  const numericAmount = parseFloat(amountStr) || 0;

  const result = calculateUpiCharges({
    amount: numericAmount,
    paymentMode,
    specialSectorId,
    mccCategoryId,
    rupayRate,
    customRate,
    customFixedFee,
    customGstEnabled,
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setAmountStr(val);
  };

  const handlePresetClick = (preset: number) => {
    setAmountStr(preset.toString());
  };

  const handleReset = () => {
    setAmountStr('5000');
    setPaymentMode('upi_p2m_standard');
    setSpecialSectorId('utilities');
    setMccCategoryId('general_retail');
    setRupayRate(1.99);
    setCustomRate(1.75);
    setCustomFixedFee(0);
    setCustomGstEnabled(true);
  };

  const selectedSector = SPECIALIZED_SECTORS_FLAT5.find((s) => s.id === specialSectorId) || SPECIALIZED_SECTORS_FLAT5[0];
  const selectedCategory = NPCI_MCC_CATEGORIES.find((c) => c.id === mccCategoryId) || NPCI_MCC_CATEGORIES[0];

  return (
    <section id="calculator" className="py-6 sm:py-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Tool Heading / Blogger Meta Intro */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60 mb-3">
            <Scale className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Updated with NPCI Standard Deduction Rules (Oct 15, 2026 Framework)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Merchant UPI Charges & Standard Deduction Calculator
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Calculate exact merchant MDR deductions, 18% GST, high-value ₹300 caps, and net bank payouts under official NPCI P2M circular rules and sectoral deduction slabs.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Input Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">
            
            {/* 1. Transaction Amount Input */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor={amountInputId} className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Transaction / Bill Amount (₹)</span>
                </label>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                  {numericAmount > 0 ? formatINR(numericAmount) : 'Enter amount'}
                </span>
              </div>

              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 dark:text-slate-500 font-extrabold text-lg sm:text-xl">₹</span>
                </div>
                <input
                  id={amountInputId}
                  type="text"
                  inputMode="decimal"
                  value={amountStr}
                  onChange={handleAmountChange}
                  placeholder="e.g. 5000"
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 text-lg sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>Quick Test Slabs:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Exemption &le; ₹2,000 • Cap at ₹75,000+
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_AMOUNTS.map((preset) => {
                    const isCurrent = numericAmount === preset;
                    const isThreshold = preset === 2000;
                    const isCapLine = preset === 75000;

                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isCurrent
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isThreshold
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                            : isCapLine
                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-950/80 dark:text-blue-200 border border-blue-300 dark:border-blue-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        ₹{preset.toLocaleString('en-IN')}
                        {isThreshold && <span className="ml-1 text-[10px] font-bold text-amber-700 dark:text-amber-400">★ Cutoff</span>}
                        {isCapLine && <span className="ml-1 text-[10px] font-bold text-blue-700 dark:text-blue-400">★ ₹300 Cap</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Standard Deduction Rule & Payment Rail Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Select Applicable NPCI Deduction Rule
                </label>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Standard slabs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                {/* Rule 1: Standard UPI P2M */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi_p2m_standard')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMode === 'upi_p2m_standard'
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${paymentMode === 'upi_p2m_standard' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        Standard UPI P2M
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 shrink-0">
                        0.40% MDR
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      General retail, dining & supermarkets. Free &le; ₹2k; Capped at ₹300
                    </p>
                  </div>
                </button>

                {/* Rule 2: Specialized Essential Sectors (Flat ₹5) */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi_p2m_flat5')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMode === 'upi_p2m_flat5'
                      ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${paymentMode === 'upi_p2m_flat5' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        Essential Sectors
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                        Flat ₹5.00
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      Railways, Telecom, Insurance, Fuel, Utilities, Education, Agri
                    </p>
                  </div>
                </button>

                {/* Rule 3: Small Merchant / P2PM (0% Free) */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi_p2pm_small')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMode === 'upi_p2pm_small'
                      ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${paymentMode === 'upi_p2pm_small' ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        Small Merchant (P2PM)
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 shrink-0">
                        0% Free
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      Street vendors & retail stores receiving &le; ₹1 Lakh/month
                    </p>
                  </div>
                </button>

                {/* Rule 4: Capital Markets (0.02%) */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi_p2m_capital')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMode === 'upi_p2m_capital'
                      ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${paymentMode === 'upi_p2m_capital' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        Capital Markets
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 shrink-0">
                        0.02% MDR
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      Mutual Funds, Stockbrokers, Securities (Capped at ₹300)
                    </p>
                  </div>
                </button>

                {/* Rule 5: RuPay Credit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('rupay_credit')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMode === 'rupay_credit'
                      ? 'border-purple-500 bg-purple-50/60 dark:bg-purple-950/30 ring-2 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${paymentMode === 'rupay_credit' ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        RuPay CC on UPI
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 shrink-0">
                        ~1.99%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      Credit cards linked to UPI (0% &le; ₹2,000)
                    </p>
                  </div>
                </button>

                {/* Rule 6: PPI Wallets on UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('ppi_wallet')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMode === 'ppi_wallet'
                      ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 ring-2 ring-amber-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${paymentMode === 'ppi_wallet' ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        PPI Wallets on UPI
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0">
                        0.5% - 1.1%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      Paytm/PhonePe Wallet balances over UPI QR (Free &le; ₹2k)
                    </p>
                  </div>
                </button>
              </div>

              {/* Secondary Custom / PG Links */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setPaymentMode('payment_gateway')}
                  className={`text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
                    paymentMode === 'payment_gateway' ? 'text-purple-600 dark:text-purple-400 underline' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Payment Gateway (PG)</span>
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => setPaymentMode('custom')}
                  className={`text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
                    paymentMode === 'custom' ? 'text-slate-900 dark:text-white underline' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Custom Acquirer Rate</span>
                </button>
              </div>
            </div>

            {/* 3. Conditional Options & Slabs Based on Selection */}
            
            {/* Standard P2M Slabs Callout */}
            {paymentMode === 'upi_p2m_standard' && (
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/50 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-blue-950 dark:text-blue-200">
                  <span>NPCI Standard P2M Guidelines:</span>
                  <span className="font-mono text-blue-800 dark:text-blue-300">0.40% MDR + 18% GST</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900">
                    <span className="block font-bold text-emerald-600 dark:text-emerald-400">Transactions &le; ₹2,000</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">100% Free (₹0 MDR)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900">
                    <span className="block font-bold text-blue-600 dark:text-blue-400">Transactions &ge; ₹75,000</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">Capped at ₹300 per txn</span>
                  </div>
                </div>

                {numericAmount <= 2000 ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 p-2 rounded-lg border border-emerald-300/60 dark:border-emerald-800/60">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Amount is &le; ₹2,000: Zero MDR will be charged!</span>
                  </div>
                ) : numericAmount >= 75000 ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-950/60 p-2 rounded-lg border border-blue-300/60 dark:border-blue-800/60">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>High-Value Cap Active: MDR is capped at ₹300 (saving you ₹{((numericAmount * 0.004) - 300).toFixed(0)} in fees!).</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                    <Info className="w-4 h-4 shrink-0 text-blue-500" />
                    <span>Standard 0.40% rate applies (+ 18% GST).</span>
                  </div>
                )}
              </div>
            )}

            {/* Essential Sectors (Flat ₹5) Selector */}
            {paymentMode === 'upi_p2m_flat5' && (
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor={sectorSelectId} className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    Select Specialized Essential Sector
                  </label>
                  <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 font-mono">
                    Flat ₹5.00
                  </span>
                </div>

                <select
                  id={sectorSelectId}
                  value={specialSectorId}
                  onChange={(e) => setSpecialSectorId(e.target.value as SpecialSectorId)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm font-medium bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700/60 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {SPECIALIZED_SECTORS_FLAT5.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name} ({sec.mccCodes})
                    </option>
                  ))}
                </select>

                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
                  <strong>Scope:</strong> {selectedSector.examples}
                </p>

                {numericAmount <= 2000 ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 p-2 rounded-lg border border-emerald-300/60 dark:border-emerald-800/60">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Transactions &le; ₹2,000 are 100% Free under Essential Sector rules!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 p-2 rounded-lg border border-emerald-300/60 dark:border-emerald-800/60">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Flat ₹5.00 + ₹0.90 GST (18%) = ₹5.90 fixed deduction regardless of bill size.</span>
                  </div>
                )}
              </div>
            )}

            {/* Small Merchant P2PM Callout */}
            {paymentMode === 'upi_p2pm_small' && (
              <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/50 space-y-2.5">
                <div className="flex items-center gap-2 text-teal-900 dark:text-teal-200 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Small Merchant / P2PM Protection Active</span>
                </div>
                <p className="text-xs text-teal-800/90 dark:text-teal-300/90 leading-relaxed">
                  Under NPCI Circular FAQ Q7, retail merchants and street vendors who receive up to <strong>₹1,00,000 per month</strong> into their personal bank accounts via UPI QR codes enjoy <strong>0.00% Zero MDR</strong> on all payments.
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Note: If collections exceed ₹1 Lakh for 3 consecutive months, the account automatically transitions to the standard P2M tier (0.40%).
                </div>
              </div>
            )}

            {/* Capital Markets Callout */}
            {paymentMode === 'upi_p2m_capital' && (
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/50 space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-indigo-950 dark:text-indigo-200">
                  <span>Securities & Mutual Fund Slabs:</span>
                  <span className="font-mono text-indigo-800 dark:text-indigo-300">0.02% MDR (Capped at ₹300)</span>
                </div>
                <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed">
                  Governed under NPCI FAQ Q10 for stockbrokers, depository participants, and mutual fund platforms. Free &le; ₹2,000; 0.02% above ₹2,000.
                </p>
              </div>
            )}

            {/* PPI Wallet Dropdown */}
            {paymentMode === 'ppi_wallet' && (
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor={categorySelectId} className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                    <span>PPI Merchant Category (MCC Slabs)</span>
                  </label>
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 font-mono">
                    {selectedCategory.interchangeRate}%
                  </span>
                </div>

                <select
                  id={categorySelectId}
                  value={mccCategoryId}
                  onChange={(e) => setMccCategoryId(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm font-medium bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700/60 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {NPCI_MCC_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.interchangeRate}% {cat.capAmount ? `• Max ₹${cat.capAmount}` : ''})
                    </option>
                  ))}
                </select>

                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                  {selectedCategory.description} • {selectedCategory.code}
                </p>

                {numericAmount <= 2000 ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 p-2 rounded-lg border border-emerald-300/60 dark:border-emerald-800/60">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Amount is &le; ₹2,000: Zero interchange charged!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 p-2 rounded-lg border border-amber-300/60 dark:border-amber-800/60">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Amount &gt; ₹2,000: {selectedCategory.interchangeRate}% interchange + 18% GST applies.</span>
                  </div>
                )}
              </div>
            )}

            {/* RuPay Credit Slider */}
            {paymentMode === 'rupay_credit' && (
              <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-purple-950 dark:text-purple-200">
                    RuPay Credit Card MDR Rate (%)
                  </label>
                  <span className="text-xs font-bold text-purple-800 dark:text-purple-300 font-mono">
                    {rupayRate}%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    value={rupayRate}
                    onChange={(e) => setRupayRate(parseFloat(e.target.value))}
                    className="flex-1 accent-purple-600 h-2 bg-purple-200 dark:bg-purple-900 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold px-2 py-1 bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 rounded-lg">
                    {rupayRate.toFixed(2)}%
                  </span>
                </div>

                <p className="text-[11px] text-purple-800/80 dark:text-purple-300/80">
                  Transactions &le; ₹2,000 are 100% Free under the small ticket waiver. Standard rate above ₹2,000 is ~1.99%.
                </p>
              </div>
            )}

            {/* Custom / PG Fields */}
            {(paymentMode === 'payment_gateway' || paymentMode === 'custom') && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      MDR Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      min="0"
                      max="10"
                      value={customRate}
                      onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
                      className="w-full py-2 px-3 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. 1.8"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Fixed Fee per Txn (₹)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="100"
                      value={customFixedFee}
                      onChange={(e) => setCustomFixedFee(parseFloat(e.target.value) || 0)}
                      className="w-full py-2 px-3 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. 0 or 2"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Apply 18% GST on charges?
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customGstEnabled}
                      onChange={(e) => setCustomGstEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Quick Helper Callout */}
            <div className="pt-1 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Info className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
              <span>
                <strong>Blogger Note:</strong> Consumers paying via UPI are <strong>never charged</strong> any fee (100% free). MDR is strictly an acquirer settlement charge deducted from merchant settlements.
              </span>
            </div>
          </div>

          {/* Result Card Column (5 cols) */}
          <div className="lg:col-span-5">
            <ResultCard result={result} onReset={handleReset} />
          </div>
        </div>
      </div>
    </section>
  );
};
