import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/globals.css';
import { loadRuntimeConfig } from './lib/config.js';
import { flushQueueOnLoad } from './lib/leadQueue.js';

// Best-effort retry of any contact/audit submissions that failed earlier
// (e.g. backend was offline). Never blocks rendering.
flushQueueOnLoad();

// Load runtime configuration before rendering the app
async function initializeApp() {
  // Prerendered blog pages are served as pure static HTML for SEO.
  // Intentionally skip React mounting so the crawler-facing markup stays
  // lightweight and self-contained — no client-side hydration needed.
  if (
    document
      .querySelector('meta[name="prerender-static-page"]')
      ?.getAttribute('content') === 'blog'
  ) {
    return;
  }

  try {
    await loadRuntimeConfig();
    console.log('Runtime configuration loaded successfully');
  } catch (error) {
    console.warn(
      'Failed to load runtime configuration, using defaults:',
      error
    );
  }

  // Render the app
createRoot(document.getElementById('root')).render(<App />);
}

// Initialize the app
initializeApp();
