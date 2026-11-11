import type { JobRow } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

export async function getJobs(query: string = ""): Promise<JobRow[]> {
  const queryString = query ? `?${query}` : ""
  const res = await fetch(`${BASE_URL}/jobs${queryString}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs (${res.status})`)
  }

  return res.json()
}
