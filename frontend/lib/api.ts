
import { createClient } from "@/lib/client";

export async function apiFetch(
  path: string,
  init: RequestInit = {}
) {
  try {
    const supabase = createClient();

    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError) {
      throw new Error("Unable to verify your login. Please sign in again.");
    }

    if (!session) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      {
        ...init,
        headers: {
          ...init.headers,
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (response.status === 401) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    if (response.status === 403) {
      throw new Error("You don't have permission to access this resource.");
    }

    if (!response.ok) {
      throw new Error("Unable to load your data. Please try again.");
    }

    return response;
  } catch (error) {
    if (error instanceof Error && error.message !== "Failed to fetch") {
      throw error;
    }

    throw new Error(
      "Unable to connect to the server. Please check your connection and try again."
    );
  }
}
