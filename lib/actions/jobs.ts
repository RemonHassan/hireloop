import type { CreateJobResult, DeleteJobResult, JobFormData } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

export async function createJob(data: JobFormData): Promise<CreateJobResult> {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteJob(jobId: string): Promise<DeleteJobResult> {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  })
  return res.json()
}
