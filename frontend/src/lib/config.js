// Runtime configuration loader for the SellHive frontend.
// Loads env-based config before rendering the app.

export const DEFAULT_CONFIG = {
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  appTitle: import.meta.env.VITE_APP_TITLE || 'SellHive',
};

export async function loadRuntimeConfig() {
  // Simple synchronous defaults — expand here if server-provided config is needed.
  return { ...DEFAULT_CONFIG };
}

export default DEFAULT_CONFIG;
