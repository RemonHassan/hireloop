"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS = ["Most Recent", "Oldest", "Highest Salary"] as const

type JobSortSelectProps = {
  onSortChange?: (value: string) => void
}

/** Local-only sort control; wire `onSortChange` when sorting is implemented. */
export function JobSortSelect({ onSortChange }: JobSortSelectProps) {
  return (
    <Select
      defaultValue={SORT_OPTIONS[0]}
      onValueChange={(value) => onSortChange?.(value ?? "")}
    >
      <SelectTrigger
        aria-label="Sort jobs"
        className="h-10 w-[150px] rounded-lg border-white/10 bg-surface-raised text-sm text-white/80 dark:bg-surface-raised"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
