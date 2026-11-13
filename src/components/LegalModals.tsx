import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LegalDocType } from '../utils/storage.ts';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface LegalModalProps {
  activeDoc: LegalDocType | null;
  onClose: () => void;
  onOpenCookiePrefs: () => void;
}

export function LegalModal({ activeDoc, onClose, onOpenCookiePrefs }: LegalModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeDoc) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const container = dialogRef.current;
    if (container) {
      const closeBtn = container.querySelector<HTMLElement>('button');
      closeBtn?.focus();
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
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
  }, [activeDoc, onClose]);

  if (!activeDoc) return null;

  const titles: Record<LegalDocType, string> = {
    confidentialite: 'Politique de confidentialité',
    cgu: "Conditions Générales d'Utilisation (CGU)",
    cookies: 'Politique relative aux cookies',
    'mentions-legales': 'Mentions légales',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--hairline)] shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--hairline)]">
          <div>
            <h2 id="legal-modal-title" className="text-[22px] font-semibold text-[var(--ink)]">
              {titles[activeDoc]}
            </h2>
            <p className="text-[13px] text-[var(--muted)] mt-1 tnum">
              Dernière mise à jour : 13 novembre 2026
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre légale"
            className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {activeDoc === 'confidentialite' && (
          <div className="space-y-4 text-[14px] text-[var(--muted)] leading-relaxed">
            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">1. Responsable du traitement</h3>
              <p>
                Marion Moun — Email : <span className="text-[var(--ink)]">{PERSONAL_INFO.email}</span> — Adresse : {PERSONAL_INFO.address}.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">2. Données collectées</h3>
              <p>
                Lorsque vous utilisez le formulaire de contact, vous transmettez volontairement votre nom, votre adresse e-mail ou numéro, le nom de votre entreprise et le contenu de votre message. Lors d'un accès par QR Code depuis mon CV papier, le paramètre d'URL <code className="text-[var(--ink)]">?src=cv</code> est lu localement par votre navigateur pour ouvrir l'onglet « Profil & Stage ».
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">3. Finalités et base légale</h3>
              <p>
                Ces informations servent uniquement à répondre à vos propositions de stage en entreprise ou demandes de devis pour des prestations web, sur la base de votre démarche volontaire et de l'intérêt légitime d'échanger professionnellement.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">4. Durée de conservation et destinataires</h3>
              <p>
                Les échanges reçus par e-mail ou WhatsApp sont conservés le temps du suivi de candidature ou de la mission commerciale, et au maximum 24 mois après le dernier contact. Marion Moun est l'unique destinataire de ces données. Aucune donnée n'est vendue ou cédée à des tiers.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">5. Hébergeur</h3>
              <p>
                Hébergement du site : [À COMPLÉTER — Nom de l'hébergeur, ex. Cloudflare Pages / Netlify / GitHub Pages, adresse et contact].
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">6. Vos droits et procédure de contact</h3>
              <p>
                Vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour l'exercer, écrivez simplement à <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[var(--accent)] underline">{PERSONAL_INFO.email}</a> en précisant l'objet de votre demande.
              </p>
            </section>
          </div>
        )}

        {activeDoc === 'cgu' && (
          <div className="space-y-4 text-[14px] text-[var(--muted)] leading-relaxed">
            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">1. Objet du site</h3>
              <p>
                Ce site présente le parcours académique et professionnel de Marion Moun en vue d'un stage opérationnel en gestion, commerce, comptabilité, recouvrement et management, ainsi que son offre de services numériques pour les entreprises.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">2. Propriété intellectuelle</h3>
              <p>
                Les textes, maquettes, codes sources et présentations de projets publiés sur ce site sont la propriété de Marion Moun, sauf mention contraire. Toute reproduction sans autorisation préalable écrite est interdite.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">3. Exemples visuels fictifs</h3>
              <p>
                Les simulations interactives (balance âgée, tableau de trésorerie, entonnoir commercial) reposent exclusivement sur des données fictives créées à des fins pédagogiques et démonstratives. Aucune donnée confidentielle d'entreprise réelle n'y figure.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">4. Absence d'offre contractuelle</h3>
              <p>
                Les descriptions de prestations digitales présentées sur ce site sont purement informatives. Toute collaboration ou prestation de service fait l'objet d'un devis détaillé et validé par les deux parties.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">5. Limitation de responsabilité et liens externes</h3>
              <p>
                Marion Moun s'efforce de maintenir des informations exactes et à jour, sans pouvoir garantir l'absence d'erreurs ponctuelles. Les liens vers des services tiers (WhatsApp, Google Forms, etc.) relèvent de la responsabilité de leurs éditeurs respectifs.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">6. Loi applicable</h3>
              <p>
                Les présentes conditions sont soumises au droit applicable en République du Congo [À VÉRIFIER : Congo-Brazzaville]. Date de dernière mise à jour : 13 novembre 2026.
              </p>
            </section>
          </div>
        )}

        {activeDoc === 'cookies' && (
          <div className="space-y-4 text-[14px] text-[var(--muted)] leading-relaxed">
            <p>
              Ce site limite au strict minimum le stockage d'informations sur votre terminal et n'active aucune mesure d'audience sans votre consentement préalable.
            </p>

            <div className="overflow-x-auto border border-[var(--hairline)] rounded-[8px]">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[var(--surface)] text-[var(--ink)] border-b border-[var(--hairline)]">
                  <tr>
                    <th className="py-2.5 px-3 font-medium">Stockage / Nom</th>
                    <th className="py-2.5 px-3 font-medium">Finalité</th>
                    <th className="py-2.5 px-3 font-medium">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hairline)]">
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[var(--ink)]">mm_cookie_consent_v1</td>
                    <td className="py-2.5 px-3">Mémorisation de vos choix de consentement</td>
                    <td className="py-2.5 px-3 tnum">12 mois</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[var(--ink)]">mm_theme_v1</td>
                    <td className="py-2.5 px-3">Sauvegarde du thème clair ou sombre</td>
                    <td className="py-2.5 px-3 tnum">12 mois</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[var(--ink)]">Mesure d'audience</td>
                    <td className="py-2.5 px-3">Statistiques anonymes (chargée uniquement si acceptée)</td>
                    <td className="py-2.5 px-3 tnum">6 mois [À COMPLÉTER si outil ajouté]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCookiePrefs();
                }}
                className="btn-secondary"
              >
                Modifier mes choix de cookies
              </button>
            </div>
          </div>
        )}

        {activeDoc === 'mentions-legales' && (
          <div className="space-y-4 text-[14px] text-[var(--muted)] leading-relaxed">
            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">Éditeur du site</h3>
              <p>
                Marion Moun (Glory Marion Moun) — Étudiant diplômé en Licence Professionnelle en Administration des Entreprises (LPAE, ESGAE).
              </p>
              <p>
                Adresse : {PERSONAL_INFO.address}<br />
                Email : <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[var(--accent)] underline">{PERSONAL_INFO.email}</a><br />
                Téléphones : {PERSONAL_INFO.phone1} / {PERSONAL_INFO.phone2}
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--ink)]">Hébergement</h3>
              <p>
                [À COMPLÉTER : Raison sociale de l'hébergeur, adresse postale et coordonnées de contact].
              </p>
            </section>
          </div>
        )}

        <div className="pt-4 border-t border-[var(--hairline)] flex justify-end">
          <button type="button" onClick={onClose} className="btn-primary">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
