import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  className?: string
}

/** Dashboard page heading with an optional eyebrow and action slot. */
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-8 flex flex-wrap items-end justify-between gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-1.5">
        {eyebrow ? (
          <p className="text-xs font-medium tracking-wide text-brand-soft uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-heading text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-white">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-white/60">{description}</p>
        ) : null}
      </div>
      {actions}
    </header>
  )
}
