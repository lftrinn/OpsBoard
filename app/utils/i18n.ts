export type LangCode = 'vi' | 'en' | 'ko'

export const SUPPORTED_LANGS: LangCode[] = ['vi', 'en', 'ko']

export function normalizeToSupported(code: string | undefined | null): LangCode | null {
  if (!code) return null
  const short = code.toLowerCase().slice(0, 2)
  return (SUPPORTED_LANGS as string[]).includes(short) ? (short as LangCode) : null
}

export function detectBrowserLang(
  supported: LangCode[] = SUPPORTED_LANGS,
  fallback: LangCode = 'en',
): LangCode {
  const arr: string[] =
    (Array.isArray(navigator.languages) && navigator.languages.length && navigator.languages) ||
    (navigator.language ? [navigator.language] : [])
  for (const raw of arr) {
    const norm = normalizeToSupported(raw)
    if (norm && supported.includes(norm)) return norm
  }
  return fallback
}
