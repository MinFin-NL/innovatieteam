import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerIconSet, defaultIconSet } from '@rijkshuisstijl-community/components-react';

// Register the full NLDS icon set so <Icon icon="…" /> works throughout the app.
registerIconSet(defaultIconSet);

// NL Design System — Rijkshuisstijl Community.
// Order matters: design tokens first, then the official Rijksoverheid font,
// then the component CSS. The app tree is wrapped in `.rhc-theme` (see App.jsx).
import '@rijkshuisstijl-community/design-tokens/dist/index.css';
import '@rijkshuisstijl-community/font/dist/index.css';
import '@rijkshuisstijl-community/components-css/dist/index.css';

import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
