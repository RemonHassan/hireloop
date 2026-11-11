import type { ReactNode } from "react"

import { surfaceClass } from "@/lib/styles"
import { cn } from "@/lib/utils"

type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        surfaceClass,
        "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        className
      )}
    >
      {icon ? (
        <span aria-hidden className="text-white/30 [&_svg]:size-8">
          {icon}
        </span>
      ) : null}
      <h2 className="text-lg font-medium text-white">{title}</h2>
      {description ? (
        <p className="max-w-sm text-sm text-white/45">{description}</p>
      ) : null}
    </div>
  )
}
