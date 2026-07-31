import React, { useState } from 'react';
import { 
  Grid, 
  Layout, 
  Maximize2, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Eye, 
  Copy, 
  RotateCcw, 
  Sparkles, 
  Columns, 
  Rows, 
  Code, 
  Check, 
  Download,
  HelpCircle,
  ChevronDown,
  Layers,
  Box,
  Palette,
  PlusCircle
} from 'lucide-react';
import { GridExample, OverlaySettings, SplitLayout, ViewportMode } from '../types';
import { GRID_EXAMPLES } from '../data/examples';

interface HeaderMenuProps {
  currentExampleId: string;
  onSelectExample: (example: GridExample) => void;
  onSelectBlank: () => void;
  splitLayout: SplitLayout;
  onChangeSplitLayout: (layout: SplitLayout) => void;
  viewportMode: ViewportMode;
  onChangeViewportMode: (mode: ViewportMode) => void;
  customViewportWidth: number;
  onChangeCustomWidth: (w: number) => void;
  overlaySettings: OverlaySettings;
  onToggleOverlaySetting: (key: keyof OverlaySettings) => void;
  onFormatCode: () => void;
  onResetCode: () => void;
  onOpenExportModal: () => void;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  currentExampleId,
  onSelectExample,
  onSelectBlank,
  splitLayout,
  onChangeSplitLayout,
  viewportMode,
  onChangeViewportMode,
  customViewportWidth,
  onChangeCustomWidth,
  overlaySettings,
  onToggleOverlaySetting,
  onFormatCode,
  onResetCode,
  onOpenExportModal,
}) => {
  const [examplesOpen, setExamplesOpen] = useState(false);
  const [overlayMenuOpen, setOverlayMenuOpen] = useState(false);

  const categories = Array.from(new Set(GRID_EXAMPLES.map(e => e.category)));

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none text-sm z-30 relative">
      {/* Left Group: Brand, Blank Canvas & Examples Menu */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-slate-100 tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base text-white font-extrabold leading-none block">Grid Studio</span>
            <span className="text-[10px] text-amber-400 font-mono leading-none block mt-0.5">Scheletri & Pure Layout CSS</span>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-800 hidden sm:block" />

        {/* Dedicated "Crea da Zero" Button */}
        <button
          onClick={onSelectBlank}
          className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-sky-500/20 hover:from-amber-500/30 hover:to-sky-500/30 text-amber-300 font-semibold px-3 py-1.5 rounded-md border border-amber-500/40 transition-all shadow-sm active:scale-95 text-xs"
          title="Inizia con una tela vuota da zero"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>Crea da Zero</span>
        </button>

        {/* Esempi Dropdown Menu */}
        <div className="relative">
          <button
            id="examples-menu-button"
            onClick={() => {
              setExamplesOpen(!examplesOpen);
              setOverlayMenuOpen(false);
            }}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1.5 rounded-md font-medium border border-slate-700 transition-all shadow-sm active:scale-[0.98] text-xs"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Scheletri Preset</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${examplesOpen ? 'rotate-180' : ''}`} />
          </button>

          {examplesOpen && (
            <div 
              className="absolute top-full left-0 mt-1.5 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 divide-y divide-slate-800 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {categories.map((cat) => (
                <div key={cat} className="py-1.5 first:pt-0 last:pb-0">
                  <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    {cat}
                  </div>
                  {GRID_EXAMPLES.filter(e => e.category === cat).map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => {
                        onSelectExample(ex);
                        setExamplesOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-start gap-2 transition-colors ${
                        currentExampleId === ex.id 
                          ? 'bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/30' 
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="mt-0.5">
                        <Box className={`w-4 h-4 ${currentExampleId === ex.id ? 'text-sky-400' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-100">{ex.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{ex.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle Group: Viewport / Responsive Mode */}
      <div className="hidden lg:flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800/80 gap-1">
        <button
          onClick={() => onChangeViewportMode('responsive')}
          title="Schermo Fluido (100%)"
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            viewportMode === 'responsive' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fluido</span>
        </button>

        <button
          onClick={() => onChangeViewportMode('desktop')}
          title="Desktop (1280px)"
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            viewportMode === 'desktop' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop</span>
        </button>

        <button
          onClick={() => onChangeViewportMode('tablet')}
          title="Tablet (768px)"
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            viewportMode === 'tablet' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>Tablet</span>
        </button>

        <button
          onClick={() => onChangeViewportMode('mobile')}
          title="Mobile (375px)"
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            viewportMode === 'mobile' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile</span>
        </button>
      </div>

      {/* Right Group: Visual Overlays, Format, Split Layout, Export */}
      <div className="flex items-center gap-2">
        {/* Visual Overlays Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setOverlayMenuOpen(!overlayMenuOpen);
              setExamplesOpen(false);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              overlaySettings.showGridLines || overlaySettings.showGaps || overlaySettings.showContainerOutlines
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Strumenti e Guide Visive per Griglia"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide Visive</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {overlayMenuOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs space-y-2">
              <div className="font-semibold text-slate-300 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Guide Anteprima</span>
              </div>

              <label className="flex items-center justify-between cursor-pointer py-1 hover:text-white">
                <span className="text-slate-300">Linee Griglia CSS</span>
                <input
                  type="checkbox"
                  checked={overlaySettings.showGridLines}
                  onChange={() => onToggleOverlaySetting('showGridLines')}
                  className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-sky-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1 hover:text-white">
                <span className="text-slate-300">Evidenzia Spazi (Gap)</span>
                <input
                  type="checkbox"
                  checked={overlaySettings.showGaps}
                  onChange={() => onToggleOverlaySetting('showGaps')}
                  className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-sky-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1 hover:text-white">
                <span className="text-slate-300">Bordi Contenitori</span>
                <input
                  type="checkbox"
                  checked={overlaySettings.showContainerOutlines}
                  onChange={() => onToggleOverlaySetting('showContainerOutlines')}
                  className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-sky-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1 hover:text-white">
                <span className="text-slate-300">Etichette Elementi</span>
                <input
                  type="checkbox"
                  checked={overlaySettings.showElementLabels}
                  onChange={() => onToggleOverlaySetting('showElementLabels')}
                  className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-sky-500"
                />
              </label>

              <div className="border-t border-slate-800 pt-2 mt-2">
                <label className="flex items-center justify-between cursor-pointer py-1 hover:text-white">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    Sfondo Scuro Anteprima
                  </span>
                  <input
                    type="checkbox"
                    checked={overlaySettings.darkModeCanvas}
                    onChange={() => onToggleOverlaySetting('darkModeCanvas')}
                    className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-sky-500"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Layout Split Selector */}
        <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onChangeSplitLayout('horizontal')}
            title="Split Orizzontale (Fianco a fianco)"
            className={`p-1.5 rounded transition-colors ${
              splitLayout === 'horizontal' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeSplitLayout('vertical')}
            title="Split Verticale (Sopra / Sotto)"
            className={`p-1.5 rounded transition-colors ${
              splitLayout === 'vertical' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rows className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeSplitLayout('code-only')}
            title="Solo Codice"
            className={`p-1.5 rounded transition-colors ${
              splitLayout === 'code-only' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeSplitLayout('preview-only')}
            title="Solo Anteprima"
            className={`p-1.5 rounded transition-colors ${
              splitLayout === 'preview-only' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layout className="w-4 h-4" />
          </button>
        </div>

        {/* Format Code */}
        <button
          onClick={onFormatCode}
          className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-md text-xs font-medium border border-slate-700 transition-colors"
          title="Formatta Codice CSS & HTML"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Formatta</span>
        </button>

        {/* Reset */}
        <button
          onClick={onResetCode}
          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-md transition-colors"
          title="Ripristina Esempio Attuale"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Export / Download */}
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium px-3 py-1.5 rounded-md text-xs shadow-md shadow-sky-500/20 transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Esporta</span>
        </button>
      </div>
    </header>
  );
};
