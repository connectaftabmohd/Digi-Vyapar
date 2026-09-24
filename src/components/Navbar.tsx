import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Share2, 
  Check, 
  Calculator, 
  Table, 
  TrendingUp, 
  HelpCircle, 
  Menu, 
  X,
  Scale,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenEmbed?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleDarkMode }) => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Merchant UPI Charges Calculator - NPCI Standard Deduction Rules',
          text: 'Calculate merchant UPI MDR, standard deduction rules, essential sector flat fees, and 18% GST.',
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const navLinks = [
    { label: 'Calculator', href: '#calculator', icon: Calculator },
    { label: 'Standard Rules', href: '#deduction-rules', icon: Scale },
    { label: 'Monthly Turnover', href: '#turnover', icon: TrendingUp },
    { label: 'MCC Slabs', href: '#rates', icon: Table },
    { label: 'Merchant Guide', href: '#guide', icon: ShieldCheck },
    { label: 'FAQs', href: '#faqs', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors">
      {/* Top micro-bar for classic Blogger theme vibe */}
      <div className="bg-slate-900 text-slate-300 dark:bg-black dark:text-slate-400 text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Updated with NPCI Circular on Select UPI P2M Transactions (Effective Oct 15, 2026)</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">0% MDR &le; ₹2,000 Verified</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Vol. 2026 Special</span>
            <span>Fintech & Merchant Banking Desk</span>
          </div>
        </div>
      </div>

      {/* Main Blogger Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Blog Identity */}
          <a href="#calculator" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight">₹</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Digi<span className="text-blue-600 dark:text-blue-400">Vyapar</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
                  NPCI 2026
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 hidden xs:block font-medium">
                Merchant UPI Charges & Standard Deduction Calculator
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors flex items-center gap-1.5"
              >
                <item.icon className="w-4 h-4 opacity-70" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Share link */}
            <button
              onClick={handleShare}
              title="Share this tool"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:bg-slate-800 transition-colors relative"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
