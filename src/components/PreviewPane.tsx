import React, { useEffect, useRef, useState } from 'react';
import { InspectorTarget, OverlaySettings, ViewportMode } from '../types';
import { 
  Eye, 
  Maximize2, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Info, 
  Layers, 
  Grid, 
  Crosshair, 
  RefreshCw,
  Box,
  Copy,
  Check
} from 'lucide-react';

interface PreviewPaneProps {
  htmlCode: string;
  cssCode: string;
  viewportMode: ViewportMode;
  overlaySettings: OverlaySettings;
  onChangeViewportMode: (mode: ViewportMode) => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({
  htmlCode,
  cssCode,
  viewportMode,
  overlaySettings,
  onChangeViewportMode,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inspectorData, setInspectorData] = useState<InspectorTarget | null>(null);
  const [inspectModeActive, setInspectModeActive] = useState<boolean>(true);
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Compute width style based on viewportMode
  const getViewportWidthStyle = () => {
    switch (viewportMode) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      case 'desktop': return 'w-[1280px]';
      case 'responsive': default: return 'w-full';
    }
  };

  // Generate complete HTML string to inject into iframe
  const generateIframeDoc = () => {
    const overlayCss = `
      /* INJECTED GRID OVERLAY HELPER STYLES */
      ${overlaySettings.showGridLines ? `
        [class], div, main, section, article, header, footer, nav, aside {
          outline: 1px dashed rgba(56, 189, 248, 0.5) !important;
        }
        *[style*="display: grid"], *[style*="display:grid"], .grid, div[class*="-grid"], div[class*="grid-"] {
          box-shadow: inset 0 0 0 2px rgba(99, 102, 241, 0.6) !important;
        }
      ` : ''}

      ${overlaySettings.showGaps ? `
        *[style*="gap"], *[class] {
          background-image: radial-gradient(rgba(244, 63, 94, 0.15) 1px, transparent 0) !important;
          background-size: 12px 12px !important;
        }
      ` : ''}

      ${overlaySettings.showContainerOutlines ? `
        body * {
          border-radius: 2px !important;
        }
      ` : ''}

      ${overlaySettings.showElementLabels ? `
        body *::before {
          content: attr(class);
          display: inline-block;
          font-family: monospace;
          font-size: 9px;
          background: rgba(15, 23, 42, 0.85);
          color: #38bdf8;
          padding: 1px 4px;
          border-radius: 2px;
          position: absolute;
          z-index: 9999;
          pointer-events: none;
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      ` : ''}

      /* Inspector highlight style */
      .grid-studio-inspected {
        outline: 2px solid #38bdf8 !important;
        outline-offset: -2px !important;
        background-color: rgba(56, 189, 248, 0.08) !important;
      }
    `;

    return `
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* User Provided CSS */
          ${cssCode}

          /* Global Canvas Reset & Overlays */
          ${overlayCss}
        </style>
      </head>
      <body style="${overlaySettings.darkModeCanvas ? 'background-color: #0b0f19; color: #f8fafc;' : 'background-color: #ffffff; color: #0f172a;'} margin: 0; min-height: 100vh; font-family: system-ui, -apple-system, sans-serif;">
        ${htmlCode}

        <script>
          // Inspector listener inside iframe
          let lastInspected = null;

          document.addEventListener('mouseover', (e) => {
            if (e.target === document.body || e.target === document.documentElement) return;
            
            if (lastInspected) {
              lastInspected.classList.remove('grid-studio-inspected');
            }
            
            e.target.classList.add('grid-studio-inspected');
            lastInspected = e.target;

            const computed = window.getComputedStyle(e.target);
            const rect = e.target.getBoundingClientRect();

            window.parent.postMessage({
              type: 'GRID_STUDIO_INSPECT',
              data: {
                tagName: e.target.tagName.toLowerCase(),
                className: e.target.className.replace('grid-studio-inspected', '').trim(),
                id: e.target.id || '',
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                display: computed.display,
                gridTemplateColumns: computed.gridTemplateColumns !== 'none' ? computed.gridTemplateColumns : undefined,
                gridTemplateRows: computed.gridTemplateRows !== 'none' ? computed.gridTemplateRows : undefined,
                gap: computed.gap !== 'normal' ? computed.gap : undefined,
                flexDirection: computed.display.includes('flex') ? computed.flexDirection : undefined,
              }
            }, '*');
          });

          document.addEventListener('mouseleave', () => {
            if (lastInspected) {
              lastInspected.classList.remove('grid-studio-inspected');
              lastInspected = null;
            }
          });
        </script>
      </body>
      </html>
    `;
  };

  // Listen for iframe postMessages for live inspection
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'GRID_STUDIO_INSPECT') {
        setInspectorData(event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* Top Preview Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shrink-0 select-none text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Eye className="w-4 h-4 text-sky-400" />
            <span>Anteprima Live</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Quick Viewport Buttons for Mobile/Tablet/Desktop */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onChangeViewportMode('responsive')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                viewportMode === 'responsive' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              100%
            </button>
            <button
              onClick={() => onChangeViewportMode('desktop')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                viewportMode === 'desktop' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1280px
            </button>
            <button
              onClick={() => onChangeViewportMode('tablet')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                viewportMode === 'tablet' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              768px
            </button>
            <button
              onClick={() => onChangeViewportMode('mobile')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                viewportMode === 'mobile' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              375px
            </button>
          </div>
        </div>

        {/* Status Indicator & Inspector toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
            <Crosshair className="w-3 h-3 text-sky-400" />
            <span>Ispettore Griglia Attivo</span>
          </div>
        </div>
      </div>

      {/* Main Preview Frame Container */}
      <div className="flex-1 overflow-auto bg-slate-950/60 p-4 flex justify-center items-start relative">
        <div 
          className={`h-full transition-all duration-300 shadow-2xl rounded-lg overflow-hidden border border-slate-800 flex flex-col ${getViewportWidthStyle()}`}
        >
          {/* Simulated Browser Device Header Bar */}
          {viewportMode !== 'responsive' && (
            <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <div className="bg-slate-950 px-3 py-0.5 rounded text-slate-300 border border-slate-800 truncate max-w-[200px]">
                {viewportMode === 'desktop' ? '1280px × Desktop' : viewportMode === 'tablet' ? '768px × Tablet' : '375px × Mobile'}
              </div>
              <div className="w-10"></div>
            </div>
          )}

          {/* Render Iframe */}
          <iframe
            ref={iframeRef}
            title="CSS Grid Live Preview"
            srcDoc={generateIframeDoc()}
            className="w-full h-full border-none bg-white min-h-[500px]"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      {/* Bottom Layout Inspector Drawer */}
      <div className="bg-slate-900 border-t border-slate-800 p-2.5 px-4 shrink-0 text-xs">
        {inspectorData ? (
          <div className="flex flex-wrap items-center justify-between gap-3 text-slate-300 font-mono">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-bold text-sky-400">
                <Box className="w-3.5 h-3.5 text-sky-400" />
                <span>&lt;{inspectorData.tagName}&gt;</span>
                {inspectorData.className && <span className="text-amber-400 font-medium">.{inspectorData.className.split(' ')[0]}</span>}
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span>Dimensione: <strong className="text-slate-200">{inspectorData.width} × {inspectorData.height}px</strong></span>
                <span>•</span>
                <span>Display: <strong className="text-emerald-400">{inspectorData.display}</strong></span>
              </div>

              {inspectorData.display.includes('grid') && (
                <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded text-indigo-300">
                  <Grid className="w-3 h-3 text-indigo-400" />
                  <span>Columns: {inspectorData.gridTemplateColumns}</span>
                  {inspectorData.gap && <span>(Gap: {inspectorData.gap})</span>}
                </div>
              )}

              {inspectorData.display.includes('flex') && (
                <div className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded text-sky-300">
                  <span>Flex Direction: {inspectorData.flexDirection}</span>
                  {inspectorData.gap && <span>(Gap: {inspectorData.gap})</span>}
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400">
              Passa il mouse sugli elementi per ispezionare le traccie griglia
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Info className="w-4 h-4 text-sky-400" />
            <span>Muovi il cursore nell'anteprima sopra per ispezionare le proprietà CSS calcolate del contenitore o della cella.</span>
          </div>
        )}
      </div>
    </div>
  );
};
