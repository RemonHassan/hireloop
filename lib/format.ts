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
