const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/v1";

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    signal: controller.signal
  });
  clearTimeout(timeout);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`API error ${response.status}: ${message || "Request failed"}`);
  }
  return response.json() as Promise<T>;
}
