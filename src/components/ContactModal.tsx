import { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  MapPin, 
  X, 
  CheckCircle, 
  ExternalLink, 
  Send,
  Building,
  Car
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [subjectType, setSubjectType] = useState('Stage en Entreprise');
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Bonjour Marion,\n\nJe suis ${senderName || 'un recruteur'} de l'entreprise ${senderCompany || '[Entreprise]'}.\nObjet : ${subjectType}.\nMessage : ${customNotes || "J'ai consulté votre portfolio suite à votre CV et je souhaite échanger avec vous."}`
    );
    window.open(`https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${text}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`[${subjectType}] Prise de contact - ${senderCompany || 'Entreprise'}`);
    const body = encodeURIComponent(
      `Bonjour Marion,\n\nJe suis ${senderName || 'recruteur'} pour l'entreprise ${senderCompany || '[Nom Entreprise]'}.\n\nObjet : ${subjectType}\n\n${customNotes || "Nous souhaitons vous rencontrer pour un entretien concernant votre candidature de stage en gestion."}\n\nCordialement,\n${senderName}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Disponibilité Immédiate · Brazzaville
          </span>
          <h2 id="contact-modal-title" className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Contacter {PERSONAL_INFO.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Choisissez votre canal privilégié : WhatsApp pour une réponse rapide, appel direct ou email formel.
          </p>
        </div>

        {/* Quick Click Direct Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${encodeURIComponent("Bonjour Marion, j'ai scanné le QR Code de votre CV et je souhaite échanger avec vous sur une opportunité.")}`}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800/80 transition-all flex items-center gap-3 group shadow-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                WhatsApp Direct
              </div>
              <div className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                {PERSONAL_INFO.phone1}
              </div>
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            href={`tel:${PERSONAL_INFO.phone1}`}
            className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800/80 transition-all flex items-center gap-3 group shadow-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-900 dark:text-sky-200">
                Appel Téléphonique
              </div>
              <div className="text-xs font-mono font-semibold text-sky-700 dark:text-sky-400">
                {PERSONAL_INFO.phone1}
              </div>
            </div>
          </a>

        </div>

        {/* Secondary Direct Call / Second line */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-300">Ligne secondaire directe :</span>
          <a 
            href={`tel:${PERSONAL_INFO.phone2}`} 
            className="font-mono font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400"
          >
            {PERSONAL_INFO.phone2}
          </a>
        </div>

        {/* Pre-filled Message Form */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Personnaliser votre message :
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Votre nom</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Ex: M. Makosso"
                className="w-full mt-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Entreprise</label>
              <input
                type="text"
                value={senderCompany}
                onChange={(e) => setSenderCompany(e.target.value)}
                placeholder="Ex: PME Télécoms Brazza"
                className="w-full mt-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Objet de la prise de contact</label>
            <select
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value)}
              className="w-full mt-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="Stage en Gestion / Recouvrement">Stage en Gestion & Recouvrement</option>
              <option value="Stage en Comptabilité">Stage en Comptabilité / Finance</option>
              <option value="Stage en Commerce / Vente">Stage en Commerce & Négociation</option>
              <option value="Prestation Digitale / Site Web">Prestation Digitale ou Tableaux de bord</option>
              <option value="Autre demande">Autre opportunité</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Message / Détails (optionnel)</label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Précisez la date souhaitée, le lieu ou les missions..."
              className="w-full mt-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleSendWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ouvrir WhatsApp</span>
            </button>
            <button
              onClick={handleSendEmail}
              className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Envoyer par Email</span>
            </button>
          </div>
        </div>

        {/* Location & Driver license footnote */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            {PERSONAL_INFO.address}
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
            <Car className="w-3.5 h-3.5 text-sky-500" />
            {PERSONAL_INFO.driverLicense}
          </span>
        </div>

      </div>
    </div>
  );
};
