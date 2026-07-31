import React, { useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { ActiveTab } from '../types';
import { FileCode, Copy, Check, Sparkles, Layers, Terminal, Plus, Minus, Trash2, Box } from 'lucide-react';

interface CodeEditorProps {
  htmlCode: string;
  cssCode: string;
  onChangeHtml: (value: string) => void;
  onChangeCss: (value: string) => void;
  activeTab: ActiveTab;
  onChangeActiveTab: (tab: ActiveTab) => void;
  onFormatCode: () => void;
  onClearCode?: () => void;
  onResetBlank?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  htmlCode,
  cssCode,
  onChangeHtml,
  onChangeCss,
  activeTab,
  onChangeActiveTab,
  onFormatCode,
  onClearCode,
  onResetBlank,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCurrent = () => {
    const code = activeTab === 'css' ? cssCode : htmlCode;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Dynamic box manipulator
  const handleAddBox = () => {
    const matches = htmlCode.match(/class="[^"]*box[^"]*"/g) || [];
    const nextNum = matches.length + 1;
    const newBoxMarkup = `\n  <div class="box box-${nextNum}">\n    <span class="box-id">BOX ${nextNum}</span>\n    <span class="box-meta">grid-column: span 1</span>\n  </div>`;

    const lastClosingDivIndex = htmlCode.lastIndexOf('</div>');
    if (lastClosingDivIndex !== -1) {
      const updatedHtml = htmlCode.slice(0, lastClosingDivIndex) + newBoxMarkup + '\n' + htmlCode.slice(lastClosingDivIndex);
      onChangeHtml(updatedHtml);
      onChangeActiveTab('html');
    } else {
      onChangeHtml(htmlCode + newBoxMarkup);
    }
  };

  const handleRemoveBox = () => {
    const lastBoxIndex = htmlCode.lastIndexOf('<div class="');
    if (lastBoxIndex !== -1) {
      const closingDivIndex = htmlCode.indexOf('</div>', lastBoxIndex);
      if (closingDivIndex !== -1) {
        const updatedHtml = htmlCode.slice(0, lastBoxIndex) + htmlCode.slice(closingDivIndex + 6);
        onChangeHtml(updatedHtml.trim());
      }
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    editor.updateOptions({
      fontSize: 13,
      fontFamily: "'Fira Code', 'Cascadia Code', Consolas, Monaco, monospace",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      tabSize: 2,
      wordWrap: 'on',
      lineNumbersMinChars: 3,
      folding: true,
      renderLineHighlight: 'all',
      automaticLayout: true,
      padding: { top: 12, bottom: 12 },
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 border-r border-slate-800 overflow-hidden">
      {/* Editor Header Bar with Tab Controls */}
      <div className="bg-slate-900 border-b border-slate-800 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0 select-none">
        {/* Tab Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeActiveTab('css')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'css'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>styles.css</span>
          </button>

          <button
            onClick={() => onChangeActiveTab('html')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'html'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span>index.html</span>
          </button>
        </div>

        {/* Quick Skeleton Manipulation Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-amber-400 px-1 font-bold flex items-center gap-1">
            <Box className="w-3 h-3" />
            <span className="hidden xl:inline">Scheletro:</span>
          </span>

          <button
            onClick={handleAddBox}
            className="flex items-center gap-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded text-[11px] font-mono transition-colors"
            title="Aggiungi un nuovo box <div class='box'> nell'HTML"
          >
            <Plus className="w-3 h-3" />
            <span>Box</span>
          </button>

          <button
            onClick={handleRemoveBox}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-[11px] font-mono transition-colors"
            title="Rimuovi l'ultimo box"
          >
            <Minus className="w-3 h-3" />
          </button>

          {onClearCode && (
            <button
              onClick={onClearCode}
              className="flex items-center gap-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[11px] font-mono transition-colors"
              title="Svuota completamente il codice nell'editor (0 righe)"
            >
              <Trash2 className="w-3 h-3" />
              <span>Svuota</span>
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCurrent}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2 py-1 rounded text-xs transition-colors"
            title="Copia codice scheda attiva"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copiato!' : 'Copia'}</span>
          </button>

          <button
            onClick={onFormatCode}
            className="flex items-center gap-1 text-slate-400 hover:text-sky-300 hover:bg-slate-800 px-2 py-1 rounded text-xs transition-colors"
            title="Formatta rientro"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Formatta</span>
          </button>
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="flex-1 relative w-full h-full">
        {activeTab === 'css' ? (
          <Editor
            height="100%"
            defaultLanguage="css"
            language="css"
            theme="vs-dark"
            value={cssCode}
            onChange={(val) => onChangeCss(val || '')}
            onMount={handleEditorMount}
            options={{
              formatOnType: true,
              suggestOnTriggerCharacters: true,
            }}
          />
        ) : (
          <Editor
            height="100%"
            defaultLanguage="html"
            language="html"
            theme="vs-dark"
            value={htmlCode}
            onChange={(val) => onChangeHtml(val || '')}
            onMount={handleEditorMount}
            options={{
              formatOnType: true,
              suggestOnTriggerCharacters: true,
            }}
          />
        )}
      </div>

      {/* Bottom Status Indicator */}
      <div className="bg-slate-900/80 border-t border-slate-800/80 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400 font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Sincronizzazione Live Attiva</span>
        </div>
        <div>
          <span>{activeTab === 'css' ? 'CSS Grid / Flexbox Engine' : 'Puro HTML Semantic DOM'}</span>
        </div>
      </div>
    </div>
  );
};
