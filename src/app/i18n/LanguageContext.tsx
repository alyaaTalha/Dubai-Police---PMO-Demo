import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DirectionProvider } from '@radix-ui/react-direction';

export type Language = 'en' | 'ar';

interface LanguageContextValue {
  lang: Language;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  /** Pick the string for the active language: tr('Home', 'الرئيسية'). Falls back to English when Arabic is missing. */
  tr: (en: string, ar?: string) => string;
  /** Format a number using the active locale (Western digits are kept for readability). */
  fmtNumber: (n: number, opts?: Intl.NumberFormatOptions) => string;
}

const STORAGE_KEY = 'pmo-demo-language';

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
  } catch {
    /* storage unavailable */
  }
  return 'ar';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(readStoredLanguage);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', dir);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang, dir]);

  const toggleLanguage = useCallback(() => setLang(prev => (prev === 'en' ? 'ar' : 'en')), []);

  const value = useMemo<LanguageContextValue>(() => {
    const locale = lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-US';
    return {
      lang,
      dir,
      isRTL: lang === 'ar',
      setLanguage: setLang,
      toggleLanguage,
      tr: (en, ar) => (lang === 'ar' && ar ? ar : en),
      fmtNumber: (n, opts) => new Intl.NumberFormat(locale, opts).format(n),
    };
  }, [lang, dir, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      <DirectionProvider dir={dir}>{children}</DirectionProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
