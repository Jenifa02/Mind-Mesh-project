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


import { createClient } from "@/utils/supabase/client";

export async function getCurrentApiUser() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Please log in first");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}