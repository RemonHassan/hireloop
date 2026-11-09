import { cn } from "@/lib/utils"
import type { JobStatus } from "@/types"

const statusStyles: Record<JobStatus, string> = {
  active: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300",
  expired: "border-white/10 bg-white/5 text-white/50",
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  )
}

export function JobTypePill({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/10 bg-surface-raised px-2.5 py-0.5 text-xs whitespace-nowrap text-white/80 capitalize">
      {type}
    </span>
  )
}
