import type { JobFormData, JobType } from "@/types"

/** "25", "40", "per hour" → "€25 – €40 / hr" (as in the Figma rows). */
export function formatCompensation(
  job: Pick<JobFormData, "minSalary" | "maxSalary" | "salaryFrequency">
) {
  return `€${job.minSalary} – €${job.maxSalary} / ${job.salaryFrequency.replace("per ", "")}`
}

/** "2025-05-30" → "May 30, 2025". Fixed en-US so SSR and client agree. */
export function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

/** "full-time" → "Full-time". */
export function formatJobType(jobType: JobType) {
  return jobType.charAt(0).toUpperCase() + jobType.slice(1)
}

/**
 * Applied date for an application. Uses `createdAt` when the API stored one and
 * otherwise falls back to the timestamp embedded in the Mongo ObjectId.
 */
export function formatAppliedAt(application: {
  _id: string
  createdAt?: string
}) {
  const date = application.createdAt
    ? new Date(application.createdAt)
    : objectIdToDate(application._id)

  if (!date || Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

/** ObjectIds start with a 4-byte creation timestamp (see MongoDB docs). */
function objectIdToDate(id: string): Date | null {
  if (!/^[0-9a-f]{24}$/i.test(id)) return null
  return new Date(Number.parseInt(id.slice(0, 8), 16) * 1000)
}

/** Account creation date; "—" when the backend has no timestamp. */
export function formatJoinedDate(createdAt?: string) {
  if (!createdAt) return "—"

  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

/** "Remote", "New York, USA (Remote)" or the office location. */
export function formatJobLocation(
  job: Pick<JobFormData, "location" | "isRemote">
) {
  if (!job.isRemote) return job.location || "On-site"
  if (!job.location || job.location.toLowerCase() === "remote") return "Remote"
  return `${job.location} (Remote)`
}

/** 1_248 → "1.2k". */
export function formatCompactCount(count: number) {
  if (count < 1000) return String(count)
  return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
}
