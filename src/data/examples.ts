import { GridExample } from '../types';

export const GRID_EXAMPLES: GridExample[] = [
  {
    id: 'blank-slate',
    title: '➕ Tela Vuota (Crea da zero)',
    category: 'Layouts',
    description: 'Scheletro vuoto minimale per costruire la tua griglia personalizzata da zero.',
    html: `<!-- Contenitore Principale Griglia -->
<div class="grid-container">
  <div class="box box-1">
    <span class="box-id">BOX 1</span>
    <span class="box-meta">grid-column: span 1</span>
  </div>

  <div class="box box-2">
    <span class="box-id">BOX 2</span>
    <span class="box-meta">grid-column: span 1</span>
  </div>

  <div class="box box-3">
    <span class="box-id">BOX 3</span>
    <span class="box-meta">grid-column: span 1</span>
  </div>

  <div class="box box-4">
    <span class="box-id">BOX 4</span>
    <span class="box-meta">grid-column: span 1</span>
  </div>
</div>`,
    css: `/* ==========================================
   TELA VUOTA - CREA LA TUA GRIGLIA DA ZERO
   Modifica le proprietà qui sotto per sperimentare!
   ========================================== */

.grid-container {
  display: grid;
  /* Definizione Colonne: es. repeat(2, 1fr) oppure 200px 1fr 100px */
  grid-template-columns: repeat(2, 1fr);
  
  /* Spazio tra i box */
  gap: 1.25rem;
  
  /* Dettagli di stile della tela */
  padding: 1.5rem;
  background-color: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* Stile Strutturale del Box (Scheletro) */
.box {
  background: #1e293b;
  border: 2px dashed #334155;
  border-radius: 0.75rem;
  padding: 1.5rem;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: #f8fafc;
  transition: all 0.2s ease;
}

.box:hover {
  border-color: #38bdf8;
  background: #1e293b;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
}

.box-id {
  font-size: 1.1rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 0.05em;
}

.box-meta {
  font-size: 0.75rem;
  color: #94a3b8;
  background: rgba(15, 23, 42, 0.6);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #334155;
}

/* Esempio di Personalizzazione Singolo Box:
.box-1 {
  grid-column: span 2;
  border-color: #f59e0b;
}
*/`
  },
  {
    id: 'bento-box',
    title: 'Bento Grid Scheletro (6 Box)',
    category: 'Bento',
    description: 'Scheletro di layout Bento con contenitori asimmetrici (2x2, tall, wide).',
    html: `<div class="bento-container">
  <!-- Box Principale Hero (2x2) -->
  <div class="bento-box hero">
    <span class="tag">HERO (2x2)</span>
    <span class="code">grid-column: span 2; grid-row: span 2;</span>
  </div>

  <!-- Box Standard 1 -->
  <div class="bento-box box-1">
    <span class="tag">BOX 1</span>
    <span class="code">1x1</span>
  </div>

  <!-- Box Standard 2 -->
  <div class="bento-box box-2">
    <span class="tag">BOX 2</span>
    <span class="code">1x1</span>
  </div>

  <!-- Box Alto Verticale (span 2 righe) -->
  <div class="bento-box tall">
    <span class="tag">TALL (1x2)</span>
    <span class="code">grid-row: span 2;</span>
  </div>

  <!-- Box Largo Orizzontale (span 2 colonne) -->
  <div class="bento-box wide">
    <span class="tag">WIDE (2x1)</span>
    <span class="code">grid-column: span 2;</span>
  </div>
</div>`,
    css: `/* SCHELETRO BENTO GRID */
.bento-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 160px;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: ui-monospace, monospace;
}

/* Stile Base Scheletro Box */
.bento-box {
  background: rgba(30, 41, 59, 0.8);
  border: 2px dashed #334155;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
}

/* Regole Spanning del Bento */
.bento-box.hero {
  grid-column: span 2;
  grid-row: span 2;
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
}

.bento-box.tall {
  grid-row: span 2;
  border-color: #38bdf8;
  background: rgba(56, 189, 248, 0.08);
}

.bento-box.wide {
  grid-column: span 2;
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
}

.tag {
  font-size: 0.9rem;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: 0.05em;
}

.code {
  font-size: 0.75rem;
  color: #94a3b8;
  background: #0f172a;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #334155;
}

/* Responsive per schermi piccoli */
@media (max-width: 768px) {
  .bento-container {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .bento-box.hero,
  .bento-box.tall,
  .bento-box.wide {
    grid-column: span 1;
    grid-row: span 1;
    min-height: 120px;
  }
}`
  },
  {
    id: 'grid-template-areas',
    title: 'Holy Grail Scheletro (5 Zone)',
    category: 'Layouts',
    description: 'Scheletro con grid-template-areas: Header, Nav Sinistra, Main, Widget Destra e Footer.',
    html: `<div class="site-skeleton">
  <div class="zone header">
    <span class="zone-title">HEADER</span>
    <span class="zone-area">grid-area: header;</span>
  </div>

  <div class="zone sidebar-left">
    <span class="zone-title">NAV SINISTRA</span>
    <span class="zone-area">grid-area: nav-left;</span>
  </div>

  <div class="zone main-content">
    <span class="zone-title">MAIN CONTENT</span>
    <span class="zone-area">grid-area: main;</span>
  </div>

  <div class="zone sidebar-right">
    <span class="zone-title">WIDGET DESTRA</span>
    <span class="zone-area">grid-area: nav-right;</span>
  </div>

  <div class="zone footer">
    <span class="zone-title">FOOTER</span>
    <span class="zone-area">grid-area: footer;</span>
  </div>
</div>`,
    css: `/* SCHELETRO HOLY GRAIL LAYOUT */
.site-skeleton {
  display: grid;
  min-height: 100vh;
  gap: 1rem;
  padding: 1rem;
  background-color: #0f172a;
  box-sizing: border-box;
  font-family: ui-monospace, monospace;

  /* Definizione Colonne e Righe */
  grid-template-columns: 200px 1fr 180px;
  grid-template-rows: 80px 1fr 60px;
  
  /* Mappa delle Aree */
  grid-template-areas:
    "header   header    header"
    "nav-left main      nav-right"
    "footer   footer    footer";
}

/* Assegnazione Aree */
.header        { grid-area: header; border-color: #38bdf8; }
.sidebar-left  { grid-area: nav-left; border-color: #f59e0b; }
.main-content  { grid-area: main; border-color: #10b981; }
.sidebar-right { grid-area: nav-right; border-color: #a855f7; }
.footer        { grid-area: footer; border-color: #64748b; }

/* Stile Scheletro Zone */
.zone {
  background: rgba(30, 41, 59, 0.7);
  border: 2px dashed #334155;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.zone-title {
  font-weight: 800;
  font-size: 1rem;
  color: #f8fafc;
}

.zone-area {
  font-size: 0.75rem;
  color: #94a3b8;
  background: #0f172a;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
}

/* Breakpoint Responsive Mobile */
@media (max-width: 800px) {
  .site-skeleton {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "header"
      "main"
      "nav-left"
      "nav-right"
      "footer";
  }
}`
  },
  {
    id: 'auto-fit-gallery',
    title: 'Griglia Fluida Auto-Fit Scheletro',
    category: 'Grid',
    description: 'Scheletro reattivo con repeat(auto-fit, minmax(220px, 1fr)) senza media query.',
    html: `<div class="fluid-skeleton">
  <div class="fluid-box">
    <span class="num">01</span>
    <span class="info">minmax(220px, 1fr)</span>
  </div>
  <div class="fluid-box">
    <span class="num">02</span>
    <span class="info">minmax(220px, 1fr)</span>
  </div>
  <div class="fluid-box">
    <span class="num">03</span>
    <span class="info">minmax(220px, 1fr)</span>
  </div>
  <div class="fluid-box">
    <span class="num">04</span>
    <span class="info">minmax(220px, 1fr)</span>
  </div>
  <div class="fluid-box">
    <span class="num">05</span>
    <span class="info">minmax(220px, 1fr)</span>
  </div>
  <div class="fluid-box">
    <span class="num">06</span>
    <span class="info">minmax(220px, 1fr)</span>
  </div>
</div>`,
    css: `/* SCHELETRO AUTO-FIT REATTIVO */
.fluid-skeleton {
  display: grid;
  /* La magia dell'auto-fit */
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  padding: 1.5rem;
  background-color: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: ui-monospace, monospace;
}

.fluid-box {
  background: #1e293b;
  border: 2px dashed #38bdf8;
  border-radius: 0.75rem;
  padding: 1.5rem;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.num {
  font-size: 1.5rem;
  font-weight: 800;
  color: #38bdf8;
}

.info {
  font-size: 0.75rem;
  color: #94a3b8;
  background: #0f172a;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #334155;
}`
  },
  {
    id: '12-column-bootstrap-style',
    title: 'Griglia 12 Colonne Scheletro',
    category: 'Grid',
    description: 'Scheletro a 12 colonne con suddivisioni 12, 8/4, 4/4/4 e 3/3/3/3.',
    html: `<div class="grid-12-wrapper">
  <!-- RIGA 1: Full (12) -->
  <div class="row">
    <div class="col col-12">
      <span>col-12 (100%)</span>
    </div>
  </div>

  <!-- RIGA 2: 8 + 4 -->
  <div class="row">
    <div class="col col-8">
      <span>col-8 (66.6%)</span>
    </div>
    <div class="col col-4">
      <span>col-4 (33.3%)</span>
    </div>
  </div>

  <!-- RIGA 3: 4 + 4 + 4 -->
  <div class="row">
    <div class="col col-4">
      <span>col-4</span>
    </div>
    <div class="col col-4">
      <span>col-4</span>
    </div>
    <div class="col col-4">
      <span>col-4</span>
    </div>
  </div>

  <!-- RIGA 4: 3 + 3 + 3 + 3 -->
  <div class="row">
    <div class="col col-3"><span>col-3</span></div>
    <div class="col col-3"><span>col-3</span></div>
    <div class="col col-3"><span>col-3</span></div>
    <div class="col col-3"><span>col-3</span></div>
  </div>
</div>`,
    css: `/* SCHELETRO GRIGLIA 12 COLONNE */
.grid-12-wrapper {
  padding: 1.5rem;
  background-color: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: ui-monospace, monospace;
}

.row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Classi Colonne */
.col-12 { grid-column: span 12; border-color: #38bdf8; }
.col-8  { grid-column: span 8;  border-color: #10b981; }
.col-4  { grid-column: span 4;  border-color: #f59e0b; }
.col-3  { grid-column: span 3;  border-color: #a855f7; }

.col {
  background: #1e293b;
  border: 2px dashed #334155;
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8fafc;
  font-weight: 700;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .col-8, .col-4, .col-3 {
    grid-column: span 12;
  }
}`
  },
  {
    id: 'flexbox-container-wrap',
    title: 'Flexbox Wrap & Grow Scheletro',
    category: 'Flexbox',
    description: 'Scheletro con contenitori Flexbox e proprietà flex-grow, flex-shrink e basis.',
    html: `<div class="flex-skeleton">
  <div class="flex-box flex-grow-2">
    <span class="label">flex: 2 1 300px</span>
    <span class="sub">Doppio Spazio</span>
  </div>

  <div class="flex-box flex-grow-1">
    <span class="label">flex: 1 1 200px</span>
    <span class="sub">Spazio Standard</span>
  </div>

  <div class="flex-box flex-grow-1">
    <span class="label">flex: 1 1 200px</span>
    <span class="sub">Spazio Standard</span>
  </div>

  <div class="flex-box flex-full">
    <span class="label">flex: 100%</span>
    <span class="sub">Intera Riga</span>
  </div>
</div>`,
    css: `/* SCHELETRO FLEXBOX LAYOUT */
.flex-skeleton {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: ui-monospace, monospace;
}

.flex-box {
  background: #1e293b;
  border: 2px dashed #38bdf8;
  border-radius: 0.75rem;
  padding: 1.5rem;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}

.flex-grow-2 {
  flex: 2 1 300px;
  border-color: #f59e0b;
}

.flex-grow-1 {
  flex: 1 1 200px;
  border-color: #38bdf8;
}

.flex-full {
  flex: 1 1 100%;
  border-color: #10b981;
}

.label {
  font-weight: 800;
  color: #f8fafc;
  font-size: 0.9rem;
}

.sub {
  font-size: 0.75rem;
  color: #94a3b8;
  background: #0f172a;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}`
  },
  {
    id: 'container-queries',
    title: 'CSS Container Queries Scheletro',
    category: 'Advanced',
    description: 'Scheletro con contenitori intelligenti che variano layout in base al contenitore padre.',
    html: `<div class="cq-wrapper">
  <!-- Contenitore Stretto -->
  <div class="cq-box-narrow">
    <div class="cq-card">
      <span class="title">CARD IN BOX STRETTO</span>
      <span class="status">Disposizione Verticale</span>
    </div>
  </div>

  <!-- Contenitore Largo -->
  <div class="cq-box-wide">
    <div class="cq-card">
      <span class="title">CARD IN BOX LARGO</span>
      <span class="status">Disposizione Orizzontale (@container min-width: 350px)</span>
    </div>
  </div>
</div>`,
    css: `/* SCHELETRO CONTAINER QUERIES */
.cq-wrapper {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #0f172a;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: ui-monospace, monospace;
}

@media (max-width: 768px) {
  .cq-wrapper { grid-template-columns: 1fr; }
}

.cq-box-narrow, .cq-box-wide {
  background: #1e293b;
  border: 1px solid #334155;
  padding: 1rem;
  border-radius: 0.75rem;
  container-type: inline-size;
  container-name: cardbox;
}

.cq-card {
  background: rgba(15, 23, 42, 0.8);
  border: 2px dashed #38bdf8;
  border-radius: 0.5rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.title { font-weight: 800; color: #f8fafc; font-size: 0.85rem; }
.status { font-size: 0.75rem; color: #94a3b8; }

/* REGLA @container */
@container cardbox (min-width: 350px) {
  .cq-card {
    flex-direction: row;
    justify-content: space-between;
    border-color: #10b981;
  }
}`
  }
];
