import type { UserRole } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

export const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return response.json()
}

/** Subset of the user document that is safe to surface in the dashboard. */
export type UserSummary = {
  id: string
  name: string
  email: string
  role?: UserRole
}

type RawUser = {
  _id: string
  name?: string
  email?: string
  role?: UserRole
}

/** Server-side directory used to resolve applicant names and emails. */
export async function getUsers(): Promise<UserSummary[]> {
  const res = await fetch(`${BASE_URL}/users`)

  if (!res.ok) {
    throw new Error(`Failed to fetch users (${res.status})`)
  }

  const users: RawUser[] = await res.json()

  return users.map(({ _id, name, email, role }) => ({
    id: _id,
    name: name ?? email ?? "Applicant",
    email: email ?? "",
    role,
  }))
}
