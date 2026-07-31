import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Globe, Code } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
  cssCode: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  htmlCode,
  cssCode,
}) => {
  const [activeTab, setActiveTab] = useState<'standalone' | 'css' | 'html'>('standalone');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneHtml = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layout Griglia CSS</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
</body>
</html>`;

  const getCodeToCopy = () => {
    switch (activeTab) {
      case 'css': return cssCode;
      case 'html': return htmlCode;
      case 'standalone': default: return standaloneHtml;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeToCopy());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-layout.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Esporta Layout Griglia</h3>
              <p className="text-xs text-slate-400">Puro codice HTML e CSS pronto per la produzione</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Tabs */}
        <div className="px-6 pt-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('standalone')}
              className={`px-4 py-2 rounded-t-lg text-xs font-semibold flex items-center gap-2 transition-colors border-b-2 ${
                activeTab === 'standalone'
                  ? 'border-sky-500 text-sky-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Sito HTML Completo</span>
            </button>

            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 rounded-t-lg text-xs font-semibold flex items-center gap-2 transition-colors border-b-2 ${
                activeTab === 'css'
                  ? 'border-sky-500 text-sky-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Solo CSS</span>
            </button>

            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 rounded-t-lg text-xs font-semibold flex items-center gap-2 transition-colors border-b-2 ${
                activeTab === 'html'
                  ? 'border-sky-500 text-sky-400 bg-slate-950'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Solo HTML</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiato!' : 'Copia Codice'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white font-medium px-3.5 py-1.5 rounded-lg text-xs shadow-md shadow-sky-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Scarica .html</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-auto flex-1 bg-slate-950">
          <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap select-all bg-slate-900 p-4 rounded-xl border border-slate-800">
            {getCodeToCopy()}
          </pre>
        </div>
      </div>
    </div>
  );
};
