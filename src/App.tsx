import React, { useEffect, useState } from 'react';
import { HeaderMenu } from './components/HeaderMenu';
import { CodeEditor } from './components/CodeEditor';
import { PreviewPane } from './components/PreviewPane';
import { QuickSnippets } from './components/QuickSnippets';
import { ExportModal } from './components/ExportModal';
import { GRID_EXAMPLES } from './data/examples';
import { ActiveTab, GridExample, OverlaySettings, SplitLayout, ViewportMode } from './types';

export default function App() {
  // Load default example or local storage
  const defaultExample = GRID_EXAMPLES[0];
  
  const [currentExample, setCurrentExample] = useState<GridExample>(defaultExample);
  const [htmlCode, setHtmlCode] = useState<string>(() => {
    return localStorage.getItem('grid_studio_html') || defaultExample.html;
  });
  const [cssCode, setCssCode] = useState<string>(() => {
    return localStorage.getItem('grid_studio_css') || defaultExample.css;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('css');
  const [splitLayout, setSplitLayout] = useState<SplitLayout>('horizontal');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');
  const [customViewportWidth, setCustomViewportWidth] = useState<number>(0);

  const [overlaySettings, setOverlaySettings] = useState<OverlaySettings>({
    showGridLines: true,
    showGaps: true,
    showContainerOutlines: false,
    showElementLabels: false,
    darkModeCanvas: true,
  });

  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Auto-save user code edits to localStorage
  useEffect(() => {
    localStorage.setItem('grid_studio_html', htmlCode);
  }, [htmlCode]);

  useEffect(() => {
    localStorage.setItem('grid_studio_css', cssCode);
  }, [cssCode]);

  // Handle selecting an example preset
  const handleSelectExample = (example: GridExample) => {
    setCurrentExample(example);
    setHtmlCode(example.html);
    setCssCode(example.css);
  };

  // Handle starting from scratch with a blank canvas
  const handleSelectBlank = () => {
    const blank = GRID_EXAMPLES.find(e => e.id === 'blank-slate') || GRID_EXAMPLES[0];
    setCurrentExample(blank);
    setHtmlCode(blank.html);
    setCssCode(blank.css);
  };

  // Clear code completely (0 lines)
  const handleClearCode = () => {
    setHtmlCode('');
    setCssCode('');
  };

  // Reset code to current example default (without window.confirm block in iframe)
  const handleResetCode = () => {
    setHtmlCode(currentExample.html);
    setCssCode(currentExample.css);
  };

  // Toggle overlay helper setting
  const handleToggleOverlaySetting = (key: keyof OverlaySettings) => {
    setOverlaySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Format code helper
  const handleFormatCode = () => {
    try {
      // Basic clean formatting
      const formattedCss = cssCode
        .replace(/\s*\{\s*/g, ' {\n  ')
        .replace(/;\s*/g, ';\n  ')
        .replace(/\s*\}\s*/g, '\n}\n\n')
        .replace(/\n  \n/g, '\n')
        .trim();

      const formattedHtml = htmlCode
        .replace(/></g, '>\n<')
        .trim();

      setCssCode(formattedCss);
      setHtmlCode(formattedHtml);
    } catch (err) {
      console.log('Format error', err);
    }
  };

  // Insert quick CSS snippet into active editor
  const handleInsertSnippet = (snippetCss: string) => {
    setActiveTab('css');
    setCssCode(prev => `${prev}\n\n/* Snippet Aggiunto */\n${snippetCss}`);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Header Menu Bar */}
      <HeaderMenu
        currentExampleId={currentExample.id}
        onSelectExample={handleSelectExample}
        onSelectBlank={handleSelectBlank}
        splitLayout={splitLayout}
        onChangeSplitLayout={setSplitLayout}
        viewportMode={viewportMode}
        onChangeViewportMode={setViewportMode}
        customViewportWidth={customViewportWidth}
        onChangeCustomWidth={setCustomViewportWidth}
        overlaySettings={overlaySettings}
        onToggleOverlaySetting={handleToggleOverlaySetting}
        onFormatCode={handleFormatCode}
        onResetCode={handleResetCode}
        onOpenExportModal={() => setExportModalOpen(true)}
      />

      {/* Main Workspace Pane */}
      <main className="flex-1 overflow-hidden relative">
        {splitLayout === 'code-only' && (
          <div className="w-full h-full flex flex-col">
            <div className="flex-1">
              <CodeEditor
                htmlCode={htmlCode}
                cssCode={cssCode}
                onChangeHtml={setHtmlCode}
                onChangeCss={setCssCode}
                activeTab={activeTab}
                onChangeActiveTab={setActiveTab}
                onFormatCode={handleFormatCode}
                onClearCode={handleClearCode}
                onResetBlank={handleSelectBlank}
              />
            </div>
            <QuickSnippets onInsertSnippet={handleInsertSnippet} />
          </div>
        )}

        {splitLayout === 'preview-only' && (
          <div className="w-full h-full">
            <PreviewPane
              htmlCode={htmlCode}
              cssCode={cssCode}
              viewportMode={viewportMode}
              overlaySettings={overlaySettings}
              onChangeViewportMode={setViewportMode}
            />
          </div>
        )}

        {splitLayout === 'horizontal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full divide-x divide-slate-800">
            {/* Left Code Editor Pane */}
            <div className="h-full flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                  onChangeHtml={setHtmlCode}
                  onChangeCss={setCssCode}
                  activeTab={activeTab}
                  onChangeActiveTab={setActiveTab}
                  onFormatCode={handleFormatCode}
                  onClearCode={handleClearCode}
                  onResetBlank={handleSelectBlank}
                />
              </div>
              <QuickSnippets onInsertSnippet={handleInsertSnippet} />
            </div>

            {/* Right Live Preview Pane */}
            <div className="h-full overflow-hidden">
              <PreviewPane
                htmlCode={htmlCode}
                cssCode={cssCode}
                viewportMode={viewportMode}
                overlaySettings={overlaySettings}
                onChangeViewportMode={setViewportMode}
              />
            </div>
          </div>
        )}

        {splitLayout === 'vertical' && (
          <div className="grid grid-rows-2 h-full w-full divide-y divide-slate-800">
            {/* Top Code Editor Pane */}
            <div className="h-full flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                  onChangeHtml={setHtmlCode}
                  onChangeCss={setCssCode}
                  activeTab={activeTab}
                  onChangeActiveTab={setActiveTab}
                  onFormatCode={handleFormatCode}
                  onClearCode={handleClearCode}
                  onResetBlank={handleSelectBlank}
                />
              </div>
              <QuickSnippets onInsertSnippet={handleInsertSnippet} />
            </div>

            {/* Bottom Live Preview Pane */}
            <div className="h-full overflow-hidden">
              <PreviewPane
                htmlCode={htmlCode}
                cssCode={cssCode}
                viewportMode={viewportMode}
                overlaySettings={overlaySettings}
                onChangeViewportMode={setViewportMode}
              />
            </div>
          </div>
        )}
      </main>

      {/* Export Code Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        htmlCode={htmlCode}
        cssCode={cssCode}
      />
    </div>
  );
}
