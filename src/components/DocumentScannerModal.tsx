import { useState, useTransition, type ChangeEvent } from 'react';
import { 
  Scan, 
  Upload, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Send, 
  Copy, 
  Clock, 
  Layers, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface DocumentScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export function DocumentScannerModal({
  isOpen,
  onClose,
  onOpenContact
}: DocumentScannerModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick preset demo invoice generator
  const handleLoadDemo = (type: 'demo1' | 'demo2') => {
    // Generate a clean Canvas image of an invoice
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 750;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 600, 750);

      // Header Banner
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 600, 90);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(type === 'demo1' ? 'FACTURE COMMERCIALE N° 2026-082' : 'MISE EN DEMEURE N° 2026-033', 30, 45);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Entreprise de Télécommunication & BTP · Brazzaville, Congo', 30, 70);

      // Body details
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('DESTINATAIRE / DÉBITEUR :', 30, 140);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(type === 'demo1' ? 'Société Brazza Logistique Express SARL' : 'Hôtel Riviera Brazza & Résidences', 30, 165);
      ctx.fillText('Avenue de la Paix, Ouenzé, Brazzaville', 30, 185);

      // Dates & amount table
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(30, 220, 540, 180);
      ctx.strokeStyle = '#e2e8f0';
      ctx.strokeRect(30, 220, 540, 180);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Désignation de la prestation', 50, 255);
      ctx.fillText('Montant TTC', 420, 255);

      ctx.fillStyle = '#475569';
      ctx.font = '13px sans-serif';
      ctx.fillText(type === 'demo1' ? 'Installation infrastructure réseau fibre optique' : 'Audit comptable annuel & rapprochement DAS 1/2', 50, 290);
      ctx.fillText(type === 'demo1' ? '850 000 FCFA' : '1 200 000 FCFA', 420, 290);

      ctx.fillText('Acompte déjà versé', 50, 320);
      ctx.fillText(type === 'demo1' ? '- 350 000 FCFA' : '- 200 000 FCFA', 420, 320);

      ctx.fillStyle = '#b91c1c';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('SOLDE RESTANT DÛ :', 50, 365);
      ctx.fillText(type === 'demo1' ? '500 000 FCFA' : '1 000 000 FCFA', 420, 365);

      // Status stamp
      ctx.fillStyle = type === 'demo1' ? '#f59e0b' : '#ef4444';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(type === 'demo1' ? 'ÉCHÉANCE DÉPASSÉE (J+18)' : 'RETARD CRITIQUE (J+53)', 30, 460);

      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.fillText('Date d’émission : 25/09/2026 · Échéance initiale : 25/10/2026', 30, 490);
      ctx.fillText('Conditions de règlement : Paiement comptant ou virement bancaire UBA / BGFI', 30, 515);

      // Signature box
      ctx.strokeStyle = '#cbd5e1';
      ctx.strokeRect(380, 560, 190, 80);
      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.fillText('Direction Financière', 400, 580);
      ctx.fillText('Visa pour recouvrement', 400, 600);

      const dataUrl = canvas.toDataURL('image/png');
      setImagePreview(dataUrl);
      setAnalysisResult(null);
    }
  };

  const handleRunAnalysis = async () => {
    if (!imagePreview || isAnalyzing) return;
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/gemini/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: 'image/png',
          additionalNotes: "Analyse réalisée dans le cadre de la démonstration du portfolio de Marion Moun, diplômé en LPAE ESGAE."
        })
      });

      const data = await response.json();
      if (data.result) {
        setAnalysisResult(data.result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyDraft = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scanner-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Démonstration Pratique · Vision IA & Recouvrement
          </div>
          <h2 id="scanner-modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Scanner & Diagnostic IA d'Impayés
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Testez l'outil de gestion : chargez une facture réelle ou cliquez sur un exemple fictif pour voir l'IA évaluer le risque et générer le message de relance adapté selon le protocole de Marion.
          </p>
        </div>

        {/* Input selection (Upload or Demo buttons) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Choisir une source à analyser :
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Custom file upload */}
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold transition-all shadow-xs">
              <Upload className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Charger ma propre photo / facture</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden" 
              />
            </label>

            <span className="text-xs text-slate-400">ou tester un cas type :</span>

            <button
              onClick={() => handleLoadDemo('demo1')}
              className="px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-semibold hover:bg-sky-100 transition-colors"
            >
              Exemple 1 : Facture 500k (Retard J+18)
            </button>

            <button
              onClick={() => handleLoadDemo('demo2')}
              className="px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors"
            >
              Exemple 2 : Facture 1M (Critique J+53)
            </button>
          </div>
        </div>

        {/* Document Preview & Trigger */}
        {imagePreview && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Document prêt pour l'inspection
              </span>
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyse Gemini en cours...</span>
                  </>
                ) : (
                  <>
                    <Scan className="w-3.5 h-3.5" />
                    <span>Lancer le diagnostic de recouvrement</span>
                  </>
                )}
              </button>
            </div>

            <div className="max-h-60 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-950 flex items-center justify-center p-2">
              <img 
                src={imagePreview} 
                alt="Document à analyser" 
                className="max-h-56 object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Analysis Result Card */}
        {analysisResult && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-300">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Rapport de Diagnostic Émis
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {analysisResult.clientName || 'Client Détecté'} — {analysisResult.invoiceNumber || 'Facture'}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  analysisResult.riskLevel === 'Critique' || analysisResult.riskLevel === 'Élevé'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  Risque : {analysisResult.riskLevel || 'Modéré'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-slate-400">Montant en Souffrance</div>
                <div className="text-base font-black text-white mt-0.5">
                  {analysisResult.amount || 'Non spécifié'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-slate-400">Échéance & Retard</div>
                <div className="text-base font-bold text-amber-300 mt-0.5">
                  {analysisResult.delayAssessment || analysisResult.dueDate || 'Échue'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-slate-400">Protocole Recommandé</div>
                <div className="text-base font-bold text-sky-300 mt-0.5">
                  {analysisResult.recommendedAction || 'J+20 Sommation'}
                </div>
              </div>
            </div>

            {/* Key Observations */}
            {analysisResult.keyObservations && analysisResult.keyObservations.length > 0 && (
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Observations Clés Détectées :
                </div>
                <ul className="space-y-1">
                  {analysisResult.keyObservations.map((obs: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Generated Dunning Message Draft */}
            {analysisResult.draftRelanceLetter && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    Message de relance rédigé pour WhatsApp / Email :
                  </span>
                  <button
                    onClick={() => handleCopyDraft(analysisResult.draftRelanceLetter)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 transition-colors"
                  >
                    {copiedDraft ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap p-2 rounded bg-slate-900 border border-slate-800">
                  {analysisResult.draftRelanceLetter}
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
