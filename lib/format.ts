import type { JobFormData } from "@/types"

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
