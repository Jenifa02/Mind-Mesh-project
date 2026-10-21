
// import { createBrowserClient } from "@supabase/ssr";

// let client: ReturnType<typeof createBrowserClient> | undefined;

// export function createClient() {
//   if (!client) {
//     client = createBrowserClient(

//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     )
//   }

//   return client;
// }


import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  client = createBrowserClient(url, key);
  return client;
}