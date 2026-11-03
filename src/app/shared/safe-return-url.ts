/** Only preserve a same-app destination, never an external URL or an auth loop. */
export function safeReturnUrl(value: string | null | undefined): string | null {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u0020]/.test(value)) return null;
  try {
    const parsed = new URL(value, 'https://parsfood.local');
    const path = decodeURIComponent(parsed.pathname);
    if (parsed.origin !== 'https://parsfood.local' || path.startsWith('//') || /[\\\u0000-\u0020]/.test(path)) return null;
    const first = path.slice(1).split(/[\/;]/)[0].toLowerCase();
    return first === 'login' || first === 'register' ? null : value;
  } catch { return null; }
}
