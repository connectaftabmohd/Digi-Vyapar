import { 
  CalculationResult, 
  MonthlyProjectionResult, 
  PaymentMode, 
  SpecialSectorId 
} from '../types';
import { 
  NPCI_MCC_CATEGORIES, 
  SPECIALIZED_SECTORS_FLAT5 
} from '../constants/mccData';

export const formatINR = (val: number, decimals: number = 2): string => {
  if (isNaN(val) || val === null || val === undefined) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
};

export const formatNumberOnly = (val: number, decimals: number = 2): string => {
  if (isNaN(val) || val === null || val === undefined) return '0.00';
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
};

export const formatCompactINR = (val: number): string => {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  if (val >= 1000) {
    return `₹${(val / 1000).toFixed(1)}k`;
  }
  return formatINR(val, 0);
};

export interface CalculateParams {
  amount: number;
  paymentMode: PaymentMode;
  specialSectorId?: SpecialSectorId;
  mccCategoryId?: string;
  rupayRate?: number; // e.g. 1.99
  customRate?: number; // e.g. 1.8
  customFixedFee?: number; // e.g. 0
  customGstEnabled?: boolean;
}

export const calculateUpiCharges = ({
  amount,
  paymentMode,
  specialSectorId = 'utilities',
  mccCategoryId = 'general_retail',
  rupayRate = 1.99,
  customRate = 1.75,
  customFixedFee = 0,
  customGstEnabled = true,
}: CalculateParams): CalculationResult => {
  const safeAmount = Math.max(0, amount || 0);

  // 1. Small Merchant / P2PM Rule (≤ ₹1 Lakh/month turnover) & Legacy Bank UPI
  if (paymentMode === 'upi_p2pm_small' || paymentMode === 'bank_upi') {
    return {
      amount: safeAmount,
      paymentMode: 'upi_p2pm_small',
      categoryName: 'Small Merchant / P2PM (≤ ₹1 Lakh / Month)',
      isExempt: true,
      exemptionReason: '100% Free! Small merchants receiving up to ₹1,00,000/month via personal QR codes have 0% MDR under NPCI P2PM regulations.',
      ruleBadge: 'P2PM 0% Free Mandate',
      rateType: 'exempt',
      baseRatePercent: 0,
      fixedFee: 0,
      mdrAmount: 0,
      gstAmount: 0,
      totalDeduction: 0,
      netSettlement: safeAmount,
      effectiveRatePercent: 0,
      capApplied: false,
      circularRef: 'NPCI Circular FAQ Q7: Zero charges for merchants receiving up to ₹1 Lakh/month into personal accounts.',
    };
  }

  // 2. Standard UPI P2M (0.40% above ₹2,000 with ₹300 Cap at ₹75k+)
  if (paymentMode === 'upi_p2m_standard') {
    const isExempt = safeAmount <= 2000;

    if (isExempt) {
      return {
        amount: safeAmount,
        paymentMode: 'upi_p2m_standard',
        categoryName: 'Standard UPI P2M (≤ ₹2,000 Small Ticket Relief)',
        isExempt: true,
        exemptionReason: '100% Free! The NPCI standard deduction framework mandates zero MDR on all P2M transactions up to ₹2,000.',
        ruleBadge: '≤ ₹2,000 Zero MDR Relief',
        rateType: 'exempt',
        baseRatePercent: 0.40,
        fixedFee: 0,
        mdrAmount: 0,
        gstAmount: 0,
        totalDeduction: 0,
        netSettlement: safeAmount,
        effectiveRatePercent: 0,
        capApplied: false,
        circularRef: 'NPCI Circular FAQ Q5 & Q8: Standard 0.4% MDR applies only to transactions above ₹2,000.',
      };
    }

    const rawMdr = (safeAmount * 0.40) / 100;
    const capApplied = rawMdr > 300;
    const mdrAmount = capApplied ? 300 : rawMdr;
    const gstAmount = mdrAmount * 0.18;
    const totalDeduction = mdrAmount + gstAmount;
    const netSettlement = Math.max(0, safeAmount - totalDeduction);
    const effectiveRatePercent = safeAmount > 0 ? (totalDeduction / safeAmount) * 100 : 0;

    return {
      amount: safeAmount,
      paymentMode: 'upi_p2m_standard',
      categoryName: 'Standard UPI P2M Merchant Rate',
      isExempt: false,
      ruleBadge: capApplied ? '₹300 Max Cap Enforced' : '0.40% Standard MDR',
      rateType: 'percentage',
      baseRatePercent: 0.40,
      fixedFee: 0,
      mdrAmount,
      gstAmount,
      totalDeduction,
      netSettlement,
      effectiveRatePercent,
      capApplied,
      capAmount: 300,
      circularRef: 'NPCI Circular FAQ Q8 & Q9: 0.4% standard MDR on transactions > ₹2,000, capped at ₹300 for ₹75,000+.',
    };
  }

  // 3. Specialized Essential Sectors (Flat ₹5 per txn > ₹2,000)
  if (paymentMode === 'upi_p2m_flat5') {
    const sector = SPECIALIZED_SECTORS_FLAT5.find((s) => s.id === specialSectorId) || SPECIALIZED_SECTORS_FLAT5[0];
    const isExempt = safeAmount <= 2000;

    if (isExempt) {
      return {
        amount: safeAmount,
        paymentMode: 'upi_p2m_flat5',
        categoryName: `${sector.name} (≤ ₹2,000 Exemption)`,
        isExempt: true,
        exemptionReason: `100% Free! Transactions up to ₹2,000 in ${sector.name} are completely exempt from MDR fees.`,
        ruleBadge: '≤ ₹2,000 Sector Exemption',
        rateType: 'exempt',
        baseRatePercent: 0,
        fixedFee: 0,
        mdrAmount: 0,
        gstAmount: 0,
        totalDeduction: 0,
        netSettlement: safeAmount,
        effectiveRatePercent: 0,
        capApplied: false,
        circularRef: 'NPCI Circular FAQ Q10: Flat ₹5 sector rule applies only above ₹2,000.',
        specialSectorName: sector.name,
      };
    }

    const mdrAmount = 5.0; // Flat ₹5
    const gstAmount = 5.0 * 0.18; // ₹0.90
    const totalDeduction = mdrAmount + gstAmount; // ₹5.90
    const netSettlement = Math.max(0, safeAmount - totalDeduction);
    const effectiveRatePercent = safeAmount > 0 ? (totalDeduction / safeAmount) * 100 : 0;

    return {
      amount: safeAmount,
      paymentMode: 'upi_p2m_flat5',
      categoryName: `${sector.name} (Specialized Sector)`,
      isExempt: false,
      ruleBadge: 'Flat ₹5.00 Standard Rule',
      rateType: 'flat',
      baseRatePercent: 0,
      fixedFee: 5.0,
      mdrAmount,
      gstAmount,
      totalDeduction,
      netSettlement,
      effectiveRatePercent,
      capApplied: false,
      circularRef: 'NPCI Circular FAQ Q10: Flat MDR of ₹5 per transaction for railways, telecom, insurance, fuel, utilities, education, agri.',
      specialSectorName: sector.name,
    };
  }

  // 4. Capital Markets & Financial Securities (0.02% above ₹2,000 with ₹300 Cap)
  if (paymentMode === 'upi_p2m_capital') {
    const isExempt = safeAmount <= 2000;

    if (isExempt) {
      return {
        amount: safeAmount,
        paymentMode: 'upi_p2m_capital',
        categoryName: 'Capital Markets & Securities (≤ ₹2,000 Relief)',
        isExempt: true,
        exemptionReason: '100% Free! Capital market UPI transactions up to ₹2,000 are completely exempt from MDR.',
        ruleBadge: '≤ ₹2,000 Exemption',
        rateType: 'exempt',
        baseRatePercent: 0.02,
        fixedFee: 0,
        mdrAmount: 0,
        gstAmount: 0,
        totalDeduction: 0,
        netSettlement: safeAmount,
        effectiveRatePercent: 0,
        capApplied: false,
        circularRef: 'NPCI Circular FAQ Q10: 0.02% MDR for securities & mutual funds applies only above ₹2,000.',
      };
    }

    const rawMdr = (safeAmount * 0.02) / 100;
    const capApplied = rawMdr > 300;
    const mdrAmount = capApplied ? 300 : rawMdr;
    const gstAmount = mdrAmount * 0.18;
    const totalDeduction = mdrAmount + gstAmount;
    const netSettlement = Math.max(0, safeAmount - totalDeduction);
    const effectiveRatePercent = safeAmount > 0 ? (totalDeduction / safeAmount) * 100 : 0;

    return {
      amount: safeAmount,
      paymentMode: 'upi_p2m_capital',
      categoryName: 'Capital Markets, Mutual Funds & Stockbrokers',
      isExempt: false,
      ruleBadge: capApplied ? '₹300 Cap Applied' : '0.02% Securities MDR',
      rateType: 'percentage',
      baseRatePercent: 0.02,
      fixedFee: 0,
      mdrAmount,
      gstAmount,
      totalDeduction,
      netSettlement,
      effectiveRatePercent,
      capApplied,
      capAmount: 300,
      circularRef: 'NPCI Circular FAQ Q10: 0.02% MDR capped at ₹300 per transaction for mutual funds, securities, stockbrokers.',
    };
  }

  // 5. Prepaid Payment Instruments (PPI Wallets on UPI)
  if (paymentMode === 'ppi_wallet') {
    const category = NPCI_MCC_CATEGORIES.find((c) => c.id === mccCategoryId) || NPCI_MCC_CATEGORIES[0];
    const isExempt = safeAmount <= 2000;

    if (isExempt) {
      return {
        amount: safeAmount,
        paymentMode: 'ppi_wallet',
        categoryName: `${category.name} (≤ ₹2,000 PPI Exemption)`,
        isExempt: true,
        exemptionReason: 'Under ₹2,000 PPI wallet transactions are 100% exempt from interchange charges.',
        ruleBadge: 'PPI Wallet ≤ ₹2k Free',
        rateType: 'exempt',
        baseRatePercent: category.interchangeRate,
        fixedFee: 0,
        mdrAmount: 0,
        gstAmount: 0,
        totalDeduction: 0,
        netSettlement: safeAmount,
        effectiveRatePercent: 0,
        capApplied: false,
        circularRef: 'NPCI PPI Interoperability Circular: Zero interchange up to ₹2,000.',
      };
    }

    const rawMdr = (safeAmount * category.interchangeRate) / 100;
    const hasCap = category.capAmount !== undefined && category.capAmount > 0;
    const capApplied = hasCap && rawMdr > (category.capAmount || 0);
    const mdrAmount = capApplied ? (category.capAmount || 0) : rawMdr;
    const gstAmount = mdrAmount * 0.18;
    const totalDeduction = mdrAmount + gstAmount;
    const netSettlement = Math.max(0, safeAmount - totalDeduction);
    const effectiveRatePercent = safeAmount > 0 ? (totalDeduction / safeAmount) * 100 : 0;

    return {
      amount: safeAmount,
      paymentMode: 'ppi_wallet',
      categoryName: `${category.name} (PPI Wallet)`,
      isExempt: false,
      ruleBadge: `${category.interchangeRate}% PPI Interchange`,
      rateType: 'percentage',
      baseRatePercent: category.interchangeRate,
      fixedFee: 0,
      mdrAmount,
      gstAmount,
      totalDeduction,
      netSettlement,
      effectiveRatePercent,
      capApplied,
      capAmount: category.capAmount,
      circularRef: 'NPCI PPI Circular: 0.5% - 1.1% interchange across merchant categories for wallet spends > ₹2,000.',
    };
  }

  // 6. RuPay Credit Card on UPI
  if (paymentMode === 'rupay_credit') {
    const isExempt = safeAmount <= 2000;
    const rate = Number(rupayRate) || 1.99;

    if (isExempt) {
      return {
        amount: safeAmount,
        paymentMode: 'rupay_credit',
        categoryName: 'RuPay CC on UPI (≤ ₹2,000 Small Merchant Relief)',
        isExempt: true,
        exemptionReason: 'RuPay Credit Card on UPI transactions up to ₹2,000 have 0% MDR per NPCI circular.',
        ruleBadge: 'RuPay CC ≤ ₹2k Free',
        rateType: 'exempt',
        baseRatePercent: rate,
        fixedFee: 0,
        mdrAmount: 0,
        gstAmount: 0,
        totalDeduction: 0,
        netSettlement: safeAmount,
        effectiveRatePercent: 0,
        capApplied: false,
        circularRef: 'NPCI Circular: Zero MDR on RuPay credit cards for transactions ≤ ₹2,000.',
      };
    }

    const mdrAmount = (safeAmount * rate) / 100;
    const gstAmount = mdrAmount * 0.18;
    const totalDeduction = mdrAmount + gstAmount;
    const netSettlement = Math.max(0, safeAmount - totalDeduction);
    const effectiveRatePercent = safeAmount > 0 ? (totalDeduction / safeAmount) * 100 : 0;

    return {
      amount: safeAmount,
      paymentMode: 'rupay_credit',
      categoryName: 'RuPay Credit Card on UPI',
      isExempt: false,
      ruleBadge: `${rate.toFixed(2)}% RuPay CC MDR`,
      rateType: 'percentage',
      baseRatePercent: rate,
      fixedFee: 0,
      mdrAmount,
      gstAmount,
      totalDeduction,
      netSettlement,
      effectiveRatePercent,
      capApplied: false,
      circularRef: 'NPCI Circular: Standard credit MDR (~1.99%) applies on RuPay transactions > ₹2,000.',
    };
  }

  // 7. Payment Gateway UPI
  if (paymentMode === 'payment_gateway') {
    const rate = Number(customRate) || 0;
    const fixedFee = Number(customFixedFee) || 0;
    const mdrAmount = (safeAmount * rate) / 100 + fixedFee;
    const gstAmount = customGstEnabled ? mdrAmount * 0.18 : 0;
    const totalDeduction = mdrAmount + gstAmount;
    const netSettlement = Math.max(0, safeAmount - totalDeduction);
    const effectiveRatePercent = safeAmount > 0 ? (totalDeduction / safeAmount) * 100 : 0;

    return {
      amount: safeAmount,
      paymentMode: 'payment_gateway',
      categoryName: 'Online Payment Gateway (Web / API)',
      isExempt: totalDeduction === 0,
      exemptionReason: totalDeduction === 0 ? 'Zero rate payment gateway configuration' : undefined,
      ruleBadge: `${rate.toFixed(2)}% PG Commercial Rate`,
      rateType: 'percentage',
      baseRatePercent: rate,
      fixedFee,
      mdrAmount,
      gstAmount,
      totalDeduction,
      netSettlement,
      effectiveRatePercent,
      capApplied: false,
      circularRef: 'Commercial Payment Aggregator Pricing Schedule',
    };
  }

  // 8. Custom Soundbox / Acquirer POS
  const rate = Number(customRate) || 0;
  const fixedFee = Number(customFixedFee) || 0;
  const mdrAmount = (safeAmount * rate) / 100 + fixedFee;
  const gstAmount = customGstEnabled ? mdrAmount * 0.18 : 0;
  const totalDeduction = mdrAmount + gstAmount;
  const netSettlement = Math.max(0, safeAmount - totalDeduction);
  const effectiveRatePercent = safeAmount > 0 ? (totalDeduction / safeAmount) * 100 : 0;

  return {
    amount: safeAmount,
    paymentMode: 'custom',
    categoryName: 'Custom POS / Soundbox Acquirer Rate',
    isExempt: totalDeduction === 0,
    exemptionReason: totalDeduction === 0 ? 'Custom zero MDR profile' : undefined,
    ruleBadge: `${rate.toFixed(2)}% Custom Soundbox Rate`,
    rateType: 'percentage',
    baseRatePercent: rate,
    fixedFee,
    mdrAmount,
    gstAmount,
    totalDeduction,
    netSettlement,
    effectiveRatePercent,
    capApplied: false,
    circularRef: 'Custom Acquirer Contract Agreement',
  };
};

export const calculateMonthlyProjections = ({
  monthlyTurnover,
  avgTicketSize,
  bankUpiRatio = 80, // 80%
  ppiRatio = 10,      // 10%
  rupayRatio = 10,    // 10%
  ppiRate = 1.1,      // 1.1%
  rupayRate = 1.99,   // 1.99%
  standardP2mRate = 0.40, // 0.40%
}: {
  monthlyTurnover: number;
  avgTicketSize: number;
  bankUpiRatio?: number;
  ppiRatio?: number;
  rupayRatio?: number;
  ppiRate?: number;
  rupayRate?: number;
  standardP2mRate?: number;
}): MonthlyProjectionResult => {
  const safeTurnover = Math.max(0, monthlyTurnover || 0);
  const safeTicket = Math.max(1, avgTicketSize || 500);
  const totalTransactions = Math.round(safeTurnover / safeTicket);

  const bankVolume = (safeTurnover * bankUpiRatio) / 100;
  const ppiVolume = (safeTurnover * ppiRatio) / 100;
  const rupayVolume = (safeTurnover * rupayRatio) / 100;

  // NPCI Small Merchant (P2PM) exemption: Monthly collections up to ₹1,00,000 have 0% fee
  const isSmallMerchantExempt = safeTurnover <= 100000;

  // Transaction-level exemption threshold (≤ ₹2,000 is 100% Free)
  const isTicketExempt = safeTicket <= 2000;

  let totalMonthlyCharges = 0;
  let savingsFromExemptions = 0;

  if (isSmallMerchantExempt) {
    // 100% Free under P2PM guideline!
    totalMonthlyCharges = 0;
    // Calculate what merchant would have paid without P2PM exemption
    const potentialCharges = (bankVolume * standardP2mRate) / 100 + (ppiVolume * ppiRate) / 100 + (rupayVolume * rupayRate) / 100;
    savingsFromExemptions = potentialCharges * 1.18;
  } else if (isTicketExempt) {
    // Ticket size is <= 2,000 -> 0% MDR on all rails under NPCI rules!
    totalMonthlyCharges = 0;
    const potentialCharges = (bankVolume * standardP2mRate) / 100 + (ppiVolume * ppiRate) / 100 + (rupayVolume * rupayRate) / 100;
    savingsFromExemptions = potentialCharges * 1.18;
  } else {
    // Transactions > ₹2,000 and merchant > ₹1 Lakh/month
    // Standard P2M MDR (0.40%) applies to direct bank UPI volume
    const bankCharges = (bankVolume * standardP2mRate) / 100;
    const ppiCharges = (ppiVolume * ppiRate) / 100;
    const rupayCharges = (rupayVolume * rupayRate) / 100;
    totalMonthlyCharges = bankCharges + ppiCharges + rupayCharges;
  }

  const totalMonthlyGst = totalMonthlyCharges * 0.18;
  const totalMonthlyDeductions = totalMonthlyCharges + totalMonthlyGst;
  const netMonthlySettlement = safeTurnover - totalMonthlyDeductions;
  const annualDeductions = totalMonthlyDeductions * 12;
  const effectiveRate = safeTurnover > 0 ? (totalMonthlyDeductions / safeTurnover) * 100 : 0;

  return {
    monthlyTurnover: safeTurnover,
    totalTransactions,
    avgTicketSize: safeTicket,
    bankUpiVolume: bankVolume,
    ppiVolume,
    rupayVolume,
    isSmallMerchantExempt,
    totalMonthlyCharges,
    totalMonthlyGst,
    totalMonthlyDeductions,
    netMonthlySettlement,
    annualDeductions,
    effectiveRate,
    savingsFromExemptions,
  };
};
