import React, { useState } from 'react';
import { CSS_SNIPPETS, CodeSnippet } from '../data/snippets';
import { Code, Plus, Copy, Check, Terminal, ChevronRight, X } from 'lucide-react';

interface QuickSnippetsProps {
  onInsertSnippet: (snippetCss: string) => void;
}

export const QuickSnippets: React.FC<QuickSnippetsProps> = ({ onInsertSnippet }) => {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');

  const categories = ['Tutti', 'Grid', 'Flexbox', 'Alignment', 'Container'];

  const filteredSnippets = activeCategory === 'Tutti' 
    ? CSS_SNIPPETS 
    : CSS_SNIPPETS.filter(s => s.category === activeCategory);

  const handleCopy = (snippet: CodeSnippet) => {
    navigator.clipboard.writeText(snippet.cssSnippet);
    setCopiedLabel(snippet.label);
    setTimeout(() => setCopiedLabel(null), 1800);
  };

  return (
    <div className="bg-slate-900/90 border-t border-slate-800 text-slate-300 p-2 text-xs flex flex-wrap items-center justify-between gap-2 z-20">
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-sky-400 font-semibold uppercase tracking-wider shrink-0 px-1">
          <Terminal className="w-3.5 h-3.5" />
          <span>Snippet Rapidi CSS:</span>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 shrink-0 border-r border-slate-800 pr-2 mr-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                activeCategory === cat 
                  ? 'bg-sky-500/20 text-sky-300 font-medium border border-sky-500/40' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Snippet Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {filteredSnippets.map((snippet) => (
            <div
              key={snippet.label}
              className="group relative flex items-center bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-md px-2 py-1 text-slate-300 text-[11px] font-mono shrink-0 transition-all"
            >
              <button
                onClick={() => onInsertSnippet(snippet.cssSnippet)}
                className="flex items-center gap-1 text-sky-300 hover:text-sky-200"
                title={`${snippet.description} — Clicca per inserire nell'editor`}
              >
                <Plus className="w-3 h-3 text-sky-400" />
                <span>{snippet.label}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(snippet);
                }}
                className="ml-1.5 text-slate-500 hover:text-slate-200 p-0.5 transition-colors"
                title="Copia negli appunti"
              >
                {copiedLabel === snippet.label ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
