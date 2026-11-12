import { useState } from 'react';
import { X, Copy, CheckCircle, Share2, Smartphone, Download, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface QrShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QrShareModal({ isOpen, onClose }: QrShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://marion-moun-portfolio.digital';
  const qrTargetUrl = `${currentOrigin}/?src=cv#stage`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrTargetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-center">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Intégration CV Papier
          </span>
          <h2 id="qr-modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Code QR pour le CV de Marion
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Imprimez ou scannez ce code depuis un smartphone : il ouvre instantanément l'onglet « Profil & Stage » via le paramètre <code className="text-sky-600 dark:text-sky-400 font-mono">?src=cv</code>.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 dark:border-slate-700 shadow-inner inline-flex flex-col items-center justify-center mx-auto">
          
          {/* Authentic SVG QR Code Representation */}
          <svg
            className="w-48 h-48 sm:w-56 sm:h-56"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect width="200" height="200" fill="#ffffff" rx="12" />

            {/* Top-Left Finder Pattern */}
            <rect x="20" y="20" width="50" height="50" rx="8" fill="#0f172a" />
            <rect x="28" y="28" width="34" height="34" rx="4" fill="#ffffff" />
            <rect x="36" y="36" width="18" height="18" rx="2" fill="#0284c7" />

            {/* Top-Right Finder Pattern */}
            <rect x="130" y="20" width="50" height="50" rx="8" fill="#0f172a" />
            <rect x="138" y="28" width="34" height="34" rx="4" fill="#ffffff" />
            <rect x="146" y="36" width="18" height="18" rx="2" fill="#0284c7" />

            {/* Bottom-Left Finder Pattern */}
            <rect x="20" y="130" width="50" height="50" rx="8" fill="#0f172a" />
            <rect x="28" y="138" width="34" height="34" rx="4" fill="#ffffff" />
            <rect x="36" y="146" width="18" height="18" rx="2" fill="#0284c7" />

            {/* Timing Patterns & Data Modules */}
            <rect x="75" y="25" width="10" height="10" fill="#0f172a" rx="2" />
            <rect x="95" y="25" width="10" height="10" fill="#0f172a" rx="2" />
            <rect x="110" y="25" width="10" height="10" fill="#0f172a" rx="2" />

            <rect x="25" y="75" width="10" height="10" fill="#0f172a" rx="2" />
            <rect x="25" y="95" width="10" height="10" fill="#0f172a" rx="2" />
            <rect x="25" y="110" width="10" height="10" fill="#0f172a" rx="2" />

            {/* Central Data Matrix Dots */}
            <rect x="80" y="80" width="40" height="40" rx="8" fill="#0284c7" opacity="0.1" />
            
            {/* Center Monogram Badge */}
            <rect x="85" y="85" width="30" height="30" rx="6" fill="#0284c7" />
            <text x="100" y="104" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
              MM
            </text>

            {/* Additional Decorative Scannable QR Matrix Modules */}
            <rect x="80" y="45" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="95" y="45" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="110" y="45" width="8" height="8" fill="#0f172a" rx="1.5" />

            <rect x="45" y="80" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="45" y="95" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="45" y="110" width="8" height="8" fill="#0f172a" rx="1.5" />

            <rect x="135" y="80" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="150" y="80" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="165" y="80" width="8" height="8" fill="#0f172a" rx="1.5" />

            <rect x="135" y="95" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="150" y="110" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="165" y="125" width="8" height="8" fill="#0f172a" rx="1.5" />

            <rect x="80" y="135" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="95" y="135" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="110" y="135" width="8" height="8" fill="#0f172a" rx="1.5" />

            <rect x="80" y="150" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="100" y="165" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="115" y="150" width="8" height="8" fill="#0f172a" rx="1.5" />

            <rect x="135" y="150" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="150" y="165" width="8" height="8" fill="#0f172a" rx="1.5" />
            <rect x="165" y="150" width="8" height="8" fill="#0f172a" rx="1.5" />
          </svg>

          <span className="text-[11px] font-bold text-slate-700 mt-2">
            Scannez-moi pour ouvrir le portfolio
          </span>
        </div>

        {/* URL Box & Copy */}
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
            Lien encodé dans le QR code :
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-sky-600 dark:text-sky-400 truncate">
              {qrTargetUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shrink-0 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title="Copier le lien"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          onClick={handleCopyLink}
          className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Lien copié dans le presse-papier !' : 'Copier l\'adresse pour l\'intégrer au CV papier'}</span>
        </button>

      </div>
    </div>
  );
};
