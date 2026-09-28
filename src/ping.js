// Best-effort availability check. A `no-cors` HEAD request resolves for any
// reachable origin and rejects on network failure or timeout. That is enough
// for an up/down indicator and needs no CORS support on the target.
export async function pingUrl(url) {
  if (!url) return 'unknown';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    await fetch(url, { method: 'HEAD', mode: 'no-cors', signal: controller.signal });
    return 'up';
  } catch {
    return 'down';
  } finally {
    clearTimeout(timeout);
  }
}
