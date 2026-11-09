import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { surfaceClass } from "@/lib/styles"

type FormSectionProps = {
  title: string
  step?: number
  children: ReactNode
  className?: string
}

/** Numbered card section used by the job form. */
export function FormSection({
  title,
  step,
  children,
  className,
}: FormSectionProps) {
  return (
    <section className={cn(surfaceClass, "p-6", className)}>
      <h2 className="mb-6 flex items-center gap-3 font-heading text-lg font-semibold tracking-[-0.02em] text-white">
        {step !== undefined ? (
          <span className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-sm font-semibold text-brand-soft">
            {step}
          </span>
        ) : null}
        {title}
      </h2>
      {children}
    </section>
  )
}
