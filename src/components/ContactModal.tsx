import { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { 
  X, 
  Phone, 
  Mail, 
  MessageCircle, 
  Copy, 
  Check, 
  MapPin,
  ArrowUpRight 
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `Marion Moun - Diplômé LPAE Gestion & Recouvrement\nTél / WhatsApp : ${PERSONAL_INFO.phone1}\nTél secondaire : ${PERSONAL_INFO.phone2}\nEmail : ${PERSONAL_INFO.email}\nAdresse : ${PERSONAL_INFO.address}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Bonjour Marion, j'ai scanné le QR Code de votre CV et je souhaite échanger avec vous au sujet d'une opportunité."
    );
    window.open(`https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Prise de contact — Stage en gestion");
    const body = encodeURIComponent("Bonjour Marion,\n\nNous avons consulté votre profil et souhaitons vous rencontrer pour un entretien.\n\nCordialement,");
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity duration-200 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-md bg-white dark:bg-[#1C1C1E] rounded-t-[28px] sm:rounded-[28px] p-5 sm:p-6 shadow-2xl ios-sheet space-y-4 border border-black/5 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Grabber pill */}
        <div className="w-9 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 mx-auto -mt-1 mb-1 sm:hidden" />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-bold text-neutral-900 dark:text-neutral-100">
              Me contacter
            </h2>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
              Marion Moun · Brazzaville, Congo
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grouped Actions (iOS Action Sheet style) */}
        <div className="ios-inset-group text-[15px]">
          
          {/* WhatsApp Direct */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full text-left ios-row cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </span>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">WhatsApp</div>
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400 font-mono">{PERSONAL_INFO.phone1}</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </button>

          {/* Appel direct */}
          <a
            href={`tel:${PERSONAL_INFO.phone1}`}
            className="w-full text-left ios-row cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#0071E3] dark:bg-[#0A84FF] text-white flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">Appel direct</div>
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400 font-mono">{PERSONAL_INFO.phone1}</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </a>

          {/* Email */}
          <button
            type="button"
            onClick={handleEmail}
            className="w-full text-left ios-row cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">Email</div>
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">{PERSONAL_INFO.email}</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </button>

          {/* Copier tout */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full text-left ios-row cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </span>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {copied ? 'Coordonnées copiées !' : 'Copier les coordonnées'}
                </div>
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">Pour votre carnet ou dossier RH</div>
              </div>
            </div>
          </button>

        </div>

        {/* Second phone line & address info note */}
        <div className="p-3 bg-neutral-100/70 dark:bg-neutral-800/60 rounded-xl text-[12px] text-neutral-600 dark:text-neutral-400 space-y-1">
          <div className="flex items-center justify-between">
            <span>Deuxième ligne :</span>
            <a href={`tel:${PERSONAL_INFO.phone2}`} className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">
              {PERSONAL_INFO.phone2}
            </a>
          </div>
          <div className="flex items-center gap-1.5 pt-1 border-t border-neutral-200/60 dark:border-neutral-700/60">
            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
            <span>N° 8, avenue de l’impréco Mansimou, arr8 Madibou, Brazzaville</span>
          </div>
        </div>

        {/* Cancel button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-semibold text-[15px] hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
        >
          Annuler
        </button>

      </div>
    </div>
  );
}
