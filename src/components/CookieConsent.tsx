import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CookiePreferences } from '../utils/storage.ts';

interface CookieBannerProps {
  visible: boolean;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onOpenCustomize: () => void;
}

export function CookieBanner({
  visible,
  onAcceptAll,
  onRejectAll,
  onOpenCustomize,
}: CookieBannerProps) {
  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Bannière de gestion des cookies"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto rounded-[8px] bg-[var(--surface-elevated)] shadow-[0_18px_40px_rgba(10,37,64,0.16)] border border-[var(--hairline)] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
    >
      <div className="space-y-1 max-w-xl">
        <p className="text-[14px] font-medium text-[var(--ink)]">
          Respect de votre vie privée
        </p>
        <p className="text-[13px] text-[var(--muted)] leading-relaxed">
          Ce portfolio utilise uniquement un stockage essentiel pour mémoriser vos préférences de thème et de consentement. La mesure d'audience reste désactivée sans votre accord.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onOpenCustomize}
          className="btn-secondary !h-[44px] !px-4 !text-[14px]"
        >
          Personnaliser
        </button>
        <button
          type="button"
          onClick={onRejectAll}
          className="btn-secondary !h-[44px] !px-4 !text-[14px]"
        >
          Tout refuser
        </button>
        <button
          type="button"
          onClick={onAcceptAll}
          className="btn-primary !h-[44px] !px-4 !text-[14px]"
        >
          Tout accepter
        </button>
      </div>
    </aside>
  );
}

interface CookiePreferencesModalProps {
  isOpen: boolean;
  currentPrefs: CookiePreferences | null;
  onClose: () => void;
  onSave: (analyticsEnabled: boolean) => void;
}

export function CookiePreferencesModal({
  isOpen,
  currentPrefs,
  onClose,
  onSave,
}: CookiePreferencesModalProps) {
  const [analytics, setAnalytics] = useState<boolean>(currentPrefs?.analytics ?? false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setAnalytics(currentPrefs?.analytics ?? false);
  }, [currentPrefs, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const container = dialogRef.current;
    if (container) {
      const firstFocusable = container.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
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
        ).filter((el) => !el.hasAttribute('disabled'));
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-prefs-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--hairline)] shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="cookie-prefs-title" className="text-[20px] font-semibold text-[var(--ink)]">
              Personnaliser mes cookies
            </h2>
            <p className="text-[14px] text-[var(--muted)] mt-1">
              Choisissez les catégories autorisées sur ce navigateur.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre des préférences"
            className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {/* Essentiels */}
          <div className="py-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[15px] font-medium text-[var(--ink)]">
                Essentiels (toujours actifs)
              </div>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed">
                Mémorisation du thème clair/sombre et enregistrement de votre choix de consentement.
              </p>
            </div>
            <span className="text-[13px] font-medium text-[var(--accent)] shrink-0 pt-0.5">
              Actif
            </span>
          </div>

          {/* Mesure d'audience */}
          <div className="py-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <label htmlFor="toggle-analytics" className="text-[15px] font-medium text-[var(--ink)] cursor-pointer">
                Mesure d'audience
              </label>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed">
                Statistiques anonymes de visite (désactivée par défaut, chargée uniquement après consentement).
              </p>
            </div>
            <input
              id="toggle-analytics"
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="w-5 h-5 mt-1 accent-[var(--accent)] cursor-pointer shrink-0 rounded-[4px]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onSave(false)}
            className="btn-secondary"
          >
            Tout refuser
          </button>
          <button
            type="button"
            onClick={() => onSave(analytics)}
            className="btn-primary"
          >
            Enregistrer mes choix
          </button>
        </div>
      </div>
    </div>
  );
}
