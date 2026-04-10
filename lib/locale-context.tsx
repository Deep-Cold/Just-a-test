import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cnToHk } from "./cn-to-hk";
import {
  type AppLocale,
  type UiStringKey,
  UI_STRINGS,
} from "./ui-strings";

const STORAGE_KEY = "polyu-personality-locale";

function readStoredLocale(): AppLocale {
  if (typeof window === "undefined") return "zh-Hans";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "zh-Hant" || v === "zh-Hans") return v;
  } catch {
    /* ignore */
  }
  return "zh-Hans";
}

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  t: (key: UiStringKey, vars?: Record<string, string | number>) => string;
  /** 将简体正文转为香港繁体（题库、结果描述等）；界面固定文案请优先用 `t` */
  localizeBody: (sourceZhHans: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>("zh-Hans");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setHydrated(true);
  }, []);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang =
        locale === "zh-Hant" ? "zh-HK" : "zh-Hans";
    }
  }, [locale]);

  const t = useCallback(
    (key: UiStringKey, vars?: Record<string, string | number>) => {
      let s = UI_STRINGS[locale][key] as string;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.split(`{${k}}`).join(String(v));
        }
      }
      return s;
    },
    [locale]
  );

  const localizeBody = useCallback(
    (sourceZhHans: string) => {
      if (!hydrated) return sourceZhHans;
      return locale === "zh-Hant" ? cnToHk(sourceZhHans) : sourceZhHans;
    },
    [locale, hydrated]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, localizeBody }),
    [locale, setLocale, t, localizeBody]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return ctx;
}

/** 界面固定文案 */
export function useT() {
  return useLocaleContext().t;
}

export function useLocale() {
  const { locale, setLocale } = useLocaleContext();
  return { locale, setLocale };
}

/** 简体题库/长文 → 按当前语言输出（繁体模式用 OpenCC 香港繁体） */
export function useLocalizeBody() {
  return useLocaleContext().localizeBody;
}
