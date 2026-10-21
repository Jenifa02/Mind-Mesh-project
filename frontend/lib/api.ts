import { createClient } from "@/lib/client";

export async function apiFetch(
  path: string,
  init: RequestInit = {}
) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token ?? ""}`,
    },
  });
}




// import { createClient } from "@/lib/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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

export async function getCurrentApiUser() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Please log in first");
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export type Project = {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  user_id: string;
};

export type ProjectInput = {
  title: string;
  description?: string | null;
};

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const supabase = createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.access_token) {
    throw new Error("Please log in again.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(result?.detail ?? `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getProjects() {
  return request<Project[]>("/projects/");
}

export function createProject(data: ProjectInput) {
  return request<Project>("/projects/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProject(id: string, data: Partial<ProjectInput>) {
  return request<Project>(`/projects/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteProject(id: string) {
  return request<void>(`/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}



// export async function apiFetch(
//   path: string,
//   init: RequestInit = {}
// ) {
//   const supabase = createClient();

//   const {
//     data: { session },
//     error,
//   } = await supabase.auth.getSession();

//   if (error) {
//     throw new Error(error.message);
//   }

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   if (!API_URL) {
//     throw new Error("NEXT_PUBLIC_API_URL is missing");
//   }

//   const headers = new Headers(init.headers);

//   if (session?.access_token) {
//     headers.set(
//       "Authorization",
//       `Bearer ${session.access_token}`
//     );
//   }

//   if (init.body && !headers.has("Content-Type")) {
//     headers.set("Content-Type", "application/json");
//   }

//   return fetch(`${API_URL}${path}`, {
//     ...init,
//     headers,
//     cache: "no-store",
//   });
// }


