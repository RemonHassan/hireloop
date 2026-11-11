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
// export const getJobById= async(jobId: string): Promise<JobRow | null>{
// const res = await fetch(`${BASE_URL}/jobs${jobId}`)
// return res.json()
// }
export async function getJobById(jobId: string): Promise<JobRow | null> {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`)

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch job (${res.status})`)
  }

  return res.json()
}
/**
 *
 * The jobs API only exposes a collection endpoint, so a single job is picked
 * from the listing response.
 */
export async function getJob(jobId: string): Promise<JobRow | null> {
  const jobs = await getJobs()
  return jobs.find((job) => job._id === jobId) ?? null
}
