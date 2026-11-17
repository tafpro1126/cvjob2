export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  updatedAt: string;
}

const CONSENT_KEY = 'mm_cookie_consent_v1';
const THEME_KEY = 'mm_theme_v1';

export function readCookiePreferences(): CookiePreferences | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null && typeof parsed.analytics === 'boolean') {
      return {
        essential: true,
        analytics: parsed.analytics,
        updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCookiePreferences(analytics: boolean): CookiePreferences {
  const prefs: CookiePreferences = {
    essential: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
    }
  } catch {
    // Ignore storage quota or private mode restrictions safely
  }
  return prefs;
}

export function readSavedTheme(): 'light' | 'dark' | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const val = window.localStorage.getItem(THEME_KEY);
    return val === 'dark' || val === 'light' ? val : null;
  } catch {
    return null;
  }
}

export function saveThemePreference(theme: 'light' | 'dark'): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  } catch {
    // Safe fallback
  }
}

export function resolveInitialTab(search: string, hash: string): 'stage' | 'digital' {
  const cleanHash = (hash || '').toLowerCase();
  if (cleanHash === '#digital' || cleanHash === '#projets' || cleanHash === '#services' || cleanHash === '#devis') {
    return 'digital';
  }
  const params = new URLSearchParams(search || '');
  if (params.get('src') === 'cv' || cleanHash === '#stage' || !cleanHash) {
    return 'stage';
  }
  return 'stage';
}

export type LegalDocType = 'confidentialite' | 'cgu' | 'cookies' | 'mentions';

export function resolveLegalHash(hash: string): LegalDocType | null {
  const h = (hash || '').toLowerCase();
  if (h === '#confidentialite') return 'confidentialite';
  if (h === '#cgu') return 'cgu';
  if (h === '#cookies') return 'cookies';
  if (h === '#mentions' || h === '#mentions-legales') return 'mentions';
  return null;
}

export function isNotFoundRoute(pathname: string, hash: string): boolean {
  const cleanPath = (pathname || '/').replace(/\/+$/, '') || '/';
  if (cleanPath !== '/' && cleanPath !== '/index.html') {
    return true;
  }
  if ((hash || '').toLowerCase() === '#404') {
    return true;
  }
  return false;
}
