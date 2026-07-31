export interface CodeSnippet {
  label: string;
  category: 'Grid' | 'Flexbox' | 'Alignment' | 'Container';
  cssSnippet: string;
  description: string;
}

export const CSS_SNIPPETS: CodeSnippet[] = [
  {
    label: 'repeat(auto-fit, minmax(...))',
    category: 'Grid',
    cssSnippet: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\ngap: 1.5rem;',
    description: 'Griglia fluida e reattiva senza media query.'
  },
  {
    label: 'grid-template-areas',
    category: 'Grid',
    cssSnippet: `grid-template-areas:
  "header header"
  "sidebar main"
  "footer footer";
grid-template-columns: 240px 1fr;
grid-template-rows: auto 1fr auto;`,
    description: 'Definizione aree visive con nomi custom.'
  },
  {
    label: 'place-items: center',
    category: 'Alignment',
    cssSnippet: 'display: grid;\nplace-items: center;\nmin-height: 100vh;',
    description: 'Centramento perfetto sia verticale che orizzontale.'
  },
  {
    label: 'grid-column: span 2',
    category: 'Grid',
    cssSnippet: 'grid-column: span 2;\ngrid-row: span 2;',
    description: 'Espande una cella su più colonne e righe.'
  },
  {
    label: 'flex: 1 1 auto (Wrap)',
    category: 'Flexbox',
    cssSnippet: 'display: flex;\nflex-wrap: wrap;\ngap: 1rem;\njustify-content: space-between;',
    description: 'Flexbox con andamento a capo e spaziatura automatica.'
  },
  {
    label: 'container-type: inline-size',
    category: 'Container',
    cssSnippet: 'container-type: inline-size;\ncontainer-name: layout-box;',
    description: 'Abilita le Container Queries CSS per il contenitore.'
  },
  {
    label: 'subgrid (Nest)',
    category: 'Grid',
    cssSnippet: 'display: grid;\ngrid-template-columns: subgrid;\ngrid-template-rows: subgrid;',
    description: 'Eredita le traccie della griglia genitore per un allineamento perfetto.'
  }
];
