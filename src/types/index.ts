export type PaymentMode = 
  | 'upi_p2m_standard'    // NPCI Standard UPI P2M (0.40% > ₹2,000, capped at ₹300 for ₹75k+)
  | 'upi_p2m_flat5'       // Specialized Sectors (Flat ₹5 > ₹2,000: Railways, Fuel, Telecom, Insurance, Utilities, Education, Agri)
  | 'upi_p2m_capital'     // Capital Markets (0.02% > ₹2,000, capped at ₹300)
  | 'upi_p2pm_small'      // Small Merchant / P2PM (≤ ₹1 Lakh/mo turnover: 100% Free 0% MDR)
  | 'bank_upi'            // Legacy/Alias for Small Merchant Bank UPI (0% MDR)
  | 'ppi_wallet'          // PPI Wallets (Paytm, PhonePe, Amazon Pay Wallet on UPI: 0.5% - 1.1%)
  | 'rupay_credit'        // RuPay Credit Card on UPI (0% ≤ ₹2,000, ~1.99% above)
  | 'payment_gateway'     // Online Payment Gateway UPI (e.g. Razorpay, Cashfree)
  | 'custom';             // Custom MDR & fixed fee

export type SpecialSectorId = 
  | 'railways'
  | 'telecom'
  | 'insurance'
  | 'fuel'
  | 'utilities'
  | 'education'
  | 'agriculture';

export interface SpecialSector {
  id: SpecialSectorId;
  name: string;
  shortName: string;
  iconName: string;
  examples: string;
  mccCodes: string;
  feeStructure: string;
}

export interface StandardDeductionRule {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  thresholdCondition: string;
  rateType: 'percentage' | 'flat' | 'exempt';
  rateDisplay: string;
  baseRateValue: number;
  capDisplay?: string;
  capAmount?: number;
  exemptionRule: string;
  effectiveDate: string;
  eligibleMerchants: string;
  exampleCalculation: string;
}

export interface MccCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  interchangeRate: number; // in percentage e.g. 0.5, 0.7, 0.9, 1.1
  capAmount?: number;      // e.g. ₹15 for Fuel
  badge: string;
}

export interface CalculationResult {
  amount: number;
  paymentMode: PaymentMode;
  categoryName: string;
  isExempt: boolean;
  exemptionReason?: string;
  ruleBadge: string;
  rateType: 'percentage' | 'flat' | 'exempt';
  baseRatePercent: number;
  fixedFee: number;
  mdrAmount: number;
  gstAmount: number;
  totalDeduction: number;
  netSettlement: number;
  effectiveRatePercent: number;
  capApplied: boolean;
  capAmount?: number;
  circularRef: string;
  specialSectorName?: string;
}

export interface MonthlyProjectionResult {
  monthlyTurnover: number;
  totalTransactions: number;
  avgTicketSize: number;
  bankUpiVolume: number;
  ppiVolume: number;
  rupayVolume: number;
  isSmallMerchantExempt: boolean;
  totalMonthlyCharges: number;
  totalMonthlyGst: number;
  totalMonthlyDeductions: number;
  netMonthlySettlement: number;
  annualDeductions: number;
  effectiveRate: number;
  savingsFromExemptions: number;
}
