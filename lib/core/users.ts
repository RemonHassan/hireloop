import { headers } from "next/headers"

import { auth } from "@/lib/auth"

/**
 * Better Auth user directory for the admin dashboard.
 * Server-only: importing this from a Client Component breaks the build.
 * Requires the Better Auth admin plugin to be enabled in `lib/auth.ts`.
 */
export const getUser = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name",
      sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  })
  return users
}
