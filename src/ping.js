// Best-effort availability check. A `no-cors` HEAD request resolves for any
// reachable origin and rejects on network failure/timeout — enough to show an
// up/down indicator without needing CORS support on the target.
export async function pingUrl(url) {
  if (!url) return 'unknown';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    await fetch(url, { method: 'HEAD', mode: 'no-cors', signal: controller.signal });
    clearTimeout(timeout);
    return 'up';
  } catch (e) {
    clearTimeout(timeout);
    return 'down';
  }
}
