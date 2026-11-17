import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: string | number
  icon?: ReactNode
  /** Small muted note in the top-right corner, e.g. "38% of users". */
  hint?: string
  className?: string
}

/** Compact metric card used across the dashboards. */
export function StatCard({
  label,
  value,
  icon,
  hint,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-surface px-7 py-6",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {icon ? (
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 [&_svg]:size-5"
          >
            {icon}
          </span>
        ) : null}
        {hint ? (
          <span className="text-sm whitespace-nowrap text-white/45">
            {hint}
          </span>
        ) : null}
      </div>

      <p className="mt-6 text-sm text-white/60">{label}</p>
      <p className="mt-1.5 text-[30px] leading-none font-semibold text-white">
        {value}
      </p>
    </div>
  )
}
