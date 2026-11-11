import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type MetaPillProps = {
  icon?: ReactNode
  children: ReactNode
  className?: string
}

/** Small icon + label pill used for job metadata. */
export function MetaPill({ icon, children, className }: MetaPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-surface-raised px-2.5 py-1 text-xs whitespace-nowrap text-white/75",
        className
      )}
    >
      {icon ? (
        <span aria-hidden className="text-white/45 [&_svg]:size-3.5">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  )
}
