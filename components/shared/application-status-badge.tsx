import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/types"

/** Badge colours per application stage, shared by both dashboards. */
export const applicationStatusStyles: Record<ApplicationStatus, string> = {
  applied: "border-white/10 bg-white/10 text-white/80",
  review: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  interview: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  shortlisted: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  rejected: "border-red-500/40 bg-red-500/10 text-red-300",
  offered: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
}

type ApplicationStatusBadgeProps = {
  /** Falls back to `applied` for records created before the field existed. */
  status?: ApplicationStatus
  className?: string
}

export function ApplicationStatusBadge({
  status = "applied",
  className,
}: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium capitalize",
        applicationStatusStyles[status],
        className
      )}
    >
      {status}
    </span>
  )
}
