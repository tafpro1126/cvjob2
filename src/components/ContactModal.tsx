import { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { Check, ChevronRight, Copy, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTACT_TOPICS = [
  'Proposer un entretien (stage 3 à 6 mois)',
  'Prestation Web / Tableau de bord / Automatisation',
  'Prise de contact générale',
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [topic, setTopic] = useState(CONTACT_TOPICS[0]);
  const [message, setMessage] = useState('');

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const container = dialogRef.current;
    if (container) {
      const firstBtn = container.querySelector<HTMLElement>(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstBtn?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && container) {
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      prevFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const text = `Marion Moun — Diplômé LPAE (ESGAE)\nTél / WhatsApp : ${PERSONAL_INFO.phone1}\nTél secondaire : ${PERSONAL_INFO.phone2}\nEmail : ${PERSONAL_INFO.email}\nLocalisation : ${PERSONAL_INFO.location}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked in non-HTTPS contexts
    }
  };

  const composedMessage = `Bonjour Marion,\n\nObjet : ${topic}\nNom : ${senderName.trim() || 'Non précisé'}\nContact : ${senderContact.trim() || 'Non précisé'}\n\n${message.trim() || 'Nous souhaitons échanger avec vous prochainement.'}`;
  const whatsappHref = `https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${encodeURIComponent(composedMessage)}`;
  const mailtoHref = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(composedMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--hairline)] shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--hairline)]">
          <div>
            <h2 id="contact-modal-title" className="text-[22px] font-medium text-[var(--ink)]">
              Me contacter
            </h2>
            <p className="text-[14px] text-[var(--muted)] mt-1">
              Marion Moun · <span className="whitespace-nowrap">Brazzaville</span> · Réponse rapide par WhatsApp ou e-mail.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre de contact"
            className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Direct coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px] pb-6 border-b border-[var(--hairline)]">
          <a
            href={`https://wa.me/${PERSONAL_INFO.phone1Raw}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-[6px] bg-[var(--surface)] hover:bg-[var(--accent-subtle)] transition-colors flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div>
                <div className="font-medium text-[var(--ink)]">WhatsApp direct</div>
                <div className="text-[13px] text-[var(--muted)] tnum">{PERSONAL_INFO.phone1}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--subtle)]" />
          </a>

          <a
            href={`tel:${PERSONAL_INFO.phone1}`}
            className="p-3.5 rounded-[6px] bg-[var(--surface)] hover:bg-[var(--accent-subtle)] transition-colors flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div>
                <div className="font-medium text-[var(--ink)]">Appel téléphonique</div>
                <div className="text-[13px] text-[var(--muted)] tnum">
                  {PERSONAL_INFO.phone1} / {PERSONAL_INFO.phone2}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--subtle)]" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-3.5 rounded-[6px] bg-[var(--surface)] hover:bg-[var(--accent-subtle)] transition-colors flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div className="min-w-0">
                <div className="font-medium text-[var(--ink)]">Courrier électronique</div>
                <div className="text-[13px] text-[var(--muted)] truncate">{PERSONAL_INFO.email}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--subtle)] shrink-0" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="p-3.5 rounded-[6px] bg-[var(--surface)] hover:bg-[var(--accent-subtle)] transition-colors flex items-center justify-between gap-3 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-[var(--accent)] shrink-0" />
              )}
              <div>
                <div className="font-medium text-[var(--ink)]">
                  {copied ? 'Coordonnées copiées' : 'Copier mes coordonnées'}
                </div>
                <div className="text-[13px] text-[var(--muted)]">Pour votre dossier de recrutement</div>
              </div>
            </div>
          </button>
        </div>

        {/* Message composer */}
        <div className="space-y-4">
          <div className="text-[15px] font-medium text-[var(--ink)]">
            Préparer un message rapide
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-[13px] font-medium text-[var(--ink)] mb-1">
                Votre nom
              </label>
              <input
                id="contact-name"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Nom et prénom"
                className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
              />
            </div>

            <div>
              <label htmlFor="contact-reply" className="block text-[13px] font-medium text-[var(--ink)] mb-1">
                Téléphone ou e-mail
              </label>
              <input
                id="contact-reply"
                type="text"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                placeholder="Pour vous répondre"
                className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <div className="text-[13px] font-medium text-[var(--ink)]">Objet de votre message</div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Objet du message">
                {CONTACT_TOPICS.map((item) => {
                  const selected = topic === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTopic(item)}
                      className={`h-[40px] px-3.5 rounded-[6px] text-[13px] font-medium cursor-pointer transition-colors ${
                        selected
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--hairline)]'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="block text-[13px] font-medium text-[var(--ink)] mb-1">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Disponibilités pour un entretien ou précisions sur votre besoin..."
                className="w-full p-3.5 rounded-[6px] bg-[var(--surface)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)] resize-y"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[13px] text-[var(--subtle)]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{PERSONAL_INFO.location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a href={mailtoHref} className="btn-secondary">
              Envoyer par e-mail
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary group"
            >
              <span>Envoyer sur WhatsApp</span>
              <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
