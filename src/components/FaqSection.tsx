import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Scale } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    category: 'Consumer Policy',
    question: 'Will consumers be charged for making UPI payments?',
    answer: 'No, consumers will continue to use UPI 100% free of cost for all their payments. The Merchant Discount Rate (MDR) is strictly a charge within the merchant payment acquiring ecosystem and cannot be passed on to retail customers.',
  },
  {
    category: 'Regulatory Scope',
    question: 'Are all UPI transactions subject to MDR under the new rules?',
    answer: 'No. The MDR applies ONLY to Person-to-Merchant (P2M) UPI transactions exceeding ₹2,000. All transactions up to ₹2,000 (≤ ₹2,000) remain completely exempt (0% MDR) to support micro-payments and small purchases.',
  },
  {
    category: 'Small Merchants (P2PM)',
    question: 'Will small merchants, street vendors, and tea stalls be affected by the new MDR rule?',
    answer: 'Small merchants, including roadside vendors and small retail shops who receive up to ₹1,00,000 (₹1 Lakh) per month through UPI QR codes into their personal bank accounts (categorized as Person-to-Person-Merchant or P2PM), continue to enjoy ZERO (0%) MDR charges. If a small merchant receives more than ₹1 Lakh per month for three consecutive months, they transition to the standard P2M category.',
  },
  {
    category: 'Standard Rates',
    question: 'What is the standard MDR rate for eligible UPI P2M transactions?',
    answer: 'A standard MDR of 0.40% is applied to eligible P2M UPI transactions exceeding ₹2,000. For example, on a ₹5,000 bill, the MDR is ₹20.00 (+ 18% GST of ₹3.60 = ₹23.60 total deduction).',
  },
  {
    category: 'High-Value Cap',
    question: 'Is there a cap on the MDR for high-value transactions?',
    answer: 'Yes! For P2M transactions of ₹75,000 and above, the MDR is capped at a maximum of ₹300 per transaction. For instance, on a ₹1,00,000 transaction (where 0.4% would normally be ₹400), the MDR is capped at ₹300.00 (+ 18% GST of ₹54.00 = ₹354.00).',
  },
  {
    category: 'Essential Sectors',
    question: 'Which sectors have the special Flat ₹5 MDR rate?',
    answer: 'Seven vital public sectors have a flat MDR of ₹5 per transaction for payments above ₹2,000: (1) Railways (IRCTC & station counters), (2) Telecommunications & broadband, (3) Insurance premiums, (4) Fuel stations (Petrol/Diesel/CNG), (5) Government & utility bills (Electricity, Water, Gas), (6) Educational institutions (Schools, Colleges), and (7) Agricultural inputs.',
  },
  {
    category: 'Capital Markets',
    question: 'What is the rate for Mutual Funds, Stockbrokers, and Securities?',
    answer: 'Payments related to mutual funds, securities, stockbrokers, asset management, and dealers attract an MDR of 0.02%, capped at ₹300 per transaction. Transactions up to ₹2,000 in this sector are also completely free.',
  },
  {
    category: 'P2P Transfers',
    question: 'What about Person-to-Person (P2P) transfers between family and friends?',
    answer: 'Person-to-Person (P2P) money transfers between individuals remain 100% free, irrespective of the transaction amount.',
  },
  {
    category: 'Taxation & GST',
    question: 'How is 18% GST charged and can merchants claim Input Tax Credit (ITC)?',
    answer: 'GST of 18% is levied exclusively on the processing MDR fee, NEVER on your customer’s gross bill value. For example, on a ₹10,000 transaction with 0.4% MDR (₹40), GST is 18% of ₹40 = ₹7.20. If your business has a GSTIN, you can claim this ₹7.20 as Input Tax Credit (ITC) on GSTR-3B.',
  },
  {
    category: 'Timeline',
    question: 'When did the revised MDR provisions take effect?',
    answer: 'The updated standard deduction framework came into effect from October 15, 2026, as notified in the official NPCI circular.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Official Regulatory FAQs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions on UPI MDR Slabs
          </h2>
          <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Authoritative answers based on the NPCI Circular on Merchant Discount Rate on Select UPI P2M Transactions.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      {faq.category}
                    </span>
                    <span className="flex-1">{faq.question}</span>
                  </div>
                  <div className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-emerald-100 dark:bg-emerald-950 text-emerald-600' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
