const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function pingBackend() {
  const response = await fetch(`${API_URL}/ping`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  return response.json();
}