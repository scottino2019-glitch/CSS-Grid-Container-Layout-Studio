export interface GridExample {
  id: string;
  title: string;
  category: 'Grid' | 'Flexbox' | 'Bento' | 'Advanced' | 'Layouts';
  description: string;
  html: string;
  css: string;
}

export type ViewportMode = 'responsive' | 'desktop' | 'tablet' | 'mobile';

export interface ViewportDimensions {
  width: number; // in pixels or 0 for 100%
  label: string;
}

export type ActiveTab = 'css' | 'html';

export type SplitLayout = 'horizontal' | 'vertical' | 'code-only' | 'preview-only';

export interface OverlaySettings {
  showGridLines: boolean;
  showGaps: boolean;
  showContainerOutlines: boolean;
  showElementLabels: boolean;
  darkModeCanvas: boolean;
}

export interface InspectorTarget {
  tagName: string;
  className: string;
  id: string;
  width: number;
  height: number;
  display: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gap?: string;
  flexDirection?: string;
}
