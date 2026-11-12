import { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { 
  ArrowDown, 
  MapPin, 
  Car, 
  GraduationCap, 
  FileText, 
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
  onSelectTab: (tab: 'stage' | 'digital') => void;
}

export function Hero({ onOpenContact, onSelectTab }: HeroProps) {
  // Option for Marion to preview an uploaded photo or see the placeholder
  const [usePhotoPlaceholder, setUsePhotoPlaceholder] = useState<boolean>(true);

  return (
    <section className="pt-8 pb-12 sm:pt-14 sm:pb-16 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Top Meta Tag: Stage recherché */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 dark:bg-[#0A84FF]/15 text-[#0071E3] dark:text-[#0A84FF] text-[13px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] dark:bg-[#0A84FF]" />
          <span>Stage recherché · Brazzaville</span>
        </div>

        <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
          Disponible immédiatement
        </span>
      </div>

      {/* Main Grid: Portrait on left/top + Concrete text */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Human Portrait Slot ([PHOTO]) */}
        <div className="md:col-span-4 flex flex-col items-start">
          <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-[26px] overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700/80 shadow-sm flex flex-col items-center justify-center text-center p-4">
            
            {/* Realistic stylized portrait placeholder frame */}
            <div className="w-20 h-20 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 mb-3 border border-neutral-400/30">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>

            <div className="text-[12px] font-semibold text-neutral-700 dark:text-neutral-200">
              [PHOTO]
            </div>
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 max-w-[160px] leading-tight">
              Emplacement photo portrait (recadrée simplement)
            </div>

            {/* Subtle verification badge on photo */}
            <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-[10px]" title="Profil vérifié">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          {/* Quick details inset group below photo */}
          <div className="w-full mt-4 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/5 dark:border-white/10 p-3.5 space-y-2 text-[13px]">
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>Localisation</span>
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                Mansimou, Brazza
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 pt-1.5 border-t border-neutral-100 dark:border-neutral-800">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-neutral-400" />
                <span>Diplôme</span>
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                LPAE (ESGAE)
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 pt-1.5 border-t border-neutral-100 dark:border-neutral-800">
              <span className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-neutral-400" />
                <span>Permis B</span>
              </span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                Opérationnel
              </span>
            </div>
          </div>
        </div>

        {/* Narrative & Clear Human Presentation on right */}
        <div className="md:col-span-8 space-y-5">
          
          <div>
            <h1 className="text-[34px] sm:text-[42px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.025em] leading-[1.12]">
              Marion Moun
            </h1>
            <p className="text-[17px] sm:text-[19px] font-medium text-neutral-600 dark:text-neutral-300 mt-2">
              Diplômé en Administration des Entreprises (LPAE)
            </p>
          </div>

          {/* First-person concrete paragraph without buzzwords */}
          <div className="space-y-3 text-[16px] sm:text-[17px] text-neutral-700 dark:text-neutral-300 leading-[1.55]">
            <p>
              Je cherche un stage opérationnel de 3 à 6 mois auprès d'une entreprise basée à Brazzaville. Mes domaines prioritaires sont le <strong>commerce</strong>, la <strong>comptabilité</strong>, le <strong>recouvrement de créances</strong> et le <strong>management</strong>. Ce n'est pas un stage de développement informatique.
            </p>
            <p>
              Mon profil a été forgé sur le terrain : le montage des déclarations annuelles des salaires (<strong>DAS 1 & 2</strong>) sous la direction de M. Yves Miatoko chez <strong>Émeraude</strong>, et les techniques de relance apprises lors de la <strong>Masterclass Recouvrement</strong> de mai 2026.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-[15px]">
              Ce que j'apporte en plus ? Je sais digitaliser ce qui prend du temps : concevoir des tableurs connectés, automatiser des alertes de relance et monter des formulaires sans papier pour que l'équipe gagne des heures chaque semaine.
            </p>
          </div>

          {/* Action buttons (Clean Apple style) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            
            {/* Télécharger mon CV */}
            <a
              href={PERSONAL_INFO.cvDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-200/80 hover:bg-neutral-300/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-[15px] font-semibold transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
              <span>Mon CV</span>
            </a>

            {/* Me contacter */}
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0A84FF] dark:hover:bg-[#409CFF] text-white text-[15px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <span>Me contacter</span>
            </button>

            {/* Découvrir les atouts web */}
            <button
              type="button"
              onClick={() => onSelectTab('digital')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[14px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>Voir mes atouts web</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Handcrafted Asymmetric Detail: Handwritten SVG signature */}
          <div className="pt-4 flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800/80">
            <div className="flex items-center gap-3">
              <svg 
                className="w-32 h-10 text-neutral-800 dark:text-neutral-200" 
                viewBox="0 0 160 48" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.6" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-label="Signature manuscrite de Marion Moun"
              >
                <path d="M 12 36 C 18 16, 26 12, 30 32 C 34 14, 42 16, 46 34 C 54 22, 60 26, 68 32 C 78 12, 84 38, 92 28 C 102 18, 110 32, 118 24 C 126 16, 134 32, 148 20" />
                <path d="M 28 38 C 50 42, 95 40, 144 32" strokeWidth="1.2" opacity="0.6" />
              </svg>
              <span className="text-[12px] text-neutral-500 dark:text-neutral-400 font-normal">
                Marion Moun · Brazzaville
              </span>
            </div>

            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 hidden sm:inline">
              Fiche ouverte depuis le QR Code du CV
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
