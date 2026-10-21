import { createClient } from "@/utils/supabase/client";

export async function apiFetch(
  path: string,
  init: RequestInit = {}
) {
  const {
    data: { session },
  } = await createClient().auth.getSession();

  return  fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`,  {
    ...init,
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token ?? ""}`,
    },
  });
}
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function apiFetch(
//   path: string,
//   init: RequestInit = {}
// ) {
//   if (!API_URL) {
//     throw new Error("NEXT_PUBLIC_API_URL is missing");
//   }

//   const { data: { session } } =
//     await createClient().auth.getSession();

//   const response = await fetch(`${API_URL}${path}`, {
//     ...init,
//     headers: {
//       ...init.headers,
//       ...(session?.access_token
//         ? {
//             Authorization: `Bearer ${session.access_token}`,
//           }
//         : {}),
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`API Error: ${response.status}`);
//   }

//   return response;
// }