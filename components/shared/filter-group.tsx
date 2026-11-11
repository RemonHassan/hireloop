"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { formatCompactCount } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { JobFilterOption } from "@/types"

type FilterGroupProps = {
  title: string
  name: string
  options: readonly JobFilterOption[]
  value: string
  onValueChange: (value: string) => void
  className?: string
  listClassName?: string
}

/**
 * Single-select filter list. It behaves like a checkbox visually but only one
 * option can be active at a time; selecting the active option clears it.
 */
export function FilterGroup({
  title,
  name,
  options,
  value,
  onValueChange,
  className,
  listClassName,
}: FilterGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      <legend className="text-sm font-semibold text-white">{title}</legend>

      <div className={cn("flex flex-col gap-1.5", listClassName)}>
        {options.map((option, index) => {
          const id = `${name}-${index}`

          return (
            <div
              key={option.value}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={value === option.value}
                  onCheckedChange={(checked) =>
                    onValueChange(checked ? option.value : "")
                  }
                  className="border-white/20 bg-white/4 dark:bg-white/4 data-checked:border-white data-checked:bg-white data-checked:text-black"
                />
                <Label
                  htmlFor={id}
                  className="cursor-pointer truncate text-sm font-normal text-white/60 transition-colors hover:text-white/90"
                >
                  {option.label}
                </Label>
              </div>

              {option.count !== undefined ? (
                <span className="shrink-0 text-xs text-white/30">
                  {formatCompactCount(option.count)}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}
