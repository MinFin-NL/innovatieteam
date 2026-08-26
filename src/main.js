// NLDD Design System — Nederlandse Digitale Dienst (MinBZK).
//
// The components are imported one by one through their subpath exports rather
// than as `import '@nldd/design-system'`: the barrel registers all ~115
// elements, including the CodeMirror-backed editors, which costs ~1.4 MB of
// JavaScript this dashboard never runs. Add a line here when a template starts
// using a new nldd-* element.
import '@nldd/design-system/app-view';
import '@nldd/design-system/avatar';
import '@nldd/design-system/badge';
import '@nldd/design-system/button';
import '@nldd/design-system/card';
import '@nldd/design-system/collection';
import '@nldd/design-system/container';
import '@nldd/design-system/hero';
import '@nldd/design-system/image';
import '@nldd/design-system/page';
import '@nldd/design-system/page-footer';
import '@nldd/design-system/rich-text';
import '@nldd/design-system/sheet';
import '@nldd/design-system/simple-section';
import '@nldd/design-system/skip-link';
import '@nldd/design-system/spacer';
import '@nldd/design-system/tab-bar';
import '@nldd/design-system/tag';
import '@nldd/design-system/text';
import '@nldd/design-system/title';
import '@nldd/design-system/top-navigation-bar';
import '@nldd/design-system/top-title-bar';

// CSS variables + the Rijksoverheid fonts. RijksSans is licensed for
// Rijksoverheid publications and parties working on their behalf; outside that
// scope the license-free entry point is '@nldd/design-system/styles/system-font'.
import '@nldd/design-system/styles';

import { createApp } from 'vue';

import './index.css';
import App from './App.vue';

createApp(App).mount('#root');
