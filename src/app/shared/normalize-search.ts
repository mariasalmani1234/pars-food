export function normalizeSearch(value: string): string {
  return value.trim().toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\s\u200c]+/g, '');
}
