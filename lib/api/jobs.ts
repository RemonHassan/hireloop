import type { JobRow } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

export async function getJobs(): Promise<JobRow[]> {
  const res = await fetch(`${BASE_URL}/jobs`)
  return res.json()
}
