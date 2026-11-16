import type {
  ApplicationFormData,
  ApplicationRow,
  ApplicationStatus,
  CreateApplicationResult,
  UpdateApplicationStatusResult,
} from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"

export async function getApplications(
  query: string = ""
): Promise<ApplicationRow[]> {
  const queryString = query ? `?${query}` : ""
  const res = await fetch(`${BASE_URL}/applications${queryString}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch applications (${res.status})`)
  }

  return res.json()
}

export async function getApplicationsCount(
  query: string = ""
): Promise<{ count: number }> {
  const queryString = query ? `?${query}` : ""
  const res = await fetch(`${BASE_URL}/applications/count?${queryString}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch applications (${res.status})`)
  }

  return res.json()
}

export async function createApplication(
  data: ApplicationFormData
): Promise<CreateApplicationResult> {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<UpdateApplicationStatusResult> {
  const res = await fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ status }),
  })

  if (!res.ok) {
    throw new Error(`Failed to update application (${res.status})`)
  }

  return res.json()
}
